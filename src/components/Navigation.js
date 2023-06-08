import React, { useContext,useEffect,useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
function Navigation() {
const {cookies,setAccess,Access,removeCookie,setUser_id} = useContext(AuthContext);
const [modalShow,setModalShow] = useState(false);
const [ModalText,setModalText] = useState("");
const [navigate,setNavigate] = useState(false);
const [ShowButton,setButtonShow] = useState(false);



useEffect(()=>{

 
if(cookies.access_token){
  setAccess(true);
  setNavigate(false);
}else{
  setAccess(false);
  setNavigate(true);
}
});


const offline =async ()=>{
    let config = {
     headers:{
       'Authorization': 'Bearer ' + cookies.access_token
     }
     }
  await axios.get("http://localhost:5000/auth/offline",config).then(data=>{
    if(!data.data.online){
      setModalShow(true);
      setModalText("Oturumunuz Sonlanmıştır");
      
    }
  });
  removeCookie("access_token");
  localStorage.setItem("User_information","");
  localStorage.setItem("UserId","");
  window.location.reload(false);
}


if(cookies.access_token && navigate === false){
    
console.log("çalışıyor");
 const  auth = setInterval(async()=>{
    let config = {
     headers:{
       'Authorization': 'Bearer ' + cookies.access_token
     }
     }
     await axios.get("http://localhost:5000/users/authorization/control",config).then((response)=>{
         const {authenticate} = response.data;
           
           setUser_id(response.data.user_id);
           localStorage.setItem("UserId",response.data.user_id);
         setAccess(authenticate);
         if(response.data.security){
         const date =new  Date(response.data.security.date);
         if(response.data.security.security){
          setModalShow(true);
          setButtonShow(false);
          setModalText (`Oturumunuz açıkken  farklı yerden giriş yapılmıştır Giriş Yapım Tarihi: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}-${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`)
         }
        }
     }).catch(async(err)=>{
      console.log(err);
      if(err.response){
     let errCode = err.response.data.message;
      console.log(err.response.data.message);
      if(errCode === "OGEAZG"){
       
       setModalText("Oturumunuzun süresi dolmuştur Lütfen Giriş Yapınız.");
       setModalShow(true);
       setAccess(false);
       clearInterval(auth);
      const userId = localStorage.getItem("UserId");
      const email = JSON.parse(localStorage.getItem("User_information")).email;
       const post= {
         "user_email":email,
         "user_id":userId
       }
       await axios.post("http://localhost:5000/auth/offline/otomatic",post);
       return
      }
      else if(errCode === "OGEAY4"){
        
        setModalText("Lütfen Çerezlerinizi Kontrol edin.");
        setModalShow(true);
        setAccess(false);
        clearInterval(auth);
        return
        
      }
    }else{
      setModalText("Sisteme Giriş yapılamıyor internet bağlantınızın düzgün olduğundan emin olun");
      setModalShow(true);
      clearInterval(auth);
     return
    }
     })
 

    },10000);
  }
  return (
    <div>
      <Navbar bg="primary" expand="lg" className="navbar-dark">
        <Container>
          <Navbar.Brand href="#home">Yusufs Photos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/about"
              >
                About
              </NavLink>
              {Access ? ( <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/dashboard"
              >
                DashBoards
              </NavLink>) :null}
             
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/contact"
              >
                Contact
              </NavLink>
              {Access ? null :(<NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/register"
              >
                Register
              </NavLink>)}
              {Access ? null : (<NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/login"
              >
                Login
              </NavLink>)}

            {Access ? ( <Button variant="danger" onClick={offline}>Oturumu kapat</Button>) : null} 
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Modal
      show={modalShow}
      size="lg"
      onHide={ShowButton ? null :()=>setModalShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Oturum Açma Hatası
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Oturum Hatası</h4>
        <p>
          {ModalText}
        </p>
      </Modal.Body>
      <Modal.Footer>
      { ShowButton ? (<NavLink to="/login" className="btn btn-primary mb-3 mt-3" onClick={()=>{setModalShow(false); setNavigate(true); removeCookie("access_token")}}>Giriş Sayfasına Git</NavLink>
      
              ):null}</Modal.Footer>


    </Modal>

    
    </div>
  );
}

export default Navigation;
