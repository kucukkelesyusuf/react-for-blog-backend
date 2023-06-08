import React, { createContext, useState } from 'react'
import { useCookies } from 'react-cookie';
import Loading from "./Loading.gif"
import Modal from 'react-bootstrap/Modal';
export const AuthContext = createContext();



const AuthContextProvider = (props)=> {
  const [cookies, setCookie,removeCookie] = useCookies(['access_token']);
  const [loading,setLoading] = useState(false);
  const [Access,setAccess] = useState(false);
  const [user_id,setUser_id] = useState("");
 
 


  return (
<AuthContext.Provider value={{cookies,setCookie,Access,setAccess,removeCookie,setLoading,user_id,setUser_id}}>
  {props.children }
  <Modal 
show={loading}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered>
  <div className='d-flex align-items-center'>
  <img src={Loading} alt="loading" style={{width:"10rem"}} />  <h2 className='fs-1'>İstek işleniyor</h2>
  </div>

</Modal>
</AuthContext.Provider>
  )
}

export default AuthContextProvider
