import React from 'react';
import Layout from '../components/Layout/Layout';
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi';

const Contact = () => {
  return (
    <Layout title="Contact Us">
      <div className="row contacts">
        <div className="col-md-6">
          <img
            src="/images/contact.webp"
            alt="Contact us"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-primary p-2 text-white text-center rounded">CONTACT US</h1>
          <p className="text-justify mt-3">
            Any queries or information about our products? Feel free to reach out anytime – we are available 24x7.
          </p>
          <p className="mt-3">
            <BiMailSend /> : <a href="mailto:sample@email.com">Sample@email.com</a>
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-34567890
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-9090 (toll-free)
          </p>
          <h2 className="mt-5">Send us a Message</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" className="form-control" id="name" placeholder="Fullname" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input type="email" className="form-control" id="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea className="form-control" id="message" rows="4" placeholder="Write your message here"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
