"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [dogImages, setDogImages] = useState([]);
  const [bigImgActive, setBigImgActive] = useState(null);
  useEffect(() => {
    const fetchDogImages = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random/8");
        const data = await response.json();
        setDogImages(data.message);
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    fetchDogImages();
  }, []);
  const showMore = (imgUrl, imId) =>{
    bigImgActive!=null?setBigImgActive(null):setBigImgActive(imgUrl);
    console.log(bigImgActive);
  }
  //useEffect(() => {
  //  if (bigImgActive) {
  //    document.body.style.overflow = "hidden";
  //  } else {
  //    document.body.style.overflow = "visible";
  //  }
  //}, [bigImgActive]);

  return (
    <div>
      <div className="flex items-center shadow-lg">
        <div>
          <h1 className="text-myCol font-bold text-3xl p-8">Galeria Psów</h1>
        </div>
        <div className="flex justify-around mx-auto">
          <a href="#" className="uppercase p-8 transition duration-1000 border-b-4 border-transparent hover:border-myCol">Lista zdjęć</a>
          <a href="#" className="uppercase p-8 transition duration-1000 border-b-4 border-transparent hover:border-myCol">Dodaj</a>
          <a href="#" className="uppercase p-8 transition duration-1000 border-b-4 border-transparent hover:border-myCol">Logowanie</a>
          <a href="#" className="uppercase p-8 transition duration-1000 border-b-4 border-transparent hover:border-myCol">Rejestracja</a>
          <a href="#" className="uppercase p-8 transition duration-1000 border-b-4 border-transparent hover:border-myCol">O serwisie</a>
        </div>
      </div>

      <div>
      {/* bg-gray-800  */}
        <div className="flex flex-wrap justify-around w-3/4 mx-auto mt-16 relative  rounded-2xl">
        {bigImgActive?<Image src={bigImgActive}  onClick={()=>showMore(bigImgActive)} layout="intrinsic" height="200" width="500" alt={"Dog Image "} className=" top-1/3 rounded-t-2xl0 fixed rounded-t-2xl z-40 hover:cursor-pointer" />:<span className="absolute"></span>}

          {dogImages.map((imageUrl, index) => (
            <div key={index} className="w-[350px] h-[400px] bg-black m-8 text-center grid rounded-2xl relative overflow-hidden shadow-2xl">
              <Image src={imageUrl} layout="fill" onClick={()=>showMore(imageUrl)} objectFit="cover" objectPosition="center" alt={`Dog Image ${index}`} className="rounded-t-2xl rounded-t-2xl transition-transform duration-300 transform hover:scale-110 hover:cursor-pointer" />
              <span className="text-myBg align-center absolute bottom-0 left-0 right-0 z-10 bg-black py-4 opacity-80">Obrazek psa {index}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}