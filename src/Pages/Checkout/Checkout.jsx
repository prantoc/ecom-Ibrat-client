import React, { useContext } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthProvider';
import { useCartTotal } from '../../hooks/useCartTotal';

const Checkout = () => {
    const { user, cart } = useContext(AuthContext)
    const total = useCartTotal()
    return (
        <Container>
            <Row>
                <Col md={8}>
                    <section className="h-100 gradient-custom">
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-lg-10 col-xl-8">
                                    <div className="card" style={{ borderRadius: '10px' }}>
                                        <div className="card-header px-4 py-5">
                                            <h5 className="text-muted mb-0">Thanks for your Order, <span style={{ color: "#a8729a" }}>{user?.name}</span>!</h5>
                                        </div>
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>Receipt</p>
                                            </div>
                                            {

                                                cart?.map(cart => <div key={cart._id} className="card shadow-0 border mb-4">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-2">
                                                                <img src={cart.img}
                                                                    className="img-fluid" alt="Phone" />
                                                            </div>
                                                            <div className="col-md-4 text-center d-flex justify-content-center align-items-center">
                                                                <p className="text-muted mb-0">{cart.name.slice(0, 20)}</p>
                                                            </div>
                                                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                <p className="text-muted mb-0 small">Qty: {cart.quantity}</p>
                                                            </div>
                                                            <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                                <p className="text-muted mb-0 small">${cart.price}</p>
                                                            </div>
                                                            <div className="col-md-1 text-center d-flex justify-content-center align-items-center">
                                                                <FaTrashAlt className='text-danger'></FaTrashAlt>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>)
                                            }
                                            <div className="d-flex justify-content-between pt-2">
                                                <p className="fw-bold mb-0">Order Details</p>
                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> ${total}</p>
                                            </div>

                                            <div className="d-flex justify-content-between pt-2">
                                                <p className="text-muted mb-0">Invoice Number : 788152</p>
                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Discount</span> $00.00</p>
                                            </div>

                                            <div className="d-flex justify-content-between">
                                                <p className="text-muted mb-0">Invoice Date : 22 Dec,2019</p>
                                                <p className="text-muted mb-0"><span className="fw-bold me-4">GST 0%</span> 0</p>
                                            </div>

                                            <div className="d-flex justify-content-between mb-5">
                                                <p className="text-muted mb-0">Recepits Voucher : 18KU-62IIK</p>
                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges</span> Free</p>
                                            </div>
                                        </div>
                                        <div className="card-footer border-0 px-4 py-5"
                                            style={{ backgroundColor: "#a8729a" }}>
                                            <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
                                                paid: <span className="h2 mb-0 ms-2">${total}</span></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Col>
                <Col md={4} className="py-5">
                    <Card className="text-center">
                        <Card.Header>User Details</Card.Header>
                        <Card.Body>
                            <Card.Title>{user?.name}</Card.Title>
                            <Card.Title>{user?.email}</Card.Title>

                        </Card.Body>
                        <Card.Footer className="text-muted"><Button variant="primary">Cash On Delivery</Button></Card.Footer>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default Checkout;