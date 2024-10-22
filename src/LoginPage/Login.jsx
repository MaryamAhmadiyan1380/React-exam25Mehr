import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import './Login.css';
import { Modal } from 'react-bootstrap';

const schema = yup.object().shape({
  username: yup.string().required("Username is mandatory"),
  password: yup
    .string()
    .min(4, "The password must be at least 4 characters long")
    .max(10, "The password must be a maximum of 10 characters")
    .matches(/[a-z]+/, "Password must contain lowercase letters")
    .matches(/\d+/, "Password must contain numbers")
    .required("Password is mandatory"),
});

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const onFormSubmit = (data) => {
    fetch("https://fakestoreapi.com/auth/login", {
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        password: data.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.token) {
        dispatch({ type: 'user/setToken', payload: json.token });
        dispatch({ type: 'user/setUsername', payload: data.username });
        navigate('/');
      } else {
        setShowModal(true);
      }
    })
    .catch(err => {
      console.error('Fetch error:', err);
      setShowModal(true);
    });
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)} className='Form'>
        <h1>Login</h1>
        <input
          placeholder='Enter your username'
          type='text'
          {...register("username")}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        <input
          placeholder='Enter your password'
          type='password'
          {...register("password")}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        <button className='mybtn' type='submit'>Login</button>
      </form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Incorrect username or password , Please try again</Modal.Body>
        <Modal.Footer>
          <button className='btn btn-danger' onClick={handleCloseModal}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
