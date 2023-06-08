import React, { useState } from 'react'
import { Button, Col } from 'react-bootstrap'
function FollowsCard(props) {
    const [follow,setFollow] = useState(true);
    const [deleteFollow,setDeleteFollow] = useState(false);
  return deleteFollow ? null : (

    <Col sm={12} style={{width:"100vh"}}>
       
       <div className="d-flex justify-content-between mt-5">
        <div className='d-flex align-items-center h-100'>
            <img src="https://picsum.photos/id/65/0" alt="user_profile" className='rounded-circle' style={{width:"4rem"}} />
            <h4 className='mx-3'>Remziye Döktürücü</h4>
        </div>
        <div className='d-flex'>
            <Button variant={follow ? "danger" : "primary"} onClick={()=>setFollow(!follow)} className='mx-3'> { follow ? ( <>UnFollow</>  ) : ( <>Follow </> )} </Button>
            {
                props.follows === "deleteFollow" ? (
                    <>
                    <Button variant="danger" onClick={()=>setDeleteFollow(true)}>Delete Follows</Button>
                    </>
                ) : null 
            }
        </div>
       </div>

    </Col>

  )
}

export default FollowsCard
