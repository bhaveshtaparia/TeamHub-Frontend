  // Import React, useState, and useEffect from 'react'
  import React, { useState, useEffect } from 'react';

  // Import the CSS file for styling
  import './home.css';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

  // Define the HomePage component
  const HomePage = () => {
    const Navigate=useNavigate();
    // State variables for users, search term, and selected filters
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPages,setTotalPages]=useState(0);
    const [selectedFilters, setSelectedFilters] = useState({
      domain: '',
      gender: '',
      availability: '',
    });
    
    
    // Pagination variables
    
    const itemsPerPage = 20;
    let lastIndex =  itemsPerPage;
    let firstIndex = 0;
    let currentUsers = users.slice(firstIndex, lastIndex);
    
    
    // useEffect hook to fetch data from the API when search term or filters change
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Make API call based on search term and selected filters
          const response = await fetch(
            `https://teamhub-5qk4.onrender.com/api/v1/get/user?page=${currentPage}&pageSize=${itemsPerPage}&domain=${selectedFilters.domain}&availability=${selectedFilters.availability}&gender=${selectedFilters.gender}&search=${searchTerm}`
            );
            
            // Check if the response is OK
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            
            // Parse JSON response and update state
            const data = await response.json();
            setTotalPages(data.totalPages);
            setUsers(data.users);
          } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error);
          }
        };
        
        // Call the fetchData function
        fetchData();
      }, [searchTerm, selectedFilters,totalPages,currentPage]);
    
    //handle create function
    const handleCreate=()=>{
      Navigate('/create');
    }
    
    // Function to handle page changes
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    const alert=useAlert();
    const handleDelete = async (id) => {
      try {
        const response = await fetch(`https://teamhub-5qk4.onrender.com/api/v1/delete/user/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        setTotalPages(totalPages+1);
        alert.success('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        // Display an error alert if deletion fails
        alert.error('Failed to delete user');
      }
    };
    
    // handle update user
    const handleUpdate=(user)=>{
            Navigate('/update',{ state: { customProps: user } })
          }
          // JSX structure for the component
          return (
            <div className="container">
        <h1>TeamHub</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filters (Replace with your actual filters) */}
        <div className="filtersContainer">
          <select
            value={selectedFilters.domain}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, domain: e.target.value })}
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

          <select
            value={selectedFilters.gender}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Bigender">Bigender</option>
            <option value="Agender">Agender</option>
          </select>

          <select
            value={selectedFilters.availability}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, availability: e.target.value })}
          >
            <option value="">Select Availability</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
          <div className='mid'>

          <button className='btn' onClick={handleCreate}>Create User</button>
          </div>

        {/* Display Users */}
        <div className="userContainer">
          {currentUsers.map((user) => (
            <div key={user.id} className="userCard">
              <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
              <p>Name: {`${user.first_name} ${user.last_name}`}</p>
              <p>Email: {user.email}</p>
              <p>Gender: {user.gender}</p>
              <p>Domain: {user.domain}</p>
              <p>Availability: {user.available ? 'Available' : 'Not Available'}</p>
              <button onClick={()=>handleUpdate(user)}>Update</button>
              <button onClick={()=>handleDelete(user.id)}>Delete</button>
            </div>
            
            ))}
        </div>

        {/* Pagination */}
        <div className="paginationContainer">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Export the HomePage component
  export default HomePage;
  