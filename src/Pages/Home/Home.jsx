import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';

const Home = () => {
    const { data: products, isLoading, error, isError } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch('http://localhost:5000/products').then(res => res.json())

    })
    if (isError) {
        return <span>Error: {error.message}</span>
    }
    console.log(products);
    return (
        <Container className='mt-4'>
            <Row>
                {
                    isLoading && <Col md={4} className="mx-auto d-flex align-center"> <Loader></Loader></Col>
                }

                {
                    products?.map(product =>
                        <Col md={4} key={product._id} className="mb-3 text-center">
                            <Card product={product}></Card>
                        </Col>
                    )
                }
            </Row>
        </Container>
    );
};

export default Home;