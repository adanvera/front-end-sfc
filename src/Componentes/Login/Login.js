import React, { Fragment } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap'

function Login() {

    const submittrigger = async (e) => {
        e.preventDefault()

        console.log("inicie sesion");

    }

    return (
        <Fragment>
            <section className="col-md-12" id='main-login'>
                <div className="col-md-6" id="mid-login-one">
                </div>
                <div className="col-md-6" id="mid-login-two">
                    <form className="mt-3" onSubmit={submittrigger} >
                        <div className="mb-5">
                            <h1 >BIENVENIDO A SFC</h1>
                            <h4 >INICIAR SESIÓN</h4>
                        </div>
                        <FloatingLabel
                            controlId="correo"
                            label="Ingrese su correo"
                            className="mb-3"
                            name="correo"
                            aria-required={true}

                        >
                            <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="password"
                            label="Ingrese su contraseña"
                            name="password"
                            aria-required={true}
                        >
                            <Form.Control type="password" placeholder="Password" />
                        </FloatingLabel>
                        <div className="a-center mt-2">
                            <Button className="mt-3 btn-log" variant="primary" type="submit">
                                INICIAR SESION
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </Fragment>
    )
}

export default Login