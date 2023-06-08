import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboards from "./pages/Dashboards";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import PhotosSingle from "./pages/PhotosSingle";
import  { AuthContext } from "./contexts/AuthContext";
import Notfound from "./pages/Notfound";
import PostContextProvider from "./contexts/PostContext";
function App() {

  const {Access} = useContext(AuthContext);

  return (
    <>

      <Navigation />

      <Container>
      
        <Routes path="/">
         
          <Route index element={(<PostContextProvider>  <Home /></PostContextProvider>)} />
          
          
          <Route path="about" element={<About />} />
          <Route path="dashBoard" element={<Dashboards />} />
          <Route path="contact" element={<Contact />} />
         {Access ? null :(<Route path="register" element={<Register />} />)}  
         {Access ? null :(<Route path="login" element={<Login />} />)}  
          <Route path="photos/:id" element={<PhotosSingle />} />
          <Route path="*" element={<Notfound  />}   />
        </Routes>
   
      </Container>
      <Footer />

    </>
  );
}

export default App;
