import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
    return (
        <>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#0d6efd"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName="mx-auto d-flex align-center"
                visible={true}
            />
        </>
    );
};

export default Loader;