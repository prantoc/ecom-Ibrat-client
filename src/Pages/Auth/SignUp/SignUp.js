import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useForm } from 'react-hook-form';


const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    //? Signup function
    const handleSignUp = data => {
        const { name, email, password, type } = data
        const user = {
            name,
            email,
            role: type,
            verified: false
        }

    }


    return (
        <Container>
            <Row className='my-5'>
                <Col md={4} sm={10} className='mx-auto border p-5 rounded text-secondary auth-card'>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <h1 className='text-center pb-2'>SignUp</h1>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Full Name</label>
                            <input {...register("name", { required: "Name is required" })} placeholder="Your full name" className="form-control" id="exampleInputName" aria-invalid={errors.name ? "true" : "false"} />
                            {errors.name && <p className='text-danger fw-bold my-1' role="alert">{errors.name?.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" {...register("email", {
                                required: { value: true, message: "Email Address is required" },
                            })} aria-invalid={errors.email ? "true" : "false"} className="form-control" id="exampleInputEmail1" placeholder='Enter your email ' />
                            {errors.email && <p className='text-danger fw-bold my-1' role="alert">{errors.email?.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" {...register("password", {
                                required: "Password Address is required",
                                minLength: { value: 6, message: 'Password must be 6 characters!' }
                            })} aria-invalid={errors.password ? "true" : "false"} className="form-control" id="exampleInputPassword1" placeholder='Enter your password' />
                            {errors.password && <p className='text-danger fw-bold my-1' role="alert">{errors.password?.message}</p>}
                        </div>
                        <button type="submit" className="btn btn-primary text-center col-12  rounded">
                            SignUp <FaArrowRight></FaArrowRight>
                        </button>
                    </form>
                    <div className="form-text text-center p-2 mt-3">Have an account? <Link to="/login">Login</Link></div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;