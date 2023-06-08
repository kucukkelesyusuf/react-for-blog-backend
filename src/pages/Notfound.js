import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';



function Notfound() {

    const {Access} = useContext(AuthContext);


  return (
    <div style={{height:"50vh"}} className='d-flex justify-content-center align-items-center'>
      

      <h2 className='fs-1'> <b> 404 NOT FOUND</b></h2>
   {Access ? (<Navigate to="/dashboard" />) :null}

    </div>


  )
}

export default Notfound
