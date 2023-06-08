import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import CardPhotos from "../components/CardPhotos";
import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";


function Home() {

  const {post,getAllPost} = useContext(PostContext);

  useEffect(()=>{
getAllPost();
 
  });

  return (
   <>
   {post.length === 0 ? (
        <>
        <div className="d-flex align-items-center justify-content-center bg-light" style={{height:"80vh",width:"100%"}}>
         <h2 className="fs-1 lead">Şuan paylaşılan herhangi bir fotoğraf yok Haydi Paylaş !</h2>
        </div>
        </>

   ) :( 
    <div id="home">
      <h2 className="lead fs-1 py-3">User Photos</h2>
      <Row className="user-photos">
        {post.map((value,key)=>(
          <CardPhotos id={value._id} key={key} img_url={value.img_url} user_profile={value.user_profile} user_id={value.user_id} user_name={value.user_name} like={value.like} comment={value.comment} comments={value.comments} link={value.user_id} email={value.email}/>
        ))}
        

      </Row>
    </div>
    )}
    </>
  );
}

export default Home;
