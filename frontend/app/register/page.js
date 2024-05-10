"use client";
import React, { useState } from 'react';

const register = () => {


    return (
        <>
        <form className='w-[90%] lg:w-[50%] mx-auto'>
            <p className='my-8 text-[24px] text-myCol text-red text-center lg:text-left'>Rejestracja</p>
            <hr className='bg-myCol mb-8 h-0.5'/>
            <label htmlFor="userEmail">E-mail:</label><br/>
                <div className=' flex justify-center lg:justify-normal'>
                    
                    <input type="text" id="userEmail"  className=" w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" />
                </div>
                <br/>
                <label htmlFor="title">Hasło:</label><br/>
                <div className='flex justify-center lg:justify-normal'>
                    
                    <input type="password" id="title" className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" />
                </div>
                <br/>
                <label htmlFor="titleRepeat">Powtórz hasło:</label><br/>
                <div className='flex justify-center lg:justify-normal'>
                    
                    <input type="password" id="titleRepeat" className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" />
                </div>
                <br/>
                <div className='flex justify-center lg:justify-normal'>
                <button type="submit" className='bg-myCol p-2 rounded-md text-myBg shadow-lg px-8'>Zarejestruj się</button>
                </div>
                </form>
        </>
    );
};

export default register;