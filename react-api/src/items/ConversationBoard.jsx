import { Button, Card, Tab, InputGroup, FormControl, DropdownButton } from 'react-bootstrap';
import Message from './Message';
import { useRef, useState } from 'react';
import "./conversationBoard.css";
import kmp4 from "./k.mp4";
import symongarfunkel from "./symongarfunkel.jpg";
import song from "./song.mp3"


function ConvBoard({ userName, name, setLastMessage, lastMessageList, index, setLastTime, lastTimeList }) {
    let name1 = name + "1";
    let name2 = name + "2";


    const [initMessageList, setMessageList] = useState([])

    const messageList = initMessageList.map((now, key) => {
        return <Message text={now.text} key={key} type={now.type} imgSrc={now.imgSrc} me_or_friend={now.me_or_friend} thisTime={now.thisTime} />
    });

    let newText = useRef(null);

    // async function postData(contact, content) {
    //     const response = 
    //          await fetch('http://localhost:5287/api/contacts/{contact}/messages', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ "content": content })});
    //             console.log(response.json());
    //             return response.json();
    //     }

    // useEffect(async () => {
    //     const resp = await fetch('http://localhost:5287/api/contacts/');
    //     const data = await resp.json();
    //     for (var i in data) {
    //         if (data[i].userName === username) {
    //             const obj = { "name": data[i].id };
    //             result.push(obj);
    //         }
    //     }
    //     setinitialNames(result);
    //     setInitiNames(result);
    // }, []);

    const addMessage = () => {
        if (newText.current.value !== "") {
            let newArr = [...lastMessageList];
            newArr[index] = newText.current.value
            setLastMessage(newArr);

            let anotherArr = [...lastTimeList];
            anotherArr[index] = new Date().toLocaleTimeString();
            setLastTime(anotherArr);

            setMessageList([...initMessageList, {
                text: newText.current.value,
                key: initMessageList.length,
                me_or_friend: "me",
                type: "text",
                thisTime: new Date().toLocaleTimeString()
            }])
            newText.current.value = ""
        }
        //postData()
        console.log(initMessageList);
    }

    const onKeyFunc = function onKeyEnter(e) {
        if (e.key === "Enter" && newText.current.value !== "") {
            { addMessage() };
        }
    }

    const uploadImage = (e) => {
        let newArr = [...lastMessageList];
        newArr[index] = "image"
        setLastMessage(newArr);

        let anotherArr = [...lastTimeList];
        anotherArr[index] = new Date().toLocaleTimeString();
        setLastTime(anotherArr);

        let val = e.target.files[0]
        let content = URL.createObjectURL(val)
        setMessageList([...initMessageList, {
            text: "i am image",
            key: initMessageList.length,
            imgSrc: content,
            type: "image",
            me_or_friend: "me",
            thisTime: new Date().toLocaleTimeString()
        }])
    }

    const uploadVideo = (e) => {
        let newArr = [...lastMessageList];
        newArr[index] = "video"
        setLastMessage(newArr);

        let anotherArr = [...lastTimeList];
        anotherArr[index] = new Date().toLocaleTimeString();
        setLastTime(anotherArr);

        let val = e.target.files[0]
        let content = URL.createObjectURL(val)
        setMessageList([...initMessageList, {
            text: "i am video",
            key: initMessageList.length,
            imgSrc: content,
            type: "video",
            me_or_friend: "me",
            thisTime: new Date().toLocaleTimeString()
        }])
    }

    const uploadRecord = (e) => {
        let newArr = [...lastMessageList];
        newArr[index] = "record"
        setLastMessage(newArr);

        let anotherArr = [...lastTimeList];
        anotherArr[index] = new Date().toLocaleTimeString();
        setLastTime(anotherArr);

        let val = e.target.files[0]
        let content = URL.createObjectURL(val)
        setMessageList([...initMessageList, {
            text: "i am record",
            key: initMessageList.length,
            imgSrc: content,
            type: "record",
            me_or_friend: "me",
            thisTime: new Date().toLocaleTimeString()
        }])
    }

    return (
        <Tab.Pane eventKey={name}>
            <Card className='card'>
                <extraWarper className="extra">
                    {messageList}
                </extraWarper>
            </Card>
            <InputGroup>
                <FormControl className='inputLine' ref={newText}
                    placeholder="your text" onKeyPress={onKeyFunc}
                />

                <DropdownButton title="upload" variant="outline-secondary">
                    <Button style={{ "border": "solid", "border-radius": "5px", "border-color": "black" }}><label for={name2}>
                        audio
                        <input type={"file"} id={name2} hidden={true}
                            onChange={(e) => uploadRecord(e)} />
                    </label></Button>
                    <Button style={{ "border": "solid", "border-radius": "5px", "border-color": "black" }}>
                        <label for={name}>
                            image
                            <input type={"file"} id={name} hidden={true}
                                onChange={(e) => uploadImage(e)} />
                        </label>
                    </Button>
                    <Button style={{ "border": "solid", "border-radius": "5px", "border-color": "black" }}>
                        <label for={name1}>
                            video
                            <input type={"file"} id={name1} hidden={true}
                                onChange={(e) => uploadVideo(e)} />
                        </label>
                    </Button>
                </DropdownButton>
                <Button variant="outline-secondary" onClick={addMessage}>send</Button>
            </InputGroup>

        </Tab.Pane>
    );
}

export default ConvBoard;