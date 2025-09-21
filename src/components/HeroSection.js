'use client';

const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h1 className="display-4 fw-bold mb-4">
              Discover Your <span className="text-primary">Perfect Style</span>
            </h1>
            <p className="lead mb-4 opacity-75">
              Explore our curated collection of premium clothing and accessories. 
              From casual wear to formal attire, find pieces that reflect your unique personality.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <a 
                href="#products" 
                className="btn btn-primary btn-lg px-4 py-3 rounded-pill fw-medium"
              >
                Shop Now
              </a>
              <a 
                href="#about" 
                className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill fw-medium"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
