import React from 'react'
import { Col,Row } from 'react-bootstrap'

function Contact() {
  return (
   <Row>

    <Col sm={6}>
    <img src='https://picsum.photos/id/9/0' alt="contact-jpeg" style={{width:"34rem"}} />
    </Col>
    <Col sm={6}>
      <div className='d-flex flex-column justify-content-center h-100'>
        <h2 className='fs-1 lead'>Contact Us</h2>
        <a href="tel:05555555555">Phone : 0555 555 5555</a>
        <a href="mail:example@gmail.com">example@gmail.com</a>
        <a href="https://google.maps.com">location : Sincan/Ankara smfmlsdglksn</a>
      </div>
    </Col>
    </Row>
  )
}

export default Contact
