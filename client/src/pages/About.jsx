import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
  return (
    <Layout title="About Us">
      <div className="row about p-4">
        <div className="col-md-6">
        <img src="/images/about.png" alt="about" style={{ width:"100%"}} srcset="" />
        </div>
        <div className="col-md-6 mt-2">
          <h2 className="text-primary mb-3">Welcome to JALAS|Fusion!</h2>
          <p className="text-justify">
            At JALAS|Fusion, we are more than just an e-commerce platform. We are a dedicated team passionate about providing you with an exceptional online shopping experience. Our journey began with the vision to create a one-stop destination for all your needs, and we have been growing ever since.
          </p>

          <h2 className="text-primary mt-4 mb-3">Our Commitment</h2>
          <p className="text-justify">
            Our commitment is to deliver high-quality products, a seamless shopping experience, and unparalleled customer service. We understand the evolving needs of our customers and strive to stay ahead in the dynamic world of e-commerce.
          </p>

          <h2 className="text-primary mt-4 mb-3">What Sets Us Apart</h2>
          <ul>
            <li>Wide Range of Products</li>
            <li>Secure and Convenient Shopping</li>
            <li>Fast and Reliable Delivery</li>
            <li>Responsive Customer Support</li>
            <li>Continuous Innovation</li>
          </ul>

          <h2 className="text-primary mt-4 mb-3">Our Vision</h2>
          <p className="text-justify">
            Our vision is to redefine the e-commerce landscape by offering not just products, but a lifestyle. We aspire to be your go-to destination for quality, variety, and unbeatable deals.
          </p>

          <h2 className="text-primary mt-4 mb-3">Join Us in this Journey</h2>
          <p className="text-justify">
            We invite you to join us on this exciting journey of discovery, convenience, and savings. Explore our online store and experience e-commerce like never before!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
