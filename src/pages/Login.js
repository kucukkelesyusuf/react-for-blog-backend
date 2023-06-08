import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';




function Login() {
   


     const [Email,setEmail] = useState("");
     const [Password,setPassword] = useState("");
     const [modalShow,setModalShow] = useState(false);
     const [ModalText,setModalText] = useState("");
     const [DashboardNavigate,setNavigate] = useState(false); 
     
     const {setCookie,setLoading,Access} = useContext(AuthContext);
     
     useEffect(()=>{
     if(localStorage.getItem("User_information")){
         let User_information = JSON.parse(localStorage.getItem("User_information"));
         setEmail(User_information.email)
     }
    },[])

  const HandleFormSubmit = async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:5000/auth/login",{
      email:Email,
      password:Password
    })
    .then(async(response)=>{
       let data =await response.data;

       setCookie("access_token",data.access_token,{maxAge:7200,path:"/"})
       localStorage.setItem("User_information",JSON.stringify(data.data));
       if(data.success){
        setLoading(true);
        setTimeout(()=>{
           setNavigate(true);
           setLoading(false);
        },12000)
       
       }
    })
    .catch((err)=>{
      console.log(err)
       let data = err.response.data;
       let errCode = data.message;
       if(errCode === "IN4000")     {
          setModalShow(true);
          setModalText("Lütfen Gerekli Yerleri Doldurun !!!");
       } 
       if(errCode === "OA4000"){
        setModalShow(true);
        setModalText("Lütfen Bilgileri Doğru Girdiğinizden Emin Olun");
       }
       if(errCode === "KB4000"){
        setModalShow(true);
        setModalText("Böyle Bir Email Hesabı Sisteme Kayıtlı Değil");
       }
       if(errCode === "DOA400"){
        setModalShow(true);
        setModalText("Sisteme Girişiniz Engellendi ❌");
       }
    })
   
  } 
return(
  <>
  <div className='d-flex align-items-center flex-column'>
    <Form id="login-register-form" className='bg-light rounded p-5 shadow-lg' onSubmit={HandleFormSubmit}>
      <h2 className='fs-1 d-flex justify-content-center' >Login</h2>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email Adresi</Form.Label>
      <Form.Control type="email" placeholder="Email girin" value={Email} onChange={(e)=>setEmail(e.target.value)} />
      <Form.Text className="text-muted">
        Email giriş yapmak için gereklidir
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Şifre</Form.Label>
      <Form.Control type="password" placeholder="Şifre" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
    </Form.Group>
    <Button variant="primary" type="submit" className='w-100 p-2'>
      Giriş Yap
    </Button>
  </Form>
  <Modal
      show={modalShow}
      onHide={()=>setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Form Hatası
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Form Hatası</h4>
        <p>
          {ModalText}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
    
    {DashboardNavigate ? ( <Navigate to="/dashboard" />) : null}
      
  




  </>
  )  
}

export default Login
