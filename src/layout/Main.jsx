import { Outlet, useNavigate , useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import img1 from '../images/one.jpg';
import img2 from '../images/two.jpg';
import img3 from '../images/three.jpg';
import img4 from '../images/four.jpg';
import { Carousel } from 'react-responsive-carousel';
import '../layout/Main.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function Main() {
  const navigate = useNavigate();
  const location = useLocation()
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    if (!token) {
      console.log(token);
      
      navigate('/login');
      console.log(token);
    }else if(token) {
      navigate("/")
    }
    
  }, [token, navigate]);
  return (
    <>
    <Header />
    <div>
      {location.pathname === '/' && (
        <Carousel className="carousel">
          <div id="carousel">
            <img src={img1} className="pic" alt="Carousel Image 1" />
            <h2>Login Page Picture</h2>
          </div>
          <div>
            <img src={img2} className="pic" alt="Carousel Image 2" />
            <h2>Home Page Picture</h2>
          </div>
          <div>
            <img src={img3} className="pic" alt="Carousel Image 3" />
            <h2>User List Page Picture</h2>
          </div>
          <div>
            <img src={img4} className="pic" alt="Carousel Image 4" />
            <h2>Add Post Page Picture</h2>
          </div>
        </Carousel>
      )}
      <Outlet />
    </div>
    <Footer />
  </>
  );
}

export default Main