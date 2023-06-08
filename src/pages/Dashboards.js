import React, { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import PhotoAdd from "../pages-Content/dashboard/PhotoAdd";
import ProfileSettings from "../pages-Content/dashboard/ProfileSettings";
import Follow from "../pages-Content/dashboard/Follow";
import Follows from "../pages-Content/dashboard/Follows";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Dashboards() {
  const {cookies,Access} = useContext (AuthContext);
  const [name_,setName] = useState("");
  const [email_,setEmail] = useState("");
  const [profile,setProfile] = useState("Default_user.png");
  const [modalShow,setModalShow] = useState(false);
  const [ModalText,setModalText] = useState("");


  const updateInformation = ()=>{ 
  if(localStorage.getItem("User_information")){
     
    const User_information = JSON.parse(localStorage.getItem("User_information"));
   
   
      setProfile(User_information.profile);
      setName(User_information.name);
      setEmail(User_information.email);
     

  }
}


      useEffect(()=>{
        updateInformation();
      },[])


  return (
    <>
    
    { Access ? (
    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#profilesetting">
      <Row>
        <Col sm={3} style={{ height: "100vh" }} className="bg-light mt-3 p-3">
          <div className="d-flex flex-column align-items-center">
            <img
              src={`http://localhost:5000/uploads/${profile}`}
              alt="user_profile"
              style={{ width: "16rem", height: "16rem" }}
              className="rounded-circle"
            />
            <h2 className="fs-2  lead">{name_}</h2>
            <h4 className="lead">{email_}</h4>
          </div>
          <ListGroup className="text-center">
            <ListGroup.Item action href="#addphoto">
            Photos 
            </ListGroup.Item>
            <ListGroup.Item action href="#profilesetting">
             Profile Settings
            </ListGroup.Item>
            <ListGroup.Item action href="#follow">
            Follow
            </ListGroup.Item>
            <ListGroup.Item action href="#follows">
            Follows
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={9}>
        <Tab.Content>
            <Tab.Pane eventKey="#addphoto">
              <PhotoAdd cookies={cookies} setModalShow={setModalShow} setModalText={setModalText}/>
            </Tab.Pane>
            <Tab.Pane eventKey="#profilesetting">
              <ProfileSettings cookies={cookies}  setProfile={setProfile} setModalShow={setModalShow} setModalText={setModalText} update={updateInformation}/>
            </Tab.Pane>
            <Tab.Pane eventKey="#follow">
              <Follow />
            </Tab.Pane>
            <Tab.Pane eventKey="#follows">
              <Follows />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
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
    </Tab.Container>
    

   ) :(<Navigate to="/login" />)  }
   
  </>
  );

}

export default Dashboards;
