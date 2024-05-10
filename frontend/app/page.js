"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [allImages, setAllImages] = useState([]);
  const [bigImgActive, setBigImgActive] = useState(null);
  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3001/api/Images");
        const data = await response.json();
        console.log(data)
        const convertedImages = data.map(image => {
          if (image.image_data && image.imgType) {
            console.log(Buffer.from(image.image_data.data).toString('base64'));
            const imageData = `data:${image.imgType};base64,${Buffer.from(image.image_data.data).toString('base64')}`;
            console.log(image._id)
            return imageData;
          }
          return null; // Jeśli image_data lub imgType nie istnieje, zwracamy null
        });

        // Filtrujemy null wartości, które mogą pojawić się, gdy brakuje image_data lub imgType
        const filteredImages = convertedImages.filter(image => image !== null);

        setAllImages(filteredImages);
        
      } catch (error) {
        console.log("Error: " + error);
      }
    };


    fetchAllImages();
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

      <div>
      {/* bg-gray-800  <Image src={imageUrl} layout="fill" onClick={()=>showMore(imageUrl)} objectFit="cover" objectPosition="center" alt={`Dog Image ${index}`} className="rounded-t-2xl rounded-t-2xl transition-transform duration-300 transform hover:scale-110 hover:cursor-pointer" /> */}
        <div className="flex flex-wrap justify-around md:w-3/4 w-100 mx-auto mt-16 relative  rounded-2xl">
        {bigImgActive?<Image src={bigImgActive}  onClick={()=>showMore(bigImgActive)} layout="intrinsic" height="200" width="500" alt={"Image"} className=" top-1/3 rounded-t-2xl0 fixed rounded-t-2xl z-40 hover:cursor-pointer" />:<span className="absolute"></span>}

          {allImages.map((imageUrl, index) => (
            <div key={index} className="md:w-[350px] md:h-[400px] w-[100%]   bg-black m-8 text-center grid rounded-2xl relative overflow-hidden shadow-2xl grid justify-items-center">
              <img src={imageUrl} onClick={() => showMore(imageUrl)} className=" size-full justify-center rounded-t-2xl rounded-t-2xl transition-transform duration-300 transform hover:scale-110 hover:cursor-pointer" alt={`Obrazek ${index}`} />
              <span className="text-myBg align-center absolute bottom-0 left-0 right-0 z-10 bg-black py-4 opacity-80">Obrazek {index +1}</span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}