import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './addPost.css'
export const Add = () => {
  const [post, setPost] = useState({
    title: '',
    body: '',
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const [showModal , setShowModal] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(post.username === "mor_2314" && post.password === "83r5^_"){
      Axios.post('https://jsonplaceholder.typicode.com/posts', post)
        .then((response) => {
          console.log(response.data);
          alert("Post added successfully");
          // navigate('/home');
        })
        .catch((error) => {
          console.error('There was an error adding the post!', error);
          setShowModal(true);
        });
    } else {
      setShowModal(true);
    }
  };
  // const goToHome = () => {
  //   navigate("/")
  // }

  return (
    <div className='add-post-container mt-5'>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            type='text'
            name='title'
            placeholder='Enter title in post'
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Text post :</label>
          <textarea
            name='body'
            placeholder='Enter  the text post'
            value={post.body}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>User Name :</label>
          <input
            type='text'
            name='username'
            placeholder='Enter your UserName'
            value={post.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Enter your password'
            value={post.password}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className='form-group'>
          <label>Photo</label>
          <input
            type='file'
            name='image'
            onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
          />
        </div> */}
        <button type='submit'>Add post</button>
        {/* <button onClick={goToHome} className='mt-2'>Go to Home</button> */}
      </form>
      
    </div>
  );
};

