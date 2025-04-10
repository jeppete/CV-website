// src/sections/ContactSection.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import '../styles/sections.css';
  
  function ContactSection() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you would typically send the form data to your backend or a service like Formspree
      console.log('Form submitted:', formData);
      alert('Message sent! (This is just a demo)');
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    };
  
    return (
      <section id="contact" className="section section-light">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-container"
        >
          <h2 className="section-title">Get In Touch</h2>
          
          <div className="contact-grid">
            <div>
              <p className="contact-text">
                Interested in working together? Feel free to reach out using the contact form 
                or connect with me on social media.
              </p>
              
              <div className="contact-info">
                <div className="contact-info-item">
                  <div className="contact-icon-container">
                    <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="contact-info-label">Email</h3>
                    <p className="contact-info-value">your.email@example.com</p>
                  </div>
                </div>
                
                <div className="contact-info-item">
                  <div className="contact-icon-container">
                    <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="contact-info-label">Location</h3>
                    <p className="contact-info-value">Your City, Country</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="form-control"
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="form-button"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </section>
    );
  }

  export default ContactSection;