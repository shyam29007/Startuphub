import {Link} from "react-router-dom";
import Breadcrumb from "../../shared/Breadcrumb";

export default function About() {
  return (
    <>
      <div className="container-fluid py-5 wow fadeInUp">
        <div className="container py-5">

          <div
            className="section-title text-center position-relative pb-3 mb-5 mx-auto"
            style={{ maxWidth: "700px" }}
          >
            <h5 className="fw-bold text-primary text-uppercase">
              About Us
            </h5>

            <h1 className="mb-0">
              Building the Future Together,
              <br />
              One Startup at a Time
            </h1>
          </div>

          <div className="row g-5 align-items-center">

            

            <div className="col-lg-6">

              <h4 className="text-primary mb-3">
                Welcome to StartupHub
              </h4>

              <p className="mb-4">
                StartupHub connects founders, developers, designers and
                investors in one collaborative platform. Whether you're
                launching your first startup or looking to join an exciting
                venture, we help you build the right team.
              </p>

              <div className="mb-3">
                <i className="fa fa-check text-primary me-2"></i>
                Find Co-founders
              </div>

              <div className="mb-3">
                <i className="fa fa-check text-primary me-2"></i>
                Hire Skilled Developers
              </div>

              <div className="mb-3">
                <i className="fa fa-check text-primary me-2"></i>
                Connect with Investors
              </div>

              <div className="mb-4">
                <i className="fa fa-check text-primary me-2"></i>
                Grow Your Startup Faster
              </div>

              <Link to="/contact" className="btn btn-primary py-3 px-5">
                Contact Us
              </Link>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}