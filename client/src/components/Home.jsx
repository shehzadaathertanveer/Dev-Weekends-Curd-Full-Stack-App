import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  function handleCreateNewUser() {
    navigate('/Create');
  }

  useEffect(() => {
    // Added /api prefix to hit Express backend via Netlify redirect
    axios.get('/api')
      .then((res) => {
        console.log('Users fetched:', res.data);
        // Fallback to empty array if response isn't an array
        setAllUsers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      });
  }, []);

  function deleteUser(id) {
    // Added /api prefix for delete request
    axios.delete('/api/' + id)
      .then((res) => {
        console.log('User deleted:', res.data);
        // Remove deleted user from state locally
        setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.error('Error deleting user:', err);
      });
  }

  return (
    <div className='h-screen w-full bg-zinc-900 flex justify-center items-center'>
      <div className='bg-white shadow-2xl rounded-2xl p-5 h-fit min-w-xl'>
        <div className='flex flex-row justify-between items-center p-5'>
          <h1 className='text-3xl font-bold'>All Users Table</h1>
          <button 
            className='bg-green-500 hover:bg-green-600 transition-all text-white px-3 py-1.5 rounded cursor-pointer' 
            onClick={handleCreateNewUser}
          >
            Create User
          </button>
        </div>
        <div>
          <table className='w-full text-left'>
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>        
              {allUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2 border-t">{user.Name}</td>
                  <td className="px-4 py-2 border-t">{user.Email}</td>
                  <td className="px-4 py-2 border-t">{user.Age}</td>
                  <td className="px-4 py-2 border-t">
                    <div className="flex gap-2">
                      <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded cursor-pointer"
                        onClick={() => navigate(`/Update/${user._id}`)}
                      >
                        Update
                      </button>
                      <button 
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded cursor-pointer"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}       
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;