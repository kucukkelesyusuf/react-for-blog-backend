import React from 'react'
import { Row } from 'react-bootstrap'
import FollowsCard from '../../components/FollowsCard'
function Follow() {
  return (
    <div>
      <h1>Follow - Takip</h1>
      
      <Row>
       
       <FollowsCard />
       <FollowsCard />
       <FollowsCard />
       <FollowsCard />
       <FollowsCard />
       <FollowsCard />

      </Row>

    </div>
  )
}

export default Follow
