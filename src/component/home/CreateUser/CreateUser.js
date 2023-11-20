import React, { useState } from 'react';
import styles from './createUser.module.css';
import {useAlert}from 'react-alert'
import { useNavigate } from 'react-router-dom';
function CreateUser() {
    const alert=useAlert();
    const Navigate=useNavigate();
  const [user, setUser] = useState({
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    domain: '',
    available: false,
    avatar: '', // Include avatar in the form
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/create/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const createdUser = await response.json();
     alert.success(createdUser.message);
     
     Navigate('/');
    } catch (error) {
        console.error('Error creating user:', error);
        alert.error(error.message);
     
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        {/* You can choose to hide the ID input, as it might be generated on the server */}
        <label>
          ID:
          <input
            type="Number"
            name="id"
            value={user.id}
            onChange={handleInputChange}
            // readOnly
          required
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={user.first_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={user.last_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
  Gender:
  <select
    name="gender"
    value={user.gender}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Bigender">Bigender</option>
    <option value="Agender">Agender</option>
  </select>
</label>

<label>
  Domain:
  <select
    name="domain"
    value={user.domain}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Domain</option>
    <option value="Sales">Sales</option>
    <option value="Finance">Finance</option>
    <option value="Marketing">Marketing</option>
    <option value="Management">Management</option>
    <option value="UI Designing">UI Designing</option>
    <option value="IT">IT</option>
    <option value="Business">Business</option>
  </select>
</label>

        <label>
          Available:
          <input
            type="checkbox"
            name="available"
            checked={user.available}
            onChange={() =>
              setUser((prevUser) => ({ ...prevUser, available: !prevUser.available }))
            }
          />
        </label>
        <label>
          Avatar:
          <input
            type="text"
            name="avatar"
            value={user.avatar}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default CreateUser;
