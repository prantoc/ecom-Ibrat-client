import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

const Card = ({ product }) => {
    const { img, name, price, seller } = product;
    return (
        <>
            <div className="card mx-auto" style={{ width: '20rem' }}>
                <img src={img} onError={(e) => e.target.src = 'no img found'} className="card-img-top h-100" alt="" />
                <div className="card-body">
                    <h5 className="card-title pb-2">{name.slice(0, 20)} </h5>
                    <p className="card-text">Price: ${price} </p>
                    <p className="card-text">Seller: {seller} </p>
                </div>
                <PrimaryButton variant='primary'>Add to cart <FaCartArrowDown></FaCartArrowDown></PrimaryButton>
            </div>
        </>

    );
};

export default Card;