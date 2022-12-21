import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { FaCartArrowDown } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { AuthContext } from '../../contexts/AuthProvider';
import { successToast } from '../../toast/Toaster';

const Card = ({ product }) => {
    const { user, refetch } = useContext(AuthContext);
    const { _id, img, name, price, seller } = product;
    const addToCart = (email, id) => {
        const { token } = JSON.parse(localStorage.getItem('ecom'))
        const config = {
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${token}`
            }
        }
        const cart = {
            email,
            productId: id,
            quantity: 1,
            price,
            img,
            name
        }

        axios.post('http://localhost:5000/add-cart', cart, config)
            .then(res => {
                if (res.data.acknowledged) {
                    successToast('Product Added !')
                    refetch();
                }
            })
    }


    return (
        <>
            <div className="card mx-auto" style={{ width: '20rem' }}>
                <img src={img} onError={(e) => e.target.src = 'no img found'} className="card-img-top h-100" alt="" />
                <div className="card-body">
                    <h5 className="card-title pb-2">{name.slice(0, 20)} </h5>
                    <p className="card-text">Price: ${price} </p>
                    <p className="card-text">Seller: {seller} </p>
                </div>
                {
                    user?.token
                        ?
                        <Button variant='primary' onClick={() => addToCart(user?.email, _id)}>
                            Add to Cart
                            <FaCartArrowDown></FaCartArrowDown>
                        </Button>
                        :
                        <Button variant='primary'>

                            <LinkContainer to="/login">
                                <Nav.Link>
                                    Add to Cart
                                    <FaCartArrowDown></FaCartArrowDown>
                                </Nav.Link>
                            </LinkContainer>
                        </Button>
                }
            </div>
        </>

    );
};

export default Card;