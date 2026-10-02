import { Link } from "react-router-dom";
import { FaRocket, FaUsers, FaCode, FaLightbulb } from "react-icons/fa";
import heroImg from "../../assets/hero.png";

import "../user/Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">

      <div className="container">

        <div className="row hero-row">

          {/* ================= LEFT CONTENT ================= */}
          <div className="col-lg-6 hero-content">

            {/* Badge */}
            <span className="hero-badge">
              <FaRocket />
              India's Startup Collaboration Platform
            </span>

            {/* Heading */}
            <h1 className="hero-title">

              Build Your{" "}

              <span className="hero-gradient-text">
                Dream Startup
              </span>

              <br />

              <span className="hero-dark-text">
                with the Right Team.
              </span>

            </h1>

            {/* Description */}
            <p className="hero-text">
              Connect founders, developers, designers and innovators
              on one powerful platform. Turn your idea into a
              successful startup with the right people.
            </p>


            {/* ================= BUTTONS ================= */}
            <div className="hero-buttons">

              {/* Get Started → Register */}
              <Link
                to="/register"
                className="hero-primary-btn"
              >
                <FaRocket />
                Get Started
              </Link>


              {/* Explore Startups → Marketplace */}
              <Link
                to="/marketplace"
                className="hero-secondary-btn"
              >
                Explore Startups
                <span>→</span>
              </Link>

            </div>


            {/* ================= TRUST LINE ================= */}
            <div className="hero-trust">

              <span className="trust-dot"></span>

              <span>
                Built for founders, developers & startup teams
              </span>

            </div>


            {/* ================= STATS ================= */}
            <div className="hero-stats">

              {/* Startups */}
              <div className="hero-stat">

                <div className="stat-icon">
                  <FaLightbulb />
                </div>

                <div>
                  <h3>500+</h3>
                  <p>Startups</p>
                </div>

              </div>


              {/* Developers */}
              <div className="hero-stat">

                <div className="stat-icon">
                  <FaCode />
                </div>

                <div>
                  <h3>5K+</h3>
                  <p>Developers</p>
                </div>

              </div>


              {/* Founders */}
              <div className="hero-stat">

                <div className="stat-icon">
                  <FaUsers />
                </div>

                <div>
                  <h3>200+</h3>
                  <p>Founders</p>
                </div>

              </div>

            </div>

          </div>


          {/* ================= RIGHT VISUAL ================= */}
          <div className="col-lg-6 hero-visual">

            <div className="hero-image-wrapper">

              {/* Glow */}
              <div className="image-glow"></div>


              {/* Main Image */}
              <div className="hero-image-card">

                <img
                  src={heroImg}
                  className="hero-image"
                  alt="StartupHub Team Collaboration"
                />

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Background decoration */}
      <div className="hero-bg-circle hero-bg-circle-1"></div>
      <div className="hero-bg-circle hero-bg-circle-2"></div>

    </section>
  );
}