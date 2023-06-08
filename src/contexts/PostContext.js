import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const PostContext = createContext();


function PostContextProvider(props) {
    const [post,setPost] =useState([]);
const getAllPost = async()=>{
  await  axios.get("http://localhost:5000/photos/all").then(response =>{setPost(response.data.photos)}).catch(err=>console.log(err));
}

  return (
<PostContext.Provider value={{post,getAllPost}}> 

 {props.children}

</PostContext.Provider>
  )
}

export default PostContextProvider
