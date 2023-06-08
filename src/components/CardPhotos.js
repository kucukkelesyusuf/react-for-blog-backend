import React, { useContext, useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";




function CardPhotos(props) {
  const {cookies,Access} = useContext(AuthContext)
  const [isLiked, setLiked] = useState(false);
  const [Comment, setComment] = useState(false);
  const [file,setFile] = useState({files:null});
  const [userUpdate,setUser] = useState(false);
  const [updateModal,setUpdate] = useState(false);
  const [text,setText] = useState(props.comment);
  const [deleteModal,setModalShow] = useState(false);
  const [Modaltext,setModalText] = useState("");
  const [PhotosComments,setComments] = useState("");
  const [Where,setWhere] = useState(props.user_id);
  const [Comments,setPhotosComments]=useState([{}]);
  let config = {
    headers:{
      'Authorization': 'Bearer ' + cookies.access_token,
      'accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data;`
    }
   }
  let config2 = {
    headers:{
      'Authorization': 'Bearer ' + cookies.access_token,
      'accept': 'application/json',
    }
   }
   
useEffect(()=>{
  if(props.like.indexOf(localStorage.getItem("UserId")) > -1){
    setLiked(true);
  }
  getComment();
},[]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile({files:e.target.files[0]});
    }
  };
  const deletePost = (e)=>{
 
    e.preventDefault();
   setModalText("Silmek istediğinzden emin misiniz ?");
   setModalShow(true);
   setTimeout(()=>{
      setModalShow(false);
   },2100);
  }
const getComment =async()=>{
  let data = await axios.get(`http://localhost:5000/photos/comments/${props.id}`);
  if(!data){
return
  }
  console.log(data.data.data);
setPhotosComments(data.data.data);


}
const CommentCreate = async(e)=>{
e.preventDefault();
let data = await axios.post(`http://localhost:5000/photos/comments/${props.id}`,{
answer_id:Where,
comments:PhotosComments
},config2);
console.log(data);
getComment();
}  

const deletePhotos = async ()=>{
    
  
      console.log("çalıştı");
    const User_information = JSON.parse(localStorage.getItem("User_information"));
    await axios.post("http://localhost:5000/photos/create",{
      email:User_information.email,
      photos_id:props.id,
      method:"delete"
    },config).then(response=>{
      console.log(response);
    
       
     
      
   
    }).catch(err=>{
      console.log(err);
    })
    setModalShow(false);
    
  }
  const updatePhoto = async (e) => {
    
    e.preventDefault();
    const User_information = JSON.parse(localStorage.getItem("User_information"));
  await  axios.post("http://localhost:5000/photos/create",{
      comment:text,
      post_img:file.files,
      method:"put",
      email:User_information.email,
      photos_id:props.id
    },config
    ).then(response=>{
      console.log(response)
      setUpdate(false);
    }).catch(err=>{
      console.log(err);
      setUpdate(false);

    })
  };

  setInterval(()=>{
    if(localStorage.getItem("User_information") !== null && localStorage.getItem("User_information") !== ""){
    const User_information = JSON.parse(localStorage.getItem("User_information"));
    
    if(props.email === User_information.email){
      setUser(true);

    }
  
  }
    },100);


   const  Liked = async ()=>{
    await axios.post("http://localhost:5000/photos/liked",{
      photos_id : props.id
      },
      config2);
    }
   const  undoLiked = async ()=>{
    await axios.post("http://localhost:5000/photos/undolike",{
      photos_id : props.id
      },
      config2);
    }

  
  const Like_photo = ()=>{
    setLiked(!isLiked);

    isLiked ? undoLiked() : Liked()
  }
 
  




  return (
    <>
      <Col sm={4} className="py-5">
        <Card className="h-100">
          <Card.Body className=" bg-dark text-light" >
            <Card.Text className="d-flex flex-column">
              <div className="d-flex align-items-center">
                <img
                  src={`http://localhost:5000/uploads/${props.user_profile}`}
                  alt="user_profile"
                  className="img-fluid rounded-circle"
                  style={{ width: "64px", height: "64px" }}
                />
                <p className="px-3">{props.user_name}</p>
              </div>
              <p>{props.comment}</p>
              <div className="d-flex align-items-center px-3 py-3 justify-content-center">
                <Button variant="dark" onClick={() =>Access ?Like_photo() : null}>
                  {" "}
                
                  <i
                    className={
                      isLiked
                        ? "fa-solid fa-heart text-danger"
                        : "fa-regular fa-heart text-danger"
                    }
                  ></i>{" "}
                  <span>{props.like ? props.like.length : null}</span>
                 
                </Button>
                <Button variant="dark" onClick={() => Access ?  setComment(true):null}>
                  <i className="fa-regular fa-comment"></i> <span>{props.comments ? props.comments.length : null}</span>
                </Button>
                {userUpdate ? (<> <Button variant="dark" onClick={()=> setUpdate(true)}> <i class="fa-solid fa-pen"></i></Button> <Button variant="dark" className="px-3" onClick={deletePost}> <i className="fa-solid fa-trash"></i></Button> </>) :null }
              </div>
              
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src={`http://localhost:5000/posted/${props.img_url}`} style={{maxWidth:"30rem"}} />
        
        </Card>
      </Col>

      {/* Comments */}
      <Modal
        show={Comment}
        onHide={() => setComment(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body id="comments">
         
           { typeof Comments === "object" ? Comments.map((value)=>(

            <>
            {value.photos_id === props.id ?  (<div className="d-flex py-3 align-items-center bg-light p-3 rounded">
            <img
              src={`http://localhost:5000/uploads/${value.user_profile}`}
              className="rounded-circle"
              alt="user_profile"
              style={{ width: "48px", height: "48px" }}
            />
            <div className="d-flex flex-column bg-light w-100">
              <p className="small px-3" style={{ paddingBottom: ".2rem" }}>
                {value.user_name}  <span style={{marginLeft:"1rem"}}>{value.CreatedAt}</span>
              </p>
              <p className="px-3">{value.comments}</p>
            </div>
          </div>) :null
            }        
            
          </>  
)) : null}
        </Modal.Body>
        <Modal.Footer className="d-flex">
          <Form className="w-100" onSubmit={CommentCreate}>
            <Form.Group className="d-flex">
              <Form.Control type="text" value={PhotosComments} onChange={(e)=>setComments(e.target.value)}/>
              <Button type="submit">Gönder</Button>
            </Form.Group>
          </Form>
        </Modal.Footer>
      </Modal>


      <Modal
      show={updateModal}
      size="lg"
      onHide={()=>setUpdate(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Photos
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={updatePhoto}>
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Photo Uploads</Form.Label>
        <Form.Control type="file"  size="lg" onChange={handleFileChange} />
      </Form.Group>
      <Form.Group>
        <Form.Control as="textarea"  placeholder="Birşeyler yazın" value={text} onChange={(e)=>setText(e.target.value)}  rows={10} />
      </Form.Group>
       <Button variant='primary' type="submit" className="mb-3 mt-3">Güncelle</Button>
      </Form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>

    <Modal
      show={deleteModal}
      onHide={()=>setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Kullanıcı işlemleri
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Kullanıcı işlemleri</h4>
        <p>
         {Modaltext}
        </p>
      </Modal.Body>
      <Modal.Footer>
   <Button onClick={deletePhotos}>Sil</Button>
      </Modal.Footer>


    </Modal>

    </>
  )
}

export default CardPhotos;
