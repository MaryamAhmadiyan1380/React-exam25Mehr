import React, { useEffect } from "react";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink , useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

function Header() {
    const username = useSelector((state) => state.user.username);
    const location = useLocation()
    useEffect(() => {
        console.log(`Username from Redux: ${username}`);
    }, [username]);

    return (
        <div className="headerDiv">
            <Navbar collapseOnSelect expand="lg" variant="light" className="navbar">
                <Container fluid>
                    <Navbar.Brand as={NavLink} to="/">Home page</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/user">User List</Nav.Link>
                            <Nav.Link as={NavLink} to="/add">Add Post</Nav.Link>
                            <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                            <Nav.Link as={NavLink} to="/exit">Exit</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
           {location.pathname === "/" &&<h1>welcome to my page {username}</h1>} 
        </div>
    );
}

export default Header;
