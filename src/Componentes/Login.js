import { Fragment, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { URL_AUTH_USER } from './Commons/Endpoint';

function Login() {

    const initialState = {
        email: '',
        password: ''
    }

    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }

    window.localStorage.clear();

    const handleSubmit = (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        }

        const Login = async () => {
            console.log("procede a logearse");
            try {
                const response = await fetch(URL_AUTH_USER, options);
                const data = await response.json();

                localStorage.setItem('token', data.token);
                if(data?.token){
                    localStorage.setItem('mostrar', true);
                }else{
                    localStorage.setItem('mostrar', false);
                }
                localStorage.setItem('id', data.user.uid);
                localStorage.setItem('email', data.user.email);
                localStorage.setItem('name', data.user.name);
                localStorage.setItem('lastname', data.user.last_name);
                window.location.href = '/dashboard';
            } catch (error) {
                console.log(error);
            }
        }

        Login();


    }


    return (
        <Container isFluid={true} className="m-5">
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Correo electronico</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' value={state.email} onChange={handleChange} />
                        <Form.Text className="text-muted">Ingrese correo</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' value={state.password} onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Row>
        </Container>
    );
}

export default Login;