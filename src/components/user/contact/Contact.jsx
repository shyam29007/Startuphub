import {
  FaRocket,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section className="contact-page">

      <div className="contact-container">

        {/* ================================
            CONTACT HEADER
        ================================= */}

        <div className="contact-header">

          <div className="contact-badge">
            <FaRocket />
            <span>Contact Us</span>
          </div>

          <h1>
            Let's Build Something{" "}
            <span>Together</span>
          </h1>

          <p>
            Have an idea, question or want to collaborate?
            Connect with the StartupHub team and let's turn
            your idea into reality.
          </p>

        </div>


        {/* ================================
            CONTACT INFORMATION
        ================================= */}

        <div className="contact-info-grid">

          {/* Phone */}

          <div className="contact-info-card">

            <div className="contact-icon">
              <FaPhoneAlt />
            </div>

            <div>
              <h3>Call Us</h3>

              <p>Have a question?</p>

              <a href="tel:+910000000000">
                +91 00000 00000
              </a>
            </div>

          </div>


          {/* Email */}

          <div className="contact-info-card">

            <div className="contact-icon">
              <FaEnvelope />
            </div>

            <div>
              <h3>Email Us</h3>

              <p>Send us your query</p>

              <a href="mailto:chaudharysundarm532@gmail.com">
                chaudharysundarm532@gmail.com
              </a>
            </div>

          </div>


          {/* Location */}

          <div className="contact-info-card">

            <div className="contact-icon">
              <FaMapMarkerAlt />
            </div>

            <div>
              <h3>Our Location</h3>

              <p>StartupHub</p>

              <span>India</span>
            </div>

          </div>

        </div>


        {/* ================================
            CONTACT FORM
        ================================= */}

        <div className="contact-form-wrapper">

          <div className="contact-form-card">

            <div className="form-heading">

              <h2>
                Send Us a{" "}
                <span>Message</span>
              </h2>

              <p>
                Fill in the details below and we'll get back
                to you as soon as possible.
              </p>

            </div>


            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >

              {/* Name + Email */}

              <div className="form-row">

                <div className="form-group">

                  <label>Your Name</label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>Your Email</label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                  />

                </div>

              </div>


              {/* Subject */}

              <div className="form-group">

                <label>Subject</label>

                <input
                  type="text"
                  placeholder="What is this regarding?"
                  required
                />

              </div>


              {/* Message */}

              <div className="form-group">

                <label>Your Message</label>

                <textarea
                  rows="6"
                  placeholder="Write your message here..."
                  required
                />

              </div>


              {/* Submit */}

              <button
                type="submit"
                className="contact-submit"
              >

                <FaPaperPlane />

                <span>Send Message</span>

              </button>

            </form>

          </div>

        </div>

      </div>


      {/* ================================
          RESPONSIVE CSS
      ================================= */}

      <style>{`

        /* PAGE */

        .contact-page {

          width: 100%;

          min-height: calc(100vh - 90px);

          background: #F8FBFF;

          padding: 55px 20px 80px;

          color: #071D49;

          box-sizing: border-box;

        }


        .contact-container {

          width: 100%;

          max-width: 1200px;

          margin: 0 auto;

        }


        /* HEADER */

        .contact-header {

          text-align: center;

          max-width: 850px;

          margin: 0 auto 55px;

        }


        .contact-badge {

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

          margin-bottom: 22px;

          box-shadow:
            0 8px 25px rgba(30, 200, 243, 0.08);

        }


        .contact-header h1 {

          margin: 0 0 18px;

          color: #071D49;

          font-size: clamp(40px, 5vw, 58px);

          font-weight: 800;

          line-height: 1.15;

          letter-spacing: -1.5px;

        }


        .contact-header h1 span {

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


        .contact-header p {

          max-width: 760px;

          margin: 0 auto;

          color: #526B89;

          font-size: 18px;

          line-height: 1.7;

        }


        /* CONTACT INFO */

        .contact-info-grid {

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 20px;

          margin-bottom: 45px;

        }


        .contact-info-card {

          display: flex;

          align-items: center;

          gap: 18px;

          min-height: 120px;

          padding: 22px;

          background: #FFFFFF;

          border: 1px solid #DEEBF2;

          border-radius: 18px;

          box-shadow:
            0 8px 25px rgba(7, 29, 73, 0.045);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;

          box-sizing: border-box;

        }


        .contact-info-card:hover {

          transform: translateY(-4px);

          box-shadow:
            0 14px 30px rgba(7, 29, 73, 0.08);

        }


        .contact-icon {

          width: 55px;

          height: 55px;

          min-width: 55px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 15px;

          background: #E5F7FC;

          color: #0B9ED8;

          font-size: 20px;

        }


        .contact-info-card h3 {

          margin: 0 0 5px;

          color: #071D49;

          font-size: 18px;

          font-weight: 800;

        }


        .contact-info-card p {

          margin: 0 0 4px;

          color: #71839B;

          font-size: 14px;

        }


        .contact-info-card a,

        .contact-info-card span {

          color: #0B9ED8;

          font-size: 15px;

          font-weight: 700;

          text-decoration: none;

          word-break: break-word;

        }


        .contact-info-card a:hover {

          color: #071D49;

        }


        /* FORM WRAPPER */

        .contact-form-wrapper {

          display: flex;

          justify-content: center;

          width: 100%;

        }


        /* FORM CARD */

        .contact-form-card {

          width: 100%;

          max-width: 850px;

          padding: 35px;

          background: #FFFFFF;

          border: 1px solid #DEEBF2;

          border-radius: 20px;

          box-shadow:
            0 10px 30px rgba(7, 29, 73, 0.05);

          box-sizing: border-box;

        }


        .form-heading {

          text-align: center;

          margin-bottom: 28px;

        }


        .form-heading h2 {

          margin: 0 0 8px;

          color: #071D49;

          font-size: 30px;

          font-weight: 800;

        }


        .form-heading h2 span {

          color: #0B9ED8;

        }


        .form-heading p {

          margin: 0;

          color: #71839B;

          font-size: 15px;

          line-height: 1.6;

        }


        /* FORM ROW */

        .form-row {

          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 18px;

        }


        .form-group {

          margin-bottom: 18px;

        }


        .form-group label {

          display: block;

          margin-bottom: 7px;

          color: #071D49;

          font-size: 14px;

          font-weight: 700;

        }


        .form-group input,

        .form-group textarea {

          width: 100%;

          padding: 14px 16px;

          background: #F8FBFF;

          border: 1px solid #DDEAF2;

          border-radius: 12px;

          color: #071D49;

          font-size: 15px;

          font-family: inherit;

          outline: none;

          box-sizing: border-box;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;

        }


        .form-group input {

          height: 52px;

        }


        .form-group textarea {

          resize: vertical;

          min-height: 150px;

        }


        .form-group input::placeholder,

        .form-group textarea::placeholder {

          color: #9AAABD;

        }


        .form-group input:focus,

        .form-group textarea:focus {

          border-color: #1EC8F3;

          box-shadow:
            0 0 0 3px rgba(30, 200, 243, 0.10);

          background: #FFFFFF;

        }


        /* SUBMIT BUTTON */

        .contact-submit {

          width: 100%;

          min-height: 54px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          border: none;

          border-radius: 50px;

          background: #1EC8F3;

          color: #FFFFFF;

          font-size: 16px;

          font-weight: 700;

          cursor: pointer;

          box-shadow:
            0 12px 28px rgba(30, 200, 243, 0.20);

          transition:
            transform 0.25s ease,
            background 0.25s ease;

        }


        .contact-submit:hover {

          background: #06A3DA;

          transform: translateY(-2px);

        }


        /* TABLET */

        @media (max-width: 991px) {

          .contact-page {

            padding: 45px 25px 70px;

          }


          .contact-info-grid {

            grid-template-columns: 1fr;

          }


          .contact-info-card {

            min-height: 100px;

          }


          .contact-form-card {

            max-width: 800px;

          }

        }


        /* MOBILE */

        @media (max-width: 576px) {

          .contact-page {

            padding: 35px 16px 60px;

          }


          .contact-header {

            margin-bottom: 35px;

          }


          .contact-badge {

            padding: 9px 17px;

            font-size: 14px;

          }


          .contact-header h1 {

            font-size: 36px;

            letter-spacing: -0.8px;

          }


          .contact-header p {

            font-size: 15px;

          }


          .contact-info-grid {

            gap: 12px;

            margin-bottom: 30px;

          }


          .contact-info-card {

            min-height: 95px;

            padding: 17px;

            gap: 14px;

            border-radius: 16px;

          }


          .contact-icon {

            width: 48px;

            height: 48px;

            min-width: 48px;

            font-size: 17px;

          }


          .contact-info-card h3 {

            font-size: 16px;

          }


          .contact-info-card a,

          .contact-info-card span {

            font-size: 13px;

          }


          .contact-form-card {

            padding: 22px 18px;

            border-radius: 17px;

          }


          .form-heading h2 {

            font-size: 26px;

          }


          .form-row {

            grid-template-columns: 1fr;

            gap: 0;

          }


          .form-group input {

            height: 50px;

          }

        }


        /* SMALL MOBILE */

        @media (max-width: 380px) {

          .contact-page {

            padding-left: 12px;

            padding-right: 12px;

          }


          .contact-header h1 {

            font-size: 32px;

          }


          .contact-form-card {

            padding: 18px 15px;

          }

        }

      `}</style>

    </section>
  );
}