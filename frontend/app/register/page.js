"use client"
import React, { useState } from 'react';
import axios from 'axios'; 
const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [msgFail, setMsgFail] = useState('');
    const [msgSuccess, setMsgSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password === passwordRepeat){
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            console.log(formData);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/create`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
});

const data = await response.json();
            setEmail('');
            setName('');
            setPassword('');
            setPasswordRepeat('');
            setMsgSuccess('Konto zostało utworzone.');setMsgFail('');
            console.log(response.data); 
       
        } catch (error) {
            console.error('Error:', error);
            
        }
    } else {setMsgSuccess('');setMsgFail('Hasła nie są takie same !');}
    };

    return (
        <>
            <form className='w-[90%] lg:w-[50%] mx-auto' onSubmit={handleSubmit}>
                <p className='my-8 text-[24px] text-myCol text-red text-center lg:text-left'>Rejestracja</p>
                <hr className='bg-myCol mb-8 h-0.5'/>
                <p className='text-[red]'>{msgFail}</p>
                <p className='text-[green]'>{msgSuccess}</p>
                <br/>
                <label htmlFor="userEmail">E-mail:</label><br/>
                <div className=' flex justify-center lg:justify-normal'>
                    <input type="email" id="userEmail" value={email}  onChange={(e) => setEmail(e.target.value)}  className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" required/>
                </div>
                <br/>
                <label htmlFor="userName">Nazwa:</label><br/>
                <div className=' flex justify-center lg:justify-normal'>
                    <input type="text" id="userName" value={name}  onChange={(e) => setName(e.target.value)}  className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" required/>
                </div>
                <br/>
                <label htmlFor="password">Hasło:</label><br/>
                <div className='flex justify-center lg:justify-normal'>
                    <input type="password" id="password" value={password}  onChange={(e) => setPassword(e.target.value)}  className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" required/>
                </div>
                <br/>
                <label htmlFor="passwordRepeat">Powtórz hasło:</label><br/>
                <div className='flex justify-center lg:justify-normal'>
                    <input type="password" id="passwordRepeat"  value={passwordRepeat}  onChange={(e) => setPasswordRepeat(e.target.value)}  className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" required />
                </div>
                <br/>
                <div className='flex justify-center lg:justify-normal'>
                    <button type="submit" className='bg-myCol p-2 rounded-md text-myBg shadow-lg px-8'>Zarejestruj się</button>
                </div>
            </form>
        </>
    );
};

export default Register;