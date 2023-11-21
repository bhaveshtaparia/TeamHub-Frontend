// UpdateUser.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './updateUser.module.css';
import {useAlert}from 'react-alert'
import url from '../../url';
function UpdateUser() {
  const location = useLocation();
  const customProps = location.state?.customProps;
 const alert=useAlert();
  const [updatedUser, setUpdatedUser] = useState({
    id: customProps.id,
    first_name: customProps.first_name,
    last_name: customProps.last_name,
    email: customProps.email,
    gender: customProps.gender,
    domain: customProps.domain,
    available: customProps.available,
  });
 const Navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/api/v1/update/user/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        alert("Failed to update user")
        throw new Error('Failed to update user');
    }
    
    alert.success("User updated successfully");
      Navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return customProps ? (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img src={customProps.avatar} alt={`${customProps.first_name} ${customProps.last_name}`} />
      </div>
      <div className={styles['form-container']}>
        <h1>Update User</h1>
        <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" value={updatedUser.first_name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="last_name" value={updatedUser.last_name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={updatedUser.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Gender:
          <input type="text" name="gender" value={updatedUser.gender} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Domain:
          <input type="text" name="domain" value={updatedUser.domain} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Available:
          <input
            type="checkbox"
            name="available"
            checked={updatedUser.available}
            onChange={() =>
              setUpdatedUser((prevUser) => ({ ...prevUser, available: !prevUser.available }))
            }
          />
        </label>
        <br />
          <button type="submit">Update</button>
        </form>
       
      </div>
    </div>
  ) : (
    <>
      <div className={styles.Notfound}>User Not Found</div>
    </>
  );
}

export default UpdateUser;
