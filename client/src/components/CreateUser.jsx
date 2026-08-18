import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Age, setAge] = useState('');

  const navigate = useNavigate();

  function handleCreateUser(e) {
    e.preventDefault();

    axios.post('/api/Create', { Name, Email, Age })
      .then((res) => {
        console.log('User created:', res.data);
        setName('');
        setEmail('');
        setAge('');
        navigate('/');
      })
      .catch((err) => {
        console.error('Error creating user:', err);
      });
  }

  return ( 
    <div className='min-h-screen w-full bg-zinc-900 flex justify-center items-center p-4'>
      <div className='bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md'>
        
        <div className='text-center mb-6'>
          <h1 className='text-3xl font-extrabold text-zinc-800 tracking-tight'>
            Create A New User
          </h1>
          <p className='text-sm text-zinc-500 mt-1'>
            Fill in the details below to add a user.
          </p>
        </div>

        <form className='flex flex-col gap-5' onSubmit={handleCreateUser}>
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
            Create User
          </button>
        </form>

      </div>
    </div>
  );
}

export default CreateUser;