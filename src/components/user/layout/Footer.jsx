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
          padding: "35px 20px 30px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr",
            gap: "45px",
            alignItems: "start",
          }}
        >
          {/* =========================
              STARTUPHUB
          ========================== */}

          <div>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                color: "#FFFFFF",
                textDecoration: "none",
                marginBottom: "12px",
              }}
            >
              <FaRocket
                style={{
                  color: "#1EC8F3",
                  fontSize: "28px",
                }}
              />

              <span
                style={{
                  fontSize: "26px",
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
                fontSize: "14px",
                lineHeight: "1.65",
                maxWidth: "390px",
                margin: 0,
              }}
            >
              India's startup collaboration platform connecting
              founders, developers and innovators to build
              successful startups together.
            </p>
          </div>

          {/* =========================
              QUICK LINKS
          ========================== */}

          <div>
            <h3
              style={{
                color: "#FFFFFF",
                fontSize: "18px",
                fontWeight: 700,
                margin: "0 0 16px",
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
              to="/marketplace"
              text="Marketplace"
            />

            <FooterLink
              to="/contact"
              text="Contact Us"
            />
          </div>

          {/* =========================
              CONTACT
          ========================== */}

          <div>
            <h3
              style={{
                color: "#FFFFFF",
                fontSize: "18px",
                fontWeight: 700,
                margin: "0 0 16px",
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
              text="chaudharysundarm532@gmail.com"
            />

            <ContactItem
              icon={<FaPhone />}
              text="+91 00000 00000"
            />
          </div>
        </div>
      </div>

      {/* =========================
          COPYRIGHT
      ========================== */}

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.10)",
          background: "#061633",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "13px 20px",
            textAlign: "center",
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
            </span>{" "}
            . All Rights Reserved.
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
              padding: 30px 20px 25px !important;
            }

            footer > div:first-child > div {
              grid-template-columns: 1fr !important;
              gap: 25px !important;
            }

            footer h3 {
              margin-bottom: 13px !important;
            }

          }

          @media (max-width: 480px) {

            footer > div:first-child {
              padding: 28px 18px 22px !important;
            }

            footer > div:first-child > div {
              gap: 22px !important;
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
        gap: "8px",
        color: "#B8C8DC",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: 500,
        marginBottom: "10px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#1EC8F3";
        e.currentTarget.style.transform = "translateX(4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#B8C8DC";
        e.currentTarget.style.transform = "translateX(0)";
      }}
    >
      <FaArrowRight
        style={{
          color: "#1EC8F3",
          fontSize: "10px",
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
        gap: "10px",
        marginBottom: "11px",
        color: "#B8C8DC",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          minWidth: "32px",
          borderRadius: "8px",
          background: "rgba(30,200,243,0.12)",
          color: "#1EC8F3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
        }}
      >
        {icon}
      </div>

      <span
        style={{
          wordBreak: "break-word",
        }}
      >
        {text}
      </span>
    </div>
  );
}