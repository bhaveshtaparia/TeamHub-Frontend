
import React, { useState, useEffect } from 'react';
import url from '../../../url';
import {useNavigate } from 'react-router-dom';

import styles from './TeamProfile.module.css';
function TeamProfile() {
  const Navigate=useNavigate();
  const handleProfie=async(id)=>{
    
    Navigate('/profile',{ state: { customProps: id } })
  }
  const [teams, setTeams] = useState([]);

  // Fetch teams when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/v1/team`);

        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }

        const data = await response.json();
        setTeams(data.team);
      } catch (error) {
        // Handle errors
        console.error('Error fetching teams:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  return (
    <div className={styles['team-profile']}>
      <h1>Team Name</h1>

      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <ul className={styles['team-list']}>
          {teams.map((team) => (
            <li key={team._id} className={styles['team-item']} onClick={()=>handleProfie(team._id)}>
              {team.name} - Users: {team.users.length}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TeamProfile;
