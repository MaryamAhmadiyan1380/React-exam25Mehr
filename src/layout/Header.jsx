
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { NavLink } from 'react-router-dom';
import '../Pages/Home.css';
import { useSelector } from 'react-redux';
import './Header.css'
function Header() {
  
  const username = useSelector((state) => state.user.username);
  useEffect(() => {
   
      console.log(`Username from Redux: ${username}`);
     
    }, [username])
  return (
    <div className="headerDiv">
      <Navbar data-bs-theme="light" className='navbar' >
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">Home page</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/user" >User List</Nav.Link>
            <Nav.Link as={NavLink} to="/add">Add Post</Nav.Link>
            <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
            <Nav.Link as={NavLink} to="/exit">Exit</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <h1>welcome to my page {username}</h1>
    </div>
  );
}

export default Header;