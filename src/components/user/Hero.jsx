import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.png"; // Add your illustration here
  
import "../user/Hero.css";
export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center min-vh-100">

          {/* Left Content */}
          <div className="col-lg-6">

            <span className="hero-badge">
              🚀 India's Startup Collaboration Platform
            </span>

            <h1 className="hero-title mt-4">
              Build Your
              <span className="text-primary"> Dream Startup</span>
              <br />
              with the Right Team.
            </h1>

            <p className="hero-text mt-4">
              Connect founders, developers, designers and investors on one
              platform. Turn innovative ideas into successful startups.
            </p>

            <div className="hero-buttons mt-5">
              <Link className="btn btn-primary btn-lg me-3" to="/signup">
                Get Started
              </Link>

              <Link className="btn btn-outline-primary btn-lg" to="/marketplace">
                Explore Startups
              </Link>
            </div>

            <div className="hero-stats mt-5">

              <div>
                <h3>500+</h3>
                <p>Startups</p>
              </div>

              <div>
                <h3>5K+</h3>
                <p>Developers</p>
              </div>

              <div>
                <h3>200+</h3>
                <p>Founders</p>
              </div>

            </div>

          </div>

          {/* Right Image */}
          <div className="col-lg-6 text-center">

            <img
              src={heroImg}
              className="img-fluid hero-image"
              alt="Startup Team"
            />

          </div>

        </div>
      </div>
    </section>
  );
}