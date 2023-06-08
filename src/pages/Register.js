import axios from 'axios';
import React, {useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
function Register() {
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [pass1,setPass1] = useState("");
  const [pass2,setPass2] = useState("");
  const [modalShow,setModalShow] = useState(false);
  const [modaltext,setModalText] = useState([]);
  const [NavigateLoginPage,setNavigate] = useState(false);
  let errors=[];

  const {setLoading,Access} = useContext(AuthContext);

const SubmitForm =(e)=>{

  e.preventDefault();
  
   if(pass1 ===pass2){
    setLoading(true);
    setTimeout(async()=>{ 
    await axios.post("http://localhost:5000/auth/register",{
      email:email,
      name:name,
      password:pass1,
      
    }).then(
      (response)=>{
       setLoading(false);
        let data= response.data;
   
      console.log(data);
       if(data.navigate){
        setNavigate(true);
       }

      }
    ).catch((err)=>{
      setLoading(false);
  console.log(err.response.data);
      let data = err.response.data;
      let errCode = data.message.split(",");
       errors.push(errCode);
      console.log(errCode);
    setModalShow(true);
    errors.map((errCode,key)=>{
      if(errCode.length > 2){
       return function(){
        setModalText("Lütfen gerekli Alanları doldurun !!!")
        setModalShow(true);
       }();
      }
      if(errCode[key]==="VDE400"){
        setModalText("Aynı Hesap zaten var")
      }
      if(errCode[key] === "N40000"){
        setModalText("Lütfen isiminizi yazınız")
      }
      if(errCode[key] === "P00600"){
        setModalText("şifre en az 6 karakterden oluşmak zorundadır")
      }
      if(errCode[key] === "P40000"){
        setModalText("Lütfen bir şifre Belirleyiniz")
      }
      if(errCode[key] === "E40000"){
        setModalText("Lütfen Emailinizi yazınız");
      }
    })
  })
  },2300)
   }
   else{
    setModalText("Şifreler uyuşmuyor")
    setModalShow(true);
   }
  


  
}


  return (
   <>
    {!(Access) ? (
    <div className='d-flex align-items-center flex-column'>
          
          <Form id="login-register-form" className='bg-light rounded p-5 shadow-lg' onSubmit={SubmitForm}>
            <h2 className='fs-1 d-flex justify-content-center' >Register</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Adresi</Form.Label>
            <Form.Control type="email" placeholder="Email girin" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Form.Text className="text-muted">
              Email giriş yapmak için gereklidir
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>İsim</Form.Label>
            <Form.Control type="text" placeholder="İsminnizi yazınız" value={name} onChange={(e)=>setName(e.target.value)}/>
            <Form.Text className="text-muted">
              Adınız giriş yapmak için gereklidir
            </Form.Text>
          </Form.Group>
      
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Şifre</Form.Label>
            <Form.Control type="password" value={pass1} onChange={(e)=>setPass1(e.target.value)} placeholder="Şifre" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Şifre (tekrar)</Form.Label>
            <Form.Control type="password" value={pass2} onChange={(e)=>setPass2(e.target.value)} placeholder="Şifre" />
          </Form.Group>
      
          <Button variant="primary" type="submit" className='w-100 p-2'>
            Kayıt Ol
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
                Register Error
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Form Hatası</h4>
              <p>
            {modaltext}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>setModalShow(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
          {NavigateLoginPage ? (<Navigate to="/login" />) : null}
          </div>) : (<Navigate to="/dashboard" />)}
       
   

  </>

  )
}

export default Register
