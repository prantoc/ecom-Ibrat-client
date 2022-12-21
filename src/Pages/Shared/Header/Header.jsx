import React, { useContext } from 'react';
import { Badge, Container, Dropdown, Image, Nav, Navbar } from 'react-bootstrap';
import { FaCartArrowDown } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from '../../../contexts/AuthProvider';
import avatar from '../../../assets/main/man.png'
import { Link } from 'react-router-dom';
const Header = () => {
    const { user, setLogout, cart } = useContext(AuthContext)
    const userLogout = () => {
        setLogout(true)
    }
    return (
        <Navbar bg="dark" variant="dark" expand='lg'>
            <Container>
                <Navbar.Brand >Ecom</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="d-lg-flex justify-content-lg-end">
                    <Nav >
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        {
                            user?.token
                                ?
                                <>
                                    <Dropdown>
                                        <Dropdown.Toggle className='border-0 pt-0 mt-0' variant="outline-light" id="dropdown-basic">
                                            <Image roundedCircle style={{ height: '38px' }} src={avatar} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='position-absolute end-100 translate-middle-x' style={{ zIndex: '9999' }}>
                                            <Dropdown.Item >{user?.name}</Dropdown.Item>
                                            <Dropdown.Item ><Link className='nav-link text-dark' to='checkout'>Checkout</Link></Dropdown.Item>
                                            <Dropdown.Item onClick={userLogout}>Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                </>
                                :
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/signup">
                                        <Nav.Link>Signup</Nav.Link>
                                    </LinkContainer>
                                </>
                        }

                        <LinkContainer to="/checkout">
                            <Nav.Link> <Badge bg="primary" text="white"> <FaCartArrowDown></FaCartArrowDown> {cart ? cart?.length : 0}</Badge></Nav.Link>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;