'use client';

import Navbar from '../../components/Navbar';

export default function About() {
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
                  About <span className="text-primary">StyleStore</span>
                </h1>
                <p className="lead opacity-75">
                  Your premier destination for curated fashion and style
                </p>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="glass p-5 rounded-4">
                <h2 className="h3 fw-bold mb-4">Our Story</h2>
                <p className="lead mb-4">
                  Founded with a passion for style and quality, StyleStore has been curating 
                  exceptional clothing and accessories for fashion-forward individuals since 2020.
                </p>
                <p className="mb-4">
                  We believe that fashion is more than just clothing—it's a form of self-expression, 
                  confidence, and personal storytelling. Our carefully selected collection features 
                  pieces that blend timeless elegance with contemporary trends, ensuring you always 
                  look and feel your best.
                </p>
                <p className="mb-0">
                  From casual everyday wear to sophisticated formal attire, we offer a diverse 
                  range of styles to suit every occasion and personality. Our commitment to quality, 
                  sustainability, and customer satisfaction drives everything we do.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="row mb-5">
            <div className="col-12">
              <h2 className="h3 fw-bold text-center mb-5">Our Values</h2>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="glass p-4 rounded-4 h-100 text-center hover-lift">
                <div className="mb-3">
                  <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16" className="text-primary">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                  </svg>
                </div>
                <h4 className="h5 fw-bold mb-3">Quality First</h4>
                <p className="text-muted">
                  We carefully select each piece in our collection, ensuring superior quality 
                  and craftsmanship that stands the test of time.
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="glass p-4 rounded-4 h-100 text-center hover-lift">
                <div className="mb-3">
                  <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16" className="text-primary">
                    <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                    <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
                  </svg>
                </div>
                <h4 className="h5 fw-bold mb-3">Sustainability</h4>
                <p className="text-muted">
                  We're committed to sustainable fashion practices, working with brands that 
                  prioritize environmental responsibility and ethical production.
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="glass p-4 rounded-4 h-100 text-center hover-lift">
                <div className="mb-3">
                  <svg width="48" height="48" fill="currentColor" viewBox="0 0 16 16" className="text-primary">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                </div>
                <h4 className="h5 fw-bold mb-3">Customer Focus</h4>
                <p className="text-muted">
                  Your satisfaction is our priority. We provide exceptional service and support 
                  to help you find the perfect style for every occasion.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="row mb-5">
            <div className="col-12">
              <h2 className="h3 fw-bold text-center mb-5">Meet Our Team</h2>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="glass p-4 rounded-4 hover-lift">
                <div className="row align-items-center">
                  <div className="col-4">
                    <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                      <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16" className="text-primary">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="col-8">
                    <h5 className="fw-bold mb-1">Sarah Johnson</h5>
                    <p className="text-primary mb-1">Founder & CEO</p>
                    <p className="text-muted small mb-0">
                      Fashion enthusiast with 10+ years in retail and a passion for sustainable style.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="glass p-4 rounded-4 hover-lift">
                <div className="row align-items-center">
                  <div className="col-4">
                    <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                      <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16" className="text-primary">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="col-8">
                    <h5 className="fw-bold mb-1">Michael Chen</h5>
                    <p className="text-primary mb-1">Creative Director</p>
                    <p className="text-muted small mb-0">
                      Expert in trend forecasting and brand partnerships with an eye for emerging designers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
