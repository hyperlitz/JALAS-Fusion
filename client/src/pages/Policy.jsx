import React from 'react';
import Layout from '../components/Layout/Layout';

const Policy = () => {
  return (
    <Layout title="Privacy and Policy">
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          maxWidth: '800px',
          margin: 'auto',
          padding: '20px',
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            color: '#333',
            borderBottom: '2px solid #3498db',
            paddingBottom: '10px',
            marginBottom: '20px',
          }}
        >
          Privacy Policy
        </h2>

        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
          At JALAS|Fusion, we are committed to protecting your privacy. This Privacy Policy outlines how we collect,
          use, disclose, and manage your personal information.
        </p>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>1. Information We Collect</h3>
          <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            We may collect the following types of personal information when you interact with our website:
          </p>
          <ul style={{ listStyleType: 'circle', marginLeft: '20px', fontSize: '16px' }}>
            <li>Contact Information: Name, email address, phone number, and shipping address.</li>
            <li>Payment Information: Credit card details and other payment-related information.</li>
            <li>Account Information: Username, password, and account preferences.</li>
            <li>Device and Usage Information: IP address, browser type, device type, and browsing activity.</li>
          </ul>
        </div>

        {/* Continue with the same structure for other sections */}

        <h2
          style={{
            fontSize: '24px',
            color: '#333',
            borderBottom: '2px solid #3498db',
            paddingBottom: '10px',
            marginBottom: '20px',
          }}
        >
          Return and Refund Policy
        </h2>

        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
          Our Return and Refund Policy outlines the terms and conditions for returning and refunding products purchased
          through our website. Please refer to our dedicated page for more details.
        </p>
      </div>
    </Layout>
  );
};

export default Policy;
