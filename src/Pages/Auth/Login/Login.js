import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { errorToast, successToast } from '../../../toast/Toaster';

const Login = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const handleLogin = data => {
        setLoad(true)
        const { email, password } = data

        axios.get(`http://localhost:5000/login?email=${email}&password=${password}`)
            .then(res => {
                console.log(res.data);
                if (res.data.accessToken !== '') {
                    successToast('Successfully login!')
                    const token = res.data.accessToken
                    const name = res.data.name
                    const email = res.data.email
                    const data = { token, name, email }
                    localStorage.setItem('ecom', JSON.stringify(data))
                    setLoad(false)
                    reset()
                    navigate('/')
                } else {
                    setLoad(false)
                    successToast('Successfully login!')
                }
            })
            .catch(err => {
                setLoad(false)
                errorToast("Login credential doesn't matched with our record!")
                console.log(err);
            })



    }

    return (
        <Container>
            <Row className='my-5'>
                <Col md={4} sm={10} className='mx-auto border p-5 rounded text-secondary auth-card'>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <h1 className='text-center pb-4'>Login</h1>
                        <div className="mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input {...register("email", {
                                required: { value: true, message: "Email Address is required" }
                            })} type="email" className="form-control" id="exampleInputEmail1" aria-invalid={errors.email ? "true" : "false"} />
                            {errors.email && <p className='text-danger fw-bold my-1' role="alert">{errors.email?.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input {...register("password", {
                                required: { value: true, message: "Password Address is required" },
                                minLength: { value: 6, message: 'Password must be 6 characters!' }
                            })} type="password" className="form-control" id="exampleInputPassword1" aria-invalid={errors.password ? "true" : "false"} />
                            {errors.password && <p className='text-danger fw-bold my-1' role="alert">{errors.password?.message}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary text-center col-12  rounded">

                            {load
                                ?
                                <div className="spinner-border text-dark" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                :
                                <>Login <FaArrowRight></FaArrowRight></>
                            }
                        </button>
                    </form>
                    <div className="form-text text-center p-2 mt-3">Doesn't have an account? <Link to="/signup">Create new Acoount</Link></div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;