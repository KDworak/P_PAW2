"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [allImages, setAllImages] = useState([]);
  const [bigImgActive, setBigImgActive] = useState();
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);


  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:3001/api/Images");
        const data = await response.json();
        console.log(data)
        const convertedImages = data.map(image => {
          if (image.image_data && image.imgType) {
            console.log(Buffer.from(image.image_data.data).toString('base64'));
            const imageData = `data:${image.imgType};base64,${Buffer.from(image.image_data.data).toString('base64')}`;
            console.log(image._id)
            return { ...image, imageData };
          }
          return null; // Jeśli image_data lub imgType nie istnieje, zwracamy null
        });

        // Filtrujemy null wartości, które mogą pojawić się, gdy brakuje image_data lub imgType
        const filteredImages = convertedImages.filter(image => image !== null);

        setAllImages(filteredImages);
        
      } catch (error) {
        console.log("Error: " + error);
      }
      setLoading(false);
    };


    fetchAllImages();
  }, []);


  const showMore = async (image) => {
    bigImgActive!=null?setBigImgActive(null):setBigImgActive(image);
    try {
      const response = await fetch(`http://127.0.0.1:3001/api/Comment/byId/${image._id}`);
      const commentsData = await response.json();
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };


  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {

      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0'); 
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
      const year = String(currentDate.getFullYear()).slice(-2); 

      const formattedDate = `${day}-${month}-${year}`;
      
      const response = await fetch('http://127.0.0.1:3001/api/createComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_IMG: bigImgActive._id,
          id_User: '6623f35c7a66eb37ff705cf3', 
          text: commentText,
          date: formattedDate,
        }),
      });

      if (response.ok) {
        console.log('Comment added');
        setCommentText('');
      } else {
        alert('Error adding comment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  //useEffect(() => {
  //  if (bigImgActive) {
  //    document.body.style.overflow = "hidden";
  //  } else {
  //    document.body.style.overflow = "visible";
  //  }
  //}, [bigImgActive]);

  return (
    <div className="relative">
    {(loading) ? <svg aria-hidden="true" className=" lg:mx-[46%] mx-auto mt-[200px] w-32 h-32 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>:<span></span>}


      {//bigImgActive?<div class="flex"><div><Image src={bigImgActive}  onClick={()=>showMore(bigImgActive)} layout="intrinsic" height="200" width="500" alt={"Image"} className=" top-1/3 rounded-t-2xl0 fixed rounded-t-2xl z-40 hover:cursor-pointer" /></div>
            bigImgActive?<div className=" absolute left-0 right-0 mx-auto  flex w-[100%] lg:w-[80%] flex-col lg:flex-row bg-white shadow-xl rounded-2xl z-50    pt-12 lg:pt-0 "><div class="fixed top-0 left-0 h-[100vh] w-full bg-black opacity-80">d</div><div class="w-full content-center z-50 bg-white  lg:rounded-l-2xl" ><Image src={bigImgActive.imageData}  onClick={()=>showMore(bigImgActive)} layout="intrinsic" height="200" width="500" alt={"Image"} className="mx-auto   z-50 hover:cursor-pointer" />
            <p className="text-myCol px-4 text-xs pt-6 text-center z-50">sdasdasd asdsadas dasd asdasd as das das</p><p className="text-myCol px-4 text-xs pt-6 text-center z-50">
                  {bigImgActive.title}
                </p>
                <p className="text-myCol px-4 text-xs pt-6 text-center z-50">
                  {bigImgActive.description}
                </p></div>
          <div className="lg:w-1/2 w-1/1  z-50 bg-white rounded-b-2xl lg:rounded-r-2xl lg:rounded-l-none relative ">
            <div className="">
              <p className="text-center  text-myCol text-[24px] pt-6">Komentarze</p><br/>
              <div className="overflow-auto h-[400px]">
              <hr />
              {comments.map((comment, index) => (
  <div key={index} className="text-myCol px-4 text-xs pt-6 text-center z-50">
    <p className="text-left">{comment.text}</p>
    <p className="text-left">{comment.date}</p>
  </div>
))}
</div>
            </div>
            
            <div className="w-[100%] z-50 mb-auto h-auto  lg:bottom-0 ">
            
            <p className=" text-[18px] text-myCol px-4 pt-8 z-50">Dodaj komentarz</p>

            <form onSubmit={handleSubmitComment} className='w-[100%] lg:w-[100%] px-4 z-50'>
            
                
                  
                <div className=' z-50'>
                  
                    <textarea id="description" value={commentText} onChange={(e) => setCommentText(e.target.value)} className=" z-50 resize-none px-2 w-[100%] h-[102px] text-[18px] lg:w-[100%] border border-myCol rounded bg-formInputBgCol" />
                    <button type="submit" className=' z-50 bg-myCol p-2 rounded-md text-myBg shadow-lg px-8 my-4'>Dodaj</button>
                </div>
               
                
            </form>

          </div>
          </div>
        </div>:<span className="absolute"></span>}


      <div>
      {/* bg-gray-800  <Image src={imageUrl} layout="fill" onClick={()=>showMore(imageUrl)} objectFit="cover" objectPosition="center" alt={`Dog Image ${index}`} className="rounded-t-2xl rounded-t-2xl transition-transform duration-300 transform hover:scale-110 hover:cursor-pointer" /> */}
        <div className="flex flex-wrap justify-around  lg:w-3/4 w-100 mx-auto mt-16 relative  ">
        

          {allImages.map((image, index) => (
            <div key={index} className="md:w-[350px] md:h-[400px] w-[100%]   bg-black m-8 text-center grid rounded-2xl relative overflow-hidden shadow-2xl grid justify-items-center">
              <img src={image.imageData} onClick={() => showMore(image)} className=" size-full justify-center rounded-t-2xl rounded-t-2xl transition-transform duration-300 transform hover:scale-110 hover:cursor-pointer" alt={`Obrazek ${index}`} />
              <span className="text-myBg align-center absolute bottom-0 left-0 right-0 z-10 bg-black py-4 opacity-80">Obrazek {index +1}</span>
            </div>
          ))}
    {
    // zrobić żeby te zdj wyświetlane w powiekszeniu byly (sticky ?) zeby sie to na tel dobrze przewijało 
    }
        </div>
      </div>
    </div>
  );
}

