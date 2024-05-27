"use client"
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(JSON.parse(storedUserName));
        }

        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(JSON.parse(storedUserId));
        }
    }, []);

    const login = (userName, userId) => {
        setUserName(userName);
        setUserId(userId);
        localStorage.setItem('userName', JSON.stringify(userName));
        localStorage.setItem('userId', JSON.stringify(userId));
    };

    const logout = () => {
        setUserId(null);
        setUserName(null)
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
    };

    return (
        <UserContext.Provider value={{ userName, userId, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);