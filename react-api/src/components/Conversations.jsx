import { Col, Row, Tab, Nav } from 'react-bootstrap';
import "./Conversations.css"
import NaviMe from '../items/NaviMe';
import ConvBoard from '../items/ConversationBoard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import frog1 from "./frog1.jpg";
import frog2 from "./frog2.jpg";
import anon from "./anon.png";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function Conversations() {
    const[connection, SetConnection] = useState();
    const [initialNames, setinitialNames] = useState(['avi', 'eli']);
    const [initiNames, setInitiNames] = useState(['avi', 'eli']);
    const [lastMessageList, setLastMessageList] = useState([]);
    const [lastTimeList, setLastTimeList] = useState([]);

    const connectToServer = async () => {
        try{
            const connection = new HubConnectionBuilder().
            withUrl('http://localhost:5287/chatHub').
            configureLogging(LogLevel.Information).build();

            connection.on("NewUser", (mess) =>
                {
                    console.log(mess);
                }
            )
            connection.on("ReciveContact", async () => {
                var saveData;
                console.log("received contact");
                await fetch('http://localhost:5287/api/contacts').then(response => response.json())
                    .then(data => saveData = data);
                var names = [];
                for (var i in saveData) {
                    if (saveData[i].userName === username) {
                        const obj = { "name": saveData[i].name };
                        names.push(obj);
                    }
                }
                console.log(names);
                setinitialNames(names);
                setInitiNames(names);
                console.log(initialNames);
            }
            )
            connection.on("ReceiveMessage", (mess) =>
                {
                    console.log(mess);
                }
            )
            await connection.start();
            await connection.invoke("Join");
            SetConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }

    const location = useLocation();
    const username = location.state.name;
    let profilePic = null;
    if (username === "Ariel") {
        profilePic = frog2;
    }
    if (username === "Yosef") {
        profilePic = frog1;
    }
    if (profilePic === "") {
        profilePic = anon;
    }

    var result = [];

    //when we connect, the server gives us 
    useEffect(async () => {
        const resp = await fetch('http://localhost:5287/api/contacts/');
        const data = await resp.json();
        for (var i in data) {
            if (data[i].userName === username) {
                const obj = { "name": data[i].id };
                result.push(obj);
            }
        }
        setinitialNames(result);
        setInitiNames(result);
        connectToServer();
    }, []);



    const listNames = initiNames.map((now, key) => {
        return <NaviMe name={now.name} key={key} lastMessage={lastMessageList[key]} lastTime={lastTimeList[key]} />
    });
    const listBoards = initialNames.map((now, key) => {
        return <ConvBoard userName={username} name={now.name} key={key} setLastMessage={setLastMessageList} lastMessageList={lastMessageList} index={key}
            setLastTime={setLastTimeList} lastTimeList={lastTimeList} />
    });

    async function invitation(username, contact) {
        const response =
            await fetch('http://localhost:5287/api/invitations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "From": username, "To": contact, "Server": 'http://localhost:5287' })
            });
    }

    async function postNewContact(newContact, server) {
        const response =
            await fetch('http://localhost:5287/api/contacts/' + username, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "Id": newContact, "name": newContact, "Server": server })
            });
        return response.json();
    }

    const addContact = async () => {
        let newContact = prompt("New contact name:");
        let newContactServer = prompt("New contact server:");
        var isOK = true;
        for (var i in initiNames) {
            if (newContact === initiNames[i].name) {
                alert("already exists")
                isOK = false;
            }
        }
        if (newContact !== "" && newContact != null && isOK) {
            postNewContact(newContact, newContactServer);
            invitation(username, newContact, 'http://localhost:5287');
            setinitialNames([...initialNames, {
                name: newContact,
                key: initialNames.length
            }])
            setInitiNames([...initialNames, {
                name: newContact,
                key: initialNames.length
            }])
            await connection.invoke("AddedContact");
        }
    }

    return (
        <>
            <Tab.Container id="everything" >
                <Row>
                <p style={{"margin": "0px 10px"}}> To rate the app tap <a href="http://localhost:5287/" target="_blank">here</a> </p>
                    <Col sm={3}>
                        
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item className='chatMenu'>
                                <span class="d-block p-2 bg-primary text-white">
                                    <table>
                                        <td className='rowspan'>
                                            <img className='profilePicture' src={profilePic} alt=""></img>
                                        </td>
                                        <td>
                                            <tr>
                                                <b>{username}</b>
                                            </tr>
                                            <tr>
                                                <button className='addFriend' onClick={addContact}>Add contact member</button>
                                            </tr>
                                        </td>
                                    </table>
                                </span>
                            </Nav.Item>
                            {listNames}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            {listBoards}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}

export default Conversations;