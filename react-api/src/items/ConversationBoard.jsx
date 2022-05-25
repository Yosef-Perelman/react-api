import { Button, Card, Tab, InputGroup, FormControl, DropdownButton } from 'react-bootstrap';
import Message from './Message';
import { useRef, useState } from 'react';
import "./conversationBoard.css";
import kmp4 from "./k.mp4";
import symongarfunkel from "./symongarfunkel.jpg";
import song from "./song.mp3"


function ConvBoard({ name, setLastMessage, lastMessageList, index, setLastTime, lastTimeList }) {
    let name1 = name + "1";
    let name2 = name + "2";

    var hardCodedMessages = [];
    if(name === "Mom") {
        hardCodedMessages = [
        { text: "blah", key: 0, me_or_friend: "me", type: "image", thisTime: "15:01:48", imgSrc: symongarfunkel },
        { text: "blah", key: 0, me_or_friend: "me", type: "record", thisTime: "15:10:23", imgSrc: song },
        { text: "blah", key: 0, me_or_friend: "me", type: "video", thisTime: "15:13:16", imgSrc: kmp4 },
        { text: "Hello darkness", key: 0, me_or_friend: "me", type: "text", thisTime: "15:14:13" },
        { text: "my old freind", key: 0, me_or_friend: "me", type: "text", thisTime: "15:14:15" }
    ]}

    const hardCodedMessagesReturn = hardCodedMessages.map((now, key) => {
        return <Message text={now.text} key={key} type={now.type} imgSrc={now.imgSrc} me_or_friend={now.me_or_friend} thisTime={now.thisTime} />
    })

    const [initMessageList, setMessageList] = useState([])

    const messageList = initMessageList.map((now, key) => {
        return <Message text={now.text} key={key} type={now.type} imgSrc={now.imgSrc} me_or_friend={now.me_or_friend} thisTime={now.thisTime} />
    });

    let newText = useRef(null);


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
                    {hardCodedMessagesReturn}
                    {messageList}
                </extraWarper>
            </Card>
            <InputGroup>
                <FormControl className='inputLine' ref={newText}
                    placeholder="your text" onKeyPress={onKeyFunc}
                />

                <DropdownButton title="upload" variant="outline-secondary">
                    <Button style={{"border": "solid", "border-radius": "5px", "border-color": "black"}}><label for={name2}>
                        audio
                        <input type={"file"} id={name2} hidden={true}
                            onChange={(e) => uploadRecord(e)} />
                    </label></Button>
                    <Button style={{"border": "solid", "border-radius": "5px", "border-color": "black"}}>
                        <label for={name}>
                            image
                            <input type={"file"} id={name} hidden={true}
                                onChange={(e) => uploadImage(e)} />
                        </label>
                    </Button>
                    <Button style={{"border": "solid", "border-radius": "5px", "border-color": "black"}}>
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