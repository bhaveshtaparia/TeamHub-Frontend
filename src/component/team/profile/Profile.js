// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import url from '../../../url';

// Import CSS module
import styles from './Profile.module.css';

function Profile() {
  const location = useLocation();
  const customProps = location.state?.customProps;
  const [team, setTeam] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    if (!customProps) {
      Navigate('/');
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/v1/showTeamDetails?teamId=${customProps}`);
        if (!response.ok) {
          throw new Error('Failed to fetch team details');
        }

        const data = await response.json();
        setTeam(data.teamDetails);
      } catch (error) {
        // Handle errors
        console.error('Error fetching team details:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [customProps,Navigate]);

  return (
    <div className={styles['profile-container']}>
      {team.length > 0 ? (
        <div className={styles['team-details']}>
          <h1>Team Profile: {team[0].name}</h1>
          {team.map((user) => (
            <div key={user._id} className={styles['user-item']}>
              <img src={user.avatar} alt="avatar" className={styles['user-avatar']} />
              <div className={styles['user-details']}>
                <h3>
                  User ID: {user.id}, {user.first_name} {user.last_name}
                </h3>
                <p>Gender: {user.gender}</p>
                <p>Domain: {user.domain}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles['loading-message']}>Loading team details...</p>
      )}
    </div>
  );
}

export default Profile;
