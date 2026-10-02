import { Link } from "react-router-dom";
import {
  FaRocket,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#071D49",
        color: "#FFFFFF",
        marginTop: "0",
      }}
    >
      {/* =========================
          MAIN FOOTER
      ========================== */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 20px 45px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1.4fr 1fr 1fr",
            gap: "60px",
          }}
        >
          {/* =========================
              BRAND
          ========================== */}

          <div>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                color: "#FFFFFF",
                textDecoration: "none",
                marginBottom: "18px",
              }}
            >
              <FaRocket
                style={{
                  color: "#1EC8F3",
                  fontSize: "34px",
                }}
              />

              <span
                style={{
                  fontSize: "30px",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                }}
              >
                StartupHub
              </span>
            </Link>

            <p
              style={{
                color: "#B8C8DC",
                fontSize: "15px",
                lineHeight: "1.8",
                maxWidth: "390px",
                margin: "0 0 20px",
              }}
            >
              India's startup collaboration platform
              connecting founders, developers,
              designers and innovators to build
              successful startups together.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#1EC8F3",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              <FaRocket />
              Connect • Create • Collaborate
            </div>
          </div>

          {/* =========================
              QUICK LINKS
          ========================== */}

          <div>
            <h3
              style={{
                color: "#FFFFFF",
                fontSize: "19px",
                fontWeight: 700,
                margin: "0 0 22px",
              }}
            >
              Quick Links
            </h3>

            <FooterLink
              to="/"
              text="Home"
            />

            <FooterLink
              to="/about"
              text="About Us"
            />

            <FooterLink
              to="/contact"
              text="Contact Us"
            />

            <FooterLink
              to="/marketplace"
              text="Marketplace"
            />
          </div>

          {/* =========================
              CONTACT
          ========================== */}

          <div>
            <h3
              style={{
                color: "#FFFFFF",
                fontSize: "19px",
                fontWeight: 700,
                margin: "0 0 22px",
              }}
            >
              Get In Touch
            </h3>

            <ContactItem
              icon={<FaMapMarkerAlt />}
              text="India"
            />

            <ContactItem
              icon={<FaEnvelope />}
              text="hello@startuphub.com"
            />

            <ContactItem
              icon={<FaPhone />}
              text="+91 00000 00000"
            />
          </div>
        </div>
      </div>

      {/* =========================
          BOTTOM BAR
      ========================== */}

      <div
        style={{
          borderTop:
            "1px solid rgba(255,255,255,0.10)",
          background: "#061633",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#9FB1C8",
              fontSize: "13px",
            }}
          >
            © 2026{" "}
            <span
              style={{
                color: "#FFFFFF",
                fontWeight: 700,
              }}
            >
              StartupHub
            </span>
            . All Rights Reserved.
          </p>

          <p
            style={{
              margin: 0,
              color: "#9FB1C8",
              fontSize: "13px",
            }}
          >
            Built for founders, developers &
            startup teams
          </p>
        </div>
      </div>

      {/* =========================
          RESPONSIVE
      ========================== */}

      <style>
        {`
          @media (max-width: 768px) {
            footer > div:first-child {
              padding: 45px 20px 35px !important;
            }

            footer > div:first-child > div {
              grid-template-columns: 1fr !important;
              gap: 35px !important;
            }

            footer h3 {
              margin-bottom: 15px !important;
            }

            footer > div:last-child > div {
              justify-content: center !important;
              text-align: center;
            }
          }

          @media (max-width: 480px) {
            footer > div:first-child {
              padding: 40px 18px 30px !important;
            }

            footer span {
              font-size: inherit;
            }
          }
        `}
      </style>
    </footer>
  );
}


/* =====================================
   FOOTER LINK
===================================== */

function FooterLink({ to, text }) {
  return (
    <Link
      to={to}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "9px",
        color: "#B8C8DC",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: 500,
        marginBottom: "14px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color =
          "#1EC8F3";
        e.currentTarget.style.transform =
          "translateX(4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color =
          "#B8C8DC";
        e.currentTarget.style.transform =
          "translateX(0)";
      }}
    >
      <FaArrowRight
        style={{
          color: "#1EC8F3",
          fontSize: "11px",
        }}
      />

      {text}
    </Link>
  );
}


/* =====================================
   CONTACT ITEM
===================================== */

function ContactItem({ icon, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "16px",
        color: "#B8C8DC",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          minWidth: "34px",
          borderRadius: "9px",
          background: "rgba(30,200,243,0.12)",
          color: "#1EC8F3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
        }}
      >
        {icon}
      </div>

      <span>{text}</span>
    </div>
  );
}