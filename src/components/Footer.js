import React from 'react'
import { NavLink } from 'react-router-dom'
function Footer() {
  return (
<div className='bg-dark text-light w-100' style={{height:"40vh"}}>
      <div className='footer-content d-flex justify-content-between align-items-center h-100 container'>

<div className='copyright contact d-flex flex-column'>
   <p>Yusuf Photos © No Copyright</p>
   <a href="tel:00123456789">Phone</a>
   <a href="https://example@gmail.com">E-mail Example@gmail.com</a>
</div>

<div className='contact d-flex flex-column'>
  <p>Site Maps</p>
  <NavLink to="/">Home</NavLink>
  <NavLink to="/">About</NavLink>
  <NavLink to="/">Photos</NavLink>
  <NavLink to="/">Dashboards</NavLink>
  <NavLink to="/">Contact</NavLink>
  <NavLink to="/">Register</NavLink>
  <NavLink to="/">Login</NavLink>
</div>

      </div>
</div>
  )
}

export default Footer
