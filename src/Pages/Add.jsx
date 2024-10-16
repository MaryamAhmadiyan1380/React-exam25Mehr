import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './addPost.css'
export const Add = () => {
  const [post, setPost] = useState({
    title: '',
    body: '',
    username: 'mor_2314',
    password: '83r5^_'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('https://jsonplaceholder.typicode.com/posts', post)
      .then((response) => {
        console.log(response.data);
        alert("پست با موفقیت اضافه شد !")
        navigate('/home'); 
      })
      .catch((error) => {
        console.error('There was an error adding the post!', error);
      });
  };

  return (
    <div className='add-post-container mt-5'>
      <h2>افزودن پست</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>عنوان:</label>
          <input
            type='text'
            name='title'
            placeholder='عنوان پست را وارد کنید'
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>متن پست:</label>
          <textarea
            name='body'
            placeholder='متن پست را وارد کنید'
            value={post.body}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>نام کاربری:</label>
          <input
            type='text'
            name='username'
            value={post.username}
            readOnly
          />
        </div>
        <div className='form-group'>
          <label>رمز عبور:</label>
          <input
            type='password'
            name='password'
            value={post.password}
            readOnly
          />
        </div>
        <div className='form-group'>
          <label>عکس:</label>
          <input
            type='file'
            name='image'
            onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
          />
        </div>
        <button type='submit'>افزودن پست</button>
      </form>
    </div>
  );
};

