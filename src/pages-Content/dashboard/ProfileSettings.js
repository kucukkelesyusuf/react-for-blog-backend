import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { AuthContext } from '../../contexts/AuthContext';



function ProfileSettings(props) {
   const {setLoading} = useContext(AuthContext);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [pass1,setPass1] = useState("");
    const [pass2,setPass2] = useState("");

    const [fileImage, setFileImage] = useState({file:null});

    const handleFileChange = (e) => {
      if (e.target.files) {
        setFileImage({files:e.target.files[0]});
      }
    };
   
    
    const ProfilePhotoUpload = async(e) =>{

   e.preventDefault();
   

      if(!fileImage.files){
      props.setModalText("Lütfen Bir Dosya Seçiniz");
        props.setModalShow(true);
        return
      }
      
      const profile_image = fileImage.files
let config = {
     headers:{
       'Authorization': 'Bearer ' + props.cookies.access_token,
       'accept': 'application/json',
       'Accept-Language': 'en-US,en;q=0.8',
       'Content-Type': `multipart/form-data;`
     }
    }
 await axios.post("http://localhost:5000/auth/profile",{
       profile_image:profile_image
      },config).then((response=>{
        console.log(response)
       
          let User_information = JSON.parse(localStorage.getItem("User_information"))
          console.log(User_information);
        localStorage.setItem("User_information",JSON.stringify({
          name:User_information.name,
          profile:response.data.profile_img,
          email:User_information.email
        }));

    setLoading(true)
      
        setTimeout(()=>{
          setLoading(false);
          window.location.reload();
        },1000)
         
      
      
     
      })).catch(err=>{
   
       if(err.response.data.message === "DDD400"){
        props.setModalText("Lütfen desteklenen dosya türü giriniz");
        props.setModalShow(true);
       }
      })
   

  

    }

const UpdateInformaiton = async(e)=>{
 

  e.preventDefault();
 
  if(name === "" && email === "" && pass1 === "" && pass2 === ""){
   props.setModalText("Lütfen En az Birtane Değişiklik yapınız");
   props.setModalShow(true);
  }
  if(name === ""){
    setName(undefined)
  }
  if(email === ""){
    setEmail(undefined)
  }
  if(pass1 === ""){
   setPass1(undefined)
  }
  if(pass2 === ""){
    setPass2(undefined);
  }
  let config = {
    headers:{
      'Authorization': 'Bearer ' + props.cookies.access_token,

    }
   }
   if(pass1 !== pass2){
     props.setModalShow(true)
     props.setModalText("şifrelerinizi lütfen aynısını yazdığnızdan emin olun")
     return
   }
   console.log(name);
 await axios.post("http://localhost:5000/auth/information/update",{
    name:name,
    email:email,
    password:pass1
  },config).then(response=>{
    console.log(response)
        let name_r = response.data.user_name;
        let email_r = response.data.user_email;

        let User_information = JSON.parse(localStorage.getItem("User_information"))
          console.log(User_information);
        localStorage.setItem("User_information",JSON.stringify({
          name:name_r,
          profile:User_information.profile,
          email:email_r
        }));
          setLoading(true);
          setTimeout(()=>{
          setLoading(false);
   props.update();
          },1000)
  }).catch(err=>{
   if(err){
    props.setModalText("Bilgiler güncellenirken bir Hata oluştu");
    props.setModalShow(true);
   }
  })

 
}

  

  return (
    <div>
      <h2 className='fs-1 lead'>Profile Settings</h2>
      <Form onSubmit={ProfilePhotoUpload}>

        <Form.Group> 
              <Form.Label>
                Profil Resmi Seçin
              </Form.Label>
            <Form.Control type="file" onChange={(e)=>handleFileChange(e)} placeholder='bir dosya seçin' />
       </Form.Group>    
       <Button className="mt-3 mb-3" variant="primary" type="submit">Profili Güncelle</Button>
      
       </Form>
       <Form onSubmit={UpdateInformaiton}>
        <Form.Group>
             <Form.Label>
               İsim Seçin    
            </Form.Label> 
            <Form.Control type="text" placeholder="Adınızı ve Soyadınızı yazın" value={name} onChange={(e)=>setName(e.target.value)} />
             <Form.Label>
              Email   
            </Form.Label> 
            <Form.Control type="email" placeholder="Emailinizi yazın" value={email} onChange={(e)=>setEmail(e.target.value)}/>
             <Form.Label>
              Şifre  
            </Form.Label> 
            <Form.Control type="password" placeholder="Şifrenizi belirleyin ve yazın" value={pass1} onChange={(e)=>setPass1(e.target.value)}/>
             <Form.Label>
             Şifre (Tekrar) 
            </Form.Label> 
            <Form.Control type="password" placeholder="Şifrenizi Tekrardan yazın" value={pass2} onChange={(e)=>setPass2(e.target.value)}/>
        
        </Form.Group>
        <Button variant="primary" className='mb-3 mt-3' type="submit">Güncelle</Button>
       </Form>
    </div>
  )
}


export default ProfileSettings
