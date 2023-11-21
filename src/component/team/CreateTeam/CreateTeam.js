// Import your CSS module
import styles from './CreateTeam.module.css';
import React, { useState, useEffect } from 'react';
import url from '../../../url';
import { useAlert } from 'react-alert';

function CreateTeam() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/v1/get/all/user/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };
   
    fetchData();
  }, []);

  const addToTeam = (user) => {
    setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, user]);
   
    setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
  };

  const removeFromTeam = (userId) => {
    const removedUser = selectedUsers.find(user => user.id === userId);
    setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(user => user.id !== userId));
  
    setUsers(prevUsers => [...prevUsers, removedUser]);
  };

  const renderUserTable = (userList, addButton = true) => {
    return (
      <div className={styles['selected-users']}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Domain</th>
            <th>Availability</th>
            {addButton && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.domain}</td>
              <td>{user.available ? 'Available' : 'Not Available'}</td>
              {addButton && (
                <td>
                  <button className={styles.button} onClick={() => addToTeam(user)}>
                    Add to Team
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  };

  const renderSelectedUsers = () => {
    return (
      <div className={styles['selected-users']}>
        <h2>Selected Users</h2>
        <input
        className={styles.input}
          type="text"
          placeholder="Type Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {selectedUsers.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Domain</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.domain}</td>
                  <td>{user.available ? 'Available' : 'Not Available'}</td>
                  <td>
                    <button className={styles.button} onClick={() => removeFromTeam(user.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No selected users.</p>
        )}
      </div>
    );
  };

const alert=useAlert();
  const handleCreateTeam=async()=>{
    if(name.length===0){
      alert.error("Enter The Team Name");
      return;
    }
    try {
      const response = await fetch(`${url}/api/v1/create/team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          userIds: selectedUsers.map((user) => user.id),
        }),
      });
    console.log(response)
      if (!response.ok) {
        throw new Error('Failed to create team ,domain should be unique and user should be available');
      }

      const data = await response.json();
       alert.success(data.message);
     
    } catch (error) {
      console.error('Error creating team:', error);
      // Handle errors, display a message, etc.
      alert.error(error.message);
    }
  }
  return (
    <div>
      <div className={styles.heading}>
      <h1 >Create Team</h1>
      </div>
      {renderUserTable(users)}
      {renderSelectedUsers()}
      <div className={styles.center}>
        <button disabled={selectedUsers.length > 0?false:true} onClick={handleCreateTeam}>Create Team</button>
      </div>
    </div>
  );
}

export default CreateTeam;
