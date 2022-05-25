import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Row, Container } from 'react-bootstrap';


function Login({ usersList }) {
    console.log(usersList);
    const navigate = useNavigate();

    const verify = () => {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var is_true = false;
        var i = 0;
        for (; i < usersList.length; i++) {
            if (username === usersList[i].userName && password === usersList[i].password) {
                is_true = true;
                break;
            }
        }
        if (is_true) {
            navigate('/Conversations', {state: { name: usersList[i].nickName, profilePic: usersList[i].profilePic, newUser:false } });
        }
        else {
            alert("Something went wrong, please try again");
        }
    }

    return (
        <div class="form-horizontal">
            <Container class="col text-center">
                <h1 className="display-1"><strong><em>lets chat!</em></strong></h1>
                <form>
                    <Row>
                        <Col>Username:</Col>
                        <Col> <input class='inputSqure' placeholder="Username" id='username' /> </Col>
                    </Row>
                    <Row>
                        <Col>Password:</Col>
                        <Col> <input class='inputSqure' type='password' placeholder="Password" id='password' /> </Col>
                    </Row>
                    <Row>
                        <Col>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <div class="text-center" style={{ "margin": "10px" }}>
                        <Button className="primary" onClick={verify} style={{ "margin": "5px", "float": "left", "width": "100px" }}>
                            Log In!
                        </Button>
                        <p className="center rounded" > If you are not registered yet, <Link to={'Register'}>Register</Link> </p>
                    </div>
                </form>


            </Container >
        </div>
    );
}

export default Login;