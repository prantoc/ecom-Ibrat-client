import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [logout, setLogout] = useState(false);
    // const [cart, setCart] = useState([]);


    //signout user
    useEffect(() => {
        if (logout === true) {
            setLogout(true)
            localStorage.removeItem('ecom')
        }
    }, [logout, setLogout]);

    //get current user data
    useEffect(() => {
        setLoading(false)
        const cuser = JSON.parse(localStorage.getItem('ecom'))
        if (cuser) {
            setUser(cuser);
        }
    }, [setUser])

    const { data: cart, refetch } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: () => fetch(`http://localhost:5000/storedProducts?email=${user?.email}`, {
            headers: {
                authoraization: `bearer ${localStorage.getItem(user?.token)}`
            }
        }).then(res => res.json())
    })

    // useEffect(() => {

    //     const { token } = JSON.parse(localStorage.getItem('ecom'))
    //     const config = {
    //         headers: {
    //             'content-type': 'application/json',
    //             authorization: `bearer ${token}`
    //         }
    //     }
    //     axios.get(`http://localhost:5000/storedProducts?email=${user?.email}`, config)
    //         .then(res => {
    //             console.log(res);
    //             setCart(res)
    //         })

    // }, [setCart, user?.email])


    const authInfo = {
        setLoading,
        loading,
        user,
        setUser,
        setLogout,
        cart,
        refetch
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;