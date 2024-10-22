import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './User.css';
import { Modal, Button } from 'react-bootstrap';

const schema = yup.object().shape({
  name: yup.string().required("Name is mandatory"),
  username: yup.string().required("UserName is mandatory"),
  email: yup.string().email("The email is invalid").required("Email is mandatory"),
  phone: yup.string().required("Phone is mandatory")
});

export const User = () => {
  const [infoList, setInfoList] = useState([]);
  const [newInfo, setNewInfo] = useState({
    name: '',
    username: '',
    email: '',
    phone: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    Axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setInfoList(res.data);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
    setValue(name, value);
  };

  const addInformation = (data) => {
    if (editingIndex !== null) {
      Axios.put(`https://jsonplaceholder.typicode.com/users/${newInfo.id}`, newInfo)
        .then(() => {
          const updatedList = infoList.map((info, index) =>
            index === editingIndex ? newInfo : info
          );
          setInfoList(updatedList);
          setEditingIndex(null);
          setShowModal(true);
        })
        .catch((err) => {
          console.error('Update error:', err);
        });
    } else {
      Axios.post('https://jsonplaceholder.typicode.com/users', newInfo)
        .then((res) => {
          setInfoList([...infoList, res.data]);
        })
        .catch((err) => {
          console.error('Create error:', err);
        });
    }
    setNewInfo({
      name: '',
      username: '',
      email: '',
      phone: ''
    });
  };
  
  const deleteInformation = (index) => {
    const id = infoList[index].id;
    Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        const updatedList = infoList.filter((info, i) => i !== index);
        setInfoList(updatedList);
      })
      .catch((err) => {
        console.error('Delete error:', err);
      });
  };

  const editInformation = (index) => {
    const info = infoList[index];
    setNewInfo(info);
    setValue('name', info.name);
    setValue('username', info.username);
    setValue('email', info.email);
    setValue('phone', info.phone);
    setEditingIndex(index);
  };
  

  return (
    <div className='container'>
      <form className='mt-5' onSubmit={handleSubmit(addInformation)}>
        <input
          className='form'
          type='text'
          name='name'
          placeholder='enter your name'
          {...register('name')}
          onChange={handleChange}
          value={newInfo.name}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
        <input
          className='form'
          type='text'
          name='username'
          placeholder='enter username'
          {...register('username')}
          onChange={handleChange}
          value={newInfo.username}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
        <input
          className='form'
          type='email'
          name='email'
          placeholder='enter your email'
          {...register('email')}
          onChange={handleChange}
          value={newInfo.email}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <input
          className='form'
          type='text'
          name='phone'
          placeholder='enter your phone'
          {...register('phone')}
          onChange={handleChange}
          value={newInfo.phone}
        />
        {errors.phone && <p className="error">{errors.phone.message}</p>}
        <div className='mt-3'>
          <button className='form' type='submit'>
            {editingIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>
        <div className='list'>
          {infoList.map((info, index) => (
            <div key={index} className='list-item'>
              <h2>Name: {info.name}</h2>
              <p>Username: {info.username}</p>
              <p>Email: {info.email}</p>
              <p>Phone: {info.phone}</p>
              <button type='button' onClick={() => editInformation(index)}>Edit</button>
              <button className='mt-2' type='button' onClick={() => deleteInformation(index)}>Delete</button>
            </div>
          ))}
        </div>
      </form>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ediet is successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ediet information is successfully
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
