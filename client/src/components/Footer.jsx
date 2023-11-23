import React from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: '#3498db',
        color: '#fff',
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <h4 style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', marginBottom: '10px' }}>
        &copy; 2023 JALAS - Fusion. All Rights Reserved
      </h4>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link
          to='/about'
          style={{ textDecoration: 'none', color: '#fff', fontSize: '14px', margin: '0 15px', display: 'flex', alignItems: 'center' }}
        >
          <FaInfoCircle style={{ marginRight: '5px' }} /> About
        </Link>
        <Link
          to='/contact'
          style={{ textDecoration: 'none', color: '#fff', fontSize: '14px', margin: '0 15px', display: 'flex', alignItems: 'center' }}
        >
          <FaEnvelope style={{ marginRight: '5px' }} /> Contact
        </Link>
        <Link
          to='/policy'
          style={{ textDecoration: 'none', color: '#fff', fontSize: '14px', margin: '0 15px', display: 'flex', alignItems: 'center' }}
        >
          <FaShieldAlt style={{ marginRight: '5px' }} /> Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
