import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';
function PhotoAdd(props) {

  const [comment,setComment] = useState("");
  const [file,setFile] = useState({files:null});
  const [navigate,setNavigate] = useState(false);
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile({files:e.target.files[0]});
    }
  };
  const newPost = async(e)=>{
    e.preventDefault();
     if(comment === ""){
       props.setModalText("Lütfen Açıklama kısmını Boş bırakmayın");
       props.setModalShow(true);
       return
     }
   let User_information = JSON.parse(localStorage.getItem("User_information"));
    let email = User_information.email;
    let config = {
      headers:{
        'Authorization': 'Bearer ' + props.cookies.access_token,
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data;`
      }
     }
   await axios.post("http://localhost:5000/photos/create",{
    post_img:file.files,
    email,
    comment,
    method:"post"
   },config).then(response=>{
    console.log(response);
    if(response.data.navigate){
      setNavigate(true);
    }
   }).catch(err=>{
console.log(err);
   });



  }

  return (
    <>
    <div className='d-flex justify-content-center'> 
      <Form onSubmit={newPost}> 
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Photo Uploads</Form.Label>
        <Form.Control type="file" size="lg" onChange={handleFileChange} />
      </Form.Group>
      <Form.Group>
      <Form.Label>Photo comment</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder='bir şeyler yazın' value={comment} onChange={(e)=>setComment(e.target.value)} />
      </Form.Group>
       <Button variant='primary' type="submit" className='mt-3 mb-3'>Yeni Gönderi Oluştur</Button>
      </Form>
      {navigate ? (<Navigate to="/" />) : null}
    </div>
    </>
  )
}

export default PhotoAdd
