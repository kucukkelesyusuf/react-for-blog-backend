import React from 'react'
import { useParams } from 'react-router-dom'

function PhotosSingle() {
    const {id} = useParams();
  return (
    <div>
      <h1> photos {id} </h1>
    </div>
  )
}

export default PhotosSingle
