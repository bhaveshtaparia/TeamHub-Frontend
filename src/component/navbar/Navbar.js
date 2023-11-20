import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>TeamHub</div>
      <div style={styles.menu}>
        <Link to='/' style={styles.menuItem}>Home</Link>
        <Link to='/' style={styles.menuItem}>Users</Link>
        <Link to="/" style={styles.menuItem}>Teams</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #dee2e6',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
  },
  menuItem: {
    marginLeft: '20px',
    textDecoration: 'none',
    color: '#495057',
  },
};

export default Navbar;
