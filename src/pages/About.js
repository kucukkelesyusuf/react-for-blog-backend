import React from 'react'
import { Col,Row } from 'react-bootstrap'

function About() {
  return (
   <Row>
  
  <Col sm={12} className='bg-light p-3 rounded mb-3 mt-3'>

<Row>
    <Col sm={6}>
      <div className='d-flex flex-column justify-content-center h-100'>
        <h2 className='fs-1 text-lead'>About Us</h2>
        <p className='text-lead'>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.</p>
      </div>
    </Col>
    <Col sm={6}>
      <img src="https://picsum.photos/id/7/0" alt="about-jpeg-1" style={{width:"34rem"}} />
    </Col>
    </Row>
    </Col>
     <Col sm={12} className='bg-light mt-3 mb-3'>

     <Row>
      <Col sm={4} className='d-flex flex-column align-items-center p-3 bg-primary text-white'>
      <div className="icon p-5">
       <i class="fa-solid fa-dollar-sign text-white"></i>
      </div>
      <div className='prising-header'>
      <h2 className='fs-1'>Pricing</h2>
      </div>
      <div className='prising-textcontent'>
        <p className='lead p-3 text-center'>
        Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır.
        </p>
        </div> 

      </Col>
      <Col sm={4}  className='d-flex flex-column align-items-center p-3 bg-danger text-white'>
   <div className='icon'>
   <i class="fa-solid fa-image p-5"></i>
   </div>
   <div className='iamge-header'>
   <h2 className='fs-1'>Image</h2>
      </div>
      <div className='Image-textcontent'>
        <p className='lead p-3 text-center'>
        Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır.
        </p>
        </div> 
      </Col>
      <Col sm={4}   className='d-flex flex-column align-items-center p-3 bg-success text-white'>
      <div className='icon p-5'>
      <i class="fa-solid fa-download"></i> 
   </div>
   <div className='download-header'>
   <h2 className='fs-1'>Download</h2>
      </div>
      <div className='download-textcontent'>
        <p className='lead p-3 text-center'>
        Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır.
        </p>
        </div> 
      </Col>
     </Row>


     </Col>

     <Col sm={12}>
      <Row className="bg-light rounded mb-3 mt-3 p-3">
        <Col sm={6}>
         <img src="https://picsum.photos/id/9/0" alt="about-jpeg-2" style={{width:"34rem"}} />
        </Col>
        <Col sm={6}>
          <div className='d-flex flex-column justify-content-center h-100'>
            <h2 className='fs-1'>Services</h2>
        <p>
        Yinelenen bir sayfa içeriğinin okuyucunun dikkatini dağıttığı bilinen bir gerçektir. Lorem Ipsum kullanmanın amacı, sürekli 'buraya metin gelecek, buraya metin gelecek' yazmaya kıyasla daha dengeli bir harf dağılımı sağlayarak okunurluğu artırmasıdır. Şu anda birçok masaüstü yayıncılık paketi ve web sayfa düzenleyicisi, varsayılan mıgır metinler olarak Lorem Ipsum kullanmaktadır. Ayrıca arama motorlarında 'lorem ipsum' anahtar sözcükleri ile arama yapıldığında henüz tasarım aşamasında olan çok sayıda site listelenir. Yıllar içinde, bazen kazara, bazen bilinçli olarak (örneğin mizah katılarak), çeşitli sürümleri geliştirilmiştir.
        </p>
        </div>
        </Col>
      </Row>
     </Col>
   </Row>
  )
}

export default About
