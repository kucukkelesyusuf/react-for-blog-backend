import React from 'react'
import { Row } from 'react-bootstrap'
import FollowsCard from '../../components/FollowsCard'

function Follows() {
  return (
    <div>
      <h1>Follows - Takipçiler</h1>
      <Row>
        <FollowsCard follows="deleteFollow"/>
        <FollowsCard follows="deleteFollow"/>
        <FollowsCard follows="deleteFollow"/>
        <FollowsCard follows="deleteFollow"/>
        <FollowsCard follows="deleteFollow"/>
        <FollowsCard follows="deleteFollow"/>
        <FollowsCard follows="deleteFollow"/>
        <FollowsCard follows="deleteFollow"/>
        <FollowsCard follows="deleteFollow"/>
      </Row>
    </div>
  )
}

export default Follows
