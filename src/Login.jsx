import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { createContext, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { initialState, reducer } from './loginReducer';
import './Login.css'
import { useDispatch } from 'react-redux';
import { setUserName } from './Slice/userSlice';

export const Login = () => {

  const schema = yup.object().shape({
    username: yup.string().required("نام کاربری اجباری است"),
    password: yup
      .string()
      .min(4, "رمز عبور حداقل 4 کاراکتر باشد")
      .max(10, "رمز عبور حداکثر 10 کاراکتر باشد")
      .matches(/[a-z]+/, "رمز عبور باید شامل حروف کوچک باشد")
      .matches(/\d+/, "رمز عبور باید شامل عدد باشد")
      .required("رمز عبور اجباری است"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const Dispatch = useDispatch()
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
        if (json.token && data.username === 'mor_2314' && data.password === '83r5^_') {
          dispatch({ type: 'CLEAR_ERROR' });
          Dispatch(setUserName(data.username));
          
          
          navigate('/home');
        }
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'نام کاربری و رمز عبور را اشتباه وارد کرده‌اید' });
      }
    })
    .catch(err => {
      console.error('Fetch error:', err);
      dispatch({ type: 'SET_ERROR', payload: 'یک خطا رخ داده است. لطفاً دوباره تلاش کنید.' });
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)} className='Form ' >
        <h1>Login</h1>
        <span>mor_2314</span>
        <input
        // className='Input'
          placeholder='Enter a userName'
          type='text'
          {...register("username")}
          value={state.username}
          onChange={(e) => dispatch({ type: 'SET_USERNAME', payload: e.target.value })}
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        <span>83r5^_</span>
        <input
          // className='Input'
          placeholder='Enter a password'
          type='password'
          {...register("password")}
          value={state.password}
          onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        
        <button className='mybtn'  type='submit' >Login</button>
      </form>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      
    </>
  );
};
