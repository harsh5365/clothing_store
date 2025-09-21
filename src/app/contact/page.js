'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100">
      <Navbar />
      
      <main className="pt-5">
        <div className="container py-5">
          {/* Hero Section */}
          <div className="row mb-5">
            <div className="col-12 text-center">
              <div className="hero-section">
                <h1 className="display-4 fw-bold mb-4">
                  Get In <span className="text-primary">Touch</span>
                </h1>
                <p className="lead opacity-75">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Contact Form */}
            <div className="col-lg-8 mb-5">
              <div className="glass p-5 rounded-4">
                <h2 className="h3 fw-bold mb-4">Send us a Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> Your message has been sent successfully. We'll get back to you soon!
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> There was a problem sending your message. Please try again.
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label fw-medium">Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label fw-medium">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label fw-medium">Subject *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-medium">Message *</label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="col-lg-4">
              <div className="glass p-4 rounded-4 mb-4">
                <h3 className="h5 fw-bold mb-4">Contact Information</h3>
                
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="text-primary">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">Address</h6>
                      <p className="text-muted mb-0 small">
                        123 Fashion Street<br />
                        Style District, NY 10001
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="text-primary">
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.14L9.5 12.5a.678.678 0 0 1-.5-.2L6.7 9.5a.678.678 0 0 0-.2-.5l.14-.58a.678.678 0 0 0-.14-.58L4.654 1.328z"/>
                      </svg>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">Phone</h6>
                      <p className="text-muted mb-0 small">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="text-primary">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
                      </svg>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">Email</h6>
                      <p className="text-muted mb-0 small">hello@stylestore.com</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="text-primary">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">Business Hours</h6>
                      <p className="text-muted mb-0 small">
                        Mon - Fri: 9:00 AM - 6:00 PM<br />
                        Sat: 10:00 AM - 4:00 PM<br />
                        Sun: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="glass p-4 rounded-4">
                <h3 className="h5 fw-bold mb-4">Follow Us</h3>
                <div className="d-flex gap-3">
                  <a href="#" className="text-decoration-none">
                    <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24" className="text-primary">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-decoration-none">
                    <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24" className="text-primary">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-decoration-none">
                    <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24" className="text-primary">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
