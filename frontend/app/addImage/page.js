"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from "next/image";
import { useUser } from '../userContext'; 
import withAuth from '../withAuth';
const ImageUploadForm = () => {

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [message, setMessage] = useState('');
    const { userName, userId } = useUser();
    
  
        

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('id_user', userId); 
            formData.append('title', title);
            formData.append('description', description);
            formData.append('is_public', isPublic);

            const response = await axios.post('http://127.0.0.1:3001/api/createImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage("Zdjęcie zostało dodane !");
            setFile('');
            setTitle('');
            setDescription ('');
            setIsPublic(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage('Błąd w przesyłaniu pliku. Upewnij się, że uzupełniłeś wszystkie pola.');
        }
    };

    return (
         <div>
            
          
            <form onSubmit={handleSubmit} className='w-[90%] lg:w-[50%] mx-auto'>
            <p className='my-8 text-[24px] text-myCol text-red text-center lg:text-left'>Dodaj zdjęcie</p>
            <hr className='bg-myCol mb-8 h-0.5'/>
                
                
                <div className=''>
                    <label htmlFor="title">Tytuł:</label><br/>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" />
                </div>
                <div className=''>
                    <label htmlFor="description">Opis:</label><br/>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" />
                </div>
                <div className=''>
                    <label htmlFor="is_public">Czy publiczne:</label>
                    <input type="checkbox" id="is_public" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="ml-2 border border-myCol rounded " />
                </div>
                <div className=''>
                    <label htmlFor="file">Wybierz zdjęcie:</label><br/>
                    <input type="file" id="file" accept="image/*" onChange={handleFileChange} className=" " />
                </div><br/>
                <button type="submit" className='bg-myCol p-2 rounded-md text-myBg shadow-lg'>Dodaj</button>
                <Image src='/addImageLogo.png' width='200' height='200' alt='addImage logo' priority className='mt-[-300px] ml-[50%] hidden lg:block'/>
                {message && <p className='text-red lg:mt-[102px]'>{message}</p>}
                
            </form>
            
            
        </div>
    );
};

export default withAuth(ImageUploadForm);
