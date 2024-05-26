"use client";
import React, { useState } from 'react';
import axios from 'axios'; 
//var signIn = false;

const login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [msgFail, setMsgFail] = useState('');
    const [msgSuccess, setMsgSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/user/auth', {login: login, password: password});

            setLogin('');
            setPassword('');
            setMsgSuccess('Użytkownik istnieje, pomyślnie zalogowano!');setMsgFail('');
            //signIn = true;
            console.log(response.data); 
        } catch (error) {
            console.error('Error:', error);
            setMsgSuccess('');setMsgFail('Użytkownik nie istnieje, sprawdź dane!');
        }
    };

    /*if(signIn === true){/*Funkcjonalność wylogowania się}*/

    return (
        <>
        <form onSubmit={handleSubmit} className='w-[90%] lg:w-[50%] mx-auto'>
            <p className='my-8 text-[24px] text-myCol text-red text-center lg:text-left'>Logowanie</p>
            <hr className='bg-myCol mb-8 h-0.5'/>
            <p className='text-[red]'>{msgFail}</p>
            <p className='text-[green]'>{msgSuccess}</p>
            <br/>
            <label htmlFor="id_user">Login:</label><br/>
                <div className=' flex justify-center lg:justify-normal'>
                    
                    <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} className=" w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" required/>
                </div>
                <br/>
                <label htmlFor="title">Hasło:</label><br/>
                <div className='flex justify-center lg:justify-normal'>
                    
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" required/>
                </div>
                <br/>
                <div className='flex justify-center lg:justify-normal'>
                <button type="submit" className='bg-myCol p-2 rounded-md text-myBg shadow-lg px-8'>Zaloguj</button>
                </div>
        </form>
        </>
    );
};

export default login;