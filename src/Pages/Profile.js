import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ProfileImage from '../Pages/Image/ProfileImage.jpg'
import './Profile.css';
import { useSelector } from 'react-redux';

export const Profile = () => {
  const [show, setShow] = useState(false);
  const username = useSelector((state) => state.user.username);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
    <div className="content">
        <h1>Welcome to the Profile Page!</h1>
        {/* Content here */}
      </div>
    <div className="profile-container">
      <Button variant="primary" onClick={handleShow}>
        Open Profile Menu
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="profile-info">
            <img src={ProfileImage} alt="Profile" className="profile-pic" />
            <h2>{username}</h2>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/user">User List</NavLink>
              </li>
              <li>
                <NavLink to="/add">Add Post</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/exit">Exit</NavLink>
              </li>
            </ul>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>

      
    </div>
    </React.Fragment>
  );
};
