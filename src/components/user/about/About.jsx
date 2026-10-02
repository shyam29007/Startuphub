import { Link } from "react-router-dom";

import {
  FaRocket,
  FaCheck,
  FaUsers,
  FaCode,
  FaHandshake,
  FaLightbulb,
} from "react-icons/fa";

export default function About() {
  return (
    <>
      <section className="about-page">

        <div className="about-container">

          {/* =========================
              ABOUT HEADER
          ========================== */}

          <div className="about-header">

            {/* Badge */}
            <div className="about-badge">
              <FaRocket />
              <span>About Us</span>
            </div>

            {/* Main Heading */}
            <h1 className="about-title">
              Building the Future{" "}
              <span className="about-gradient">
                Together
              </span>
            </h1>

            {/* Description */}
            <p className="about-subtitle">
              Connecting founders, developers, designers and investors
              to build successful startups together.
            </p>

          </div>


          {/* =========================
              MAIN ABOUT CONTENT
          ========================== */}

          <div className="about-content">

            {/* Welcome Heading */}
            <h2 className="about-welcome">
              Welcome to{" "}
              <span>StartupHub</span>
            </h2>

            {/* Description */}
            <p className="about-description">
              StartupHub connects founders, developers, designers and
              investors in one collaborative platform. Whether you're
              launching your first startup or looking to join an exciting
              venture, we help you build the right team.
            </p>


            {/* =========================
                FEATURES
            ========================== */}

            <div className="about-features">

              <Feature
                icon={<FaUsers />}
                text="Find Co-founders"
              />

              <Feature
                icon={<FaCode />}
                text="Hire Skilled Developers"
              />

              <Feature
                icon={<FaHandshake />}
                text="Connect with Investors"
              />

              <Feature
                icon={<FaLightbulb />}
                text="Grow Your Startup Faster"
              />

            </div>


            {/* =========================
                CONTACT BUTTON
            ========================== */}

            <Link
              to="/contact"
              className="about-contact-btn"
            >
              Contact Us
              <span>→</span>
            </Link>

          </div>

        </div>


        {/* =========================
            RESPONSIVE CSS
        ========================== */}

        <style>{`

          /* =====================================
             ABOUT PAGE
          ===================================== */

          .about-page {
            width: 100%;
            min-height: calc(100vh - 90px);

            background: #F8FBFF;

            padding: 55px 20px 80px;

            color: #071D49;

            box-sizing: border-box;
          }


          /* =====================================
             CONTAINER
          ===================================== */

          .about-container {
            width: 100%;
            max-width: 1200px;

            margin: 0 auto;
          }


          /* =====================================
             HEADER
          ===================================== */

          .about-header {
            width: 100%;
            max-width: 1000px;

            margin: 0 auto 60px;

            text-align: center;
          }


          /* =====================================
             BADGE
          ===================================== */

          .about-badge {
            display: inline-flex;

            align-items: center;
            justify-content: center;

            gap: 9px;

            padding: 10px 20px;

            border-radius: 50px;

            background: #EAF8FD;

            border: 1px solid #9EE8FA;

            color: #0B9ED8;

            font-size: 15px;
            font-weight: 700;

            margin-bottom: 25px;

            box-shadow:
              0 8px 25px rgba(30, 200, 243, 0.08);
          }

          .about-badge svg {
            font-size: 15px;
          }


          /* =====================================
             MAIN TITLE
          ===================================== */

          .about-title {
            margin: 0 0 20px;

            color: #071D49;

            font-size: clamp(40px, 5vw, 60px);

            font-weight: 800;

            line-height: 1.15;

            letter-spacing: -1.5px;
          }


          /* Gradient word */

          .about-gradient {
            background:
              linear-gradient(
                90deg,
                #1EC8F3,
                #4169FF
              );

            -webkit-background-clip: text;
            background-clip: text;

            -webkit-text-fill-color: transparent;
          }


          /* =====================================
             HEADER DESCRIPTION
          ===================================== */

          .about-subtitle {
            max-width: 900px;

            margin: 0 auto;

            color: #526B89;

            font-size: 18px;

            line-height: 1.7;
          }


          /* =====================================
             MAIN CONTENT
          ===================================== */

          .about-content {
            width: 100%;

            max-width: 700px;

            margin-left: 70px;
          }


          /* =====================================
             WELCOME
          ===================================== */

          .about-welcome {
            margin: 0 0 20px;

            color: #071D49;

            font-size: 36px;

            font-weight: 800;

            line-height: 1.2;
          }

          .about-welcome span {
            color: #0B9ED8;
          }


          /* =====================================
             DESCRIPTION
          ===================================== */

          .about-description {
            margin: 0 0 32px;

            color: #526B89;

            font-size: 17px;

            line-height: 1.9;
          }


          /* =====================================
             FEATURES
          ===================================== */

          .about-features {
            display: flex;

            flex-direction: column;

            gap: 16px;

            margin-bottom: 38px;
          }


          /* =====================================
             CONTACT BUTTON
          ===================================== */

          .about-contact-btn {
            display: inline-flex;

            align-items: center;
            justify-content: center;

            gap: 10px;

            min-width: 212px;

            padding: 15px 30px;

            border-radius: 50px;

            background: #1EC8F3;

            color: #FFFFFF;

            text-decoration: none;

            font-size: 17px;

            font-weight: 700;

            box-shadow:
              0 12px 28px rgba(30, 200, 243, 0.20);

            transition:
              transform 0.25s ease,
              background 0.25s ease,
              box-shadow 0.25s ease;
          }

          .about-contact-btn span {
            font-size: 20px;
            line-height: 1;
          }

          .about-contact-btn:hover {
            background: #06A3DA;

            color: #FFFFFF;

            transform: translateY(-2px);

            box-shadow:
              0 16px 32px rgba(30, 200, 243, 0.28);
          }


          /* =====================================
             TABLET
          ===================================== */

          @media (max-width: 991px) {

            .about-page {
              padding: 45px 25px 70px;
            }

            .about-container {
              max-width: 850px;
            }

            .about-header {
              margin-bottom: 50px;
            }

            .about-content {
              max-width: 750px;

              margin-left: 0;
              margin-right: auto;
            }

            .about-title {
              font-size: clamp(38px, 6vw, 52px);
            }

            .about-subtitle {
              font-size: 17px;
            }

          }


          /* =====================================
             MOBILE
          ===================================== */

          @media (max-width: 576px) {

            .about-page {
              padding: 35px 16px 60px;
            }

            .about-container {
              width: 100%;
            }

            .about-header {
              margin-bottom: 40px;
            }

            /* Badge */

            .about-badge {
              padding: 9px 17px;

              margin-bottom: 20px;

              font-size: 14px;
            }

            /* Title */

            .about-title {
              margin-bottom: 16px;

              font-size: 36px;

              line-height: 1.18;

              letter-spacing: -0.8px;
            }

            /* Subtitle */

            .about-subtitle {
              padding: 0 5px;

              font-size: 15px;

              line-height: 1.7;
            }

            /* Content */

            .about-content {
              width: 100%;

              max-width: 100%;

              margin: 0;
            }

            /* Welcome */

            .about-welcome {
              font-size: 30px;

              line-height: 1.2;

              margin-bottom: 16px;
            }

            /* Description */

            .about-description {
              font-size: 15px;

              line-height: 1.8;

              margin-bottom: 25px;
            }

            /* Features */

            .about-features {
              gap: 12px;

              margin-bottom: 30px;
            }

            /* Contact */

            .about-contact-btn {
              width: 100%;

              min-width: 0;

              padding: 14px 20px;

              font-size: 16px;
            }

          }


          /* =====================================
             VERY SMALL PHONES
          ===================================== */

          @media (max-width: 380px) {

            .about-page {
              padding-left: 12px;
              padding-right: 12px;
            }

            .about-title {
              font-size: 32px;
            }

            .about-welcome {
              font-size: 27px;
            }

            .about-subtitle {
              font-size: 14px;
            }

            .about-description {
              font-size: 14px;
            }

          }

        `}</style>

      </section>
    </>
  );
}


/* =====================================
   FEATURE COMPONENT
===================================== */

function Feature({ icon, text }) {

  return (
    <div
      className="about-feature"
      style={{
        display: "flex",
        alignItems: "center",

        minHeight: "80px",

        padding: "14px 18px",

        background: "#FFFFFF",

        border: "1px solid #DEEBF2",

        borderRadius: "16px",

        boxShadow:
          "0 7px 22px rgba(7,29,73,0.045)",

        boxSizing: "border-box",
      }}
    >

      {/* Icon */}

      <div
        style={{
          width: "48px",
          height: "48px",
          minWidth: "48px",

          display: "flex",

          alignItems: "center",
          justifyContent: "center",

          borderRadius: "13px",

          background: "#E5F7FC",

          color: "#0B9ED8",

          fontSize: "18px",

          marginRight: "17px",
        }}
      >
        {icon}
      </div>


      {/* Text */}

      <span
        style={{
          color: "#071D49",

          fontSize: "16px",

          fontWeight: "700",
        }}
      >
        {text}
      </span>


      {/* Check */}

      <FaCheck
        style={{
          marginLeft: "auto",

          color: "#1EC8F3",

          fontSize: "15px",
        }}
      />

    </div>
  );
}