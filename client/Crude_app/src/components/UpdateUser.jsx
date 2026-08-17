import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useParams} from "react-router-dom"


function UpdateUser() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Age, setAge] = useState('');

    const navigate =useNavigate()

    const {id}= useParams()

    useEffect(()=>{
        axios.get('http://localhost:8001/Update/'+id)
      .then((res) => {
        console.log('Users fetched:', res.data);
        setName(res.data.Name);
        setEmail(res.data.Email);
        setAge(res.data.Age);
      })
      .catch((err) => {
        console.error('Error getting user for updating user:', err);
      });
    },[])

  function handleUpdateUser(e) {
    e.preventDefault(); 

    axios.patch('http://localhost:8001/Update/'+id, { Name, Email, Age })
      .then((res) => {
        console.log('User updated:', res.data);
        setName('');
        setEmail('');
        setAge('');

        navigate('/')
        
      })
      .catch((err) => {
        console.error('Error updating user:', err);
      });
  }

  return ( 
    <div className='min-h-screen w-full bg-zinc-900 flex justify-center items-center p-4'>
      <div className='bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md'>
        
        <div className='text-center mb-6'>
          <h1 className='text-3xl font-extrabold text-zinc-800 tracking-tight'>
            Update User
          </h1>
          <p className='text-sm text-zinc-500 mt-1'>
            Fill in the details you wish to change.
          </p>
        </div>

        <form className='flex flex-col gap-5' onSubmit={handleUpdateUser}>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-semibold text-zinc-700' htmlFor='name'>
              Name
            </label>
            <input 
              id='name'
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className='w-full border border-zinc-300 rounded-lg p-3 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              type="text" 
              placeholder='Enter full name'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-semibold text-zinc-700' htmlFor='email'>
              Email
            </label>
            <input 
              id='email'
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border border-zinc-300 rounded-lg p-3 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              type="email" 
              placeholder='name@example.com'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-semibold text-zinc-700' htmlFor='age'>
              Age
            </label>
            <input 
              id='age'
              value={Age}
              onChange={(e) => setAge(e.target.value)}
              className='w-full border border-zinc-300 rounded-lg p-3 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all' 
              type="number" 
              placeholder='e.g. 25' 
              required
            />
          </div>

          <button 
            type="submit" 
            className='mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer'
          >
            Update User
          </button>
        </form>

      </div>
    </div>
  );
}

export default UpdateUser;