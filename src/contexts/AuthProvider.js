import { useQuery } from '@tanstack/react-query';
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
    // const { token } = JSON.parse(localStorage.getItem('ecom'))
    const { data: cart, refetch } = useQuery({
        queryKey: ['cart', user?.email, user?.token],
        queryFn: () => fetch(`https://ecom-server-kappa.vercel.app/storedProducts?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${user?.token}`
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
    //     axios.get(`https://ecom-server-kappa.vercel.app/storedProducts?email=${user?.email}`, config)
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