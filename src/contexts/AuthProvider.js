import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [logout, setLogout] = useState(false);


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

    const authInfo = {
        setLoading,
        loading,
        user,
        setUser,
        setLogout
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;