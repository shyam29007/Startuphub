import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaRocket,
  FaSearch,
  FaBuilding,
  FaCode,
  FaBriefcase,
  FaRupeeSign,
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import ProjectService from "../../../services/ProjectService";
import BusinessService from "../../../services/BusinessService";
import AuthService from "../../../services/AuthService";

export default function Marketplace() {
  const navigate = useNavigate();
  const user = AuthService.getUser();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // =========================
  // LOAD PROJECTS
  // =========================

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const projectData =
        await ProjectService.getAllProjects();

      const projectsWithBusiness =
        await Promise.all(
          projectData.map(async (project) => {
            let business = null;

            if (project.businessId) {
              try {
                business =
                  await BusinessService.getBusiness(
                    project.businessId
                  );
              } catch (error) {
                console.log(
                  "Business not found:",
                  project.businessId
                );
              }
            }

            return {
              ...project,
              businessName:
                business?.businessName ||
                "Startup Company",
              businessLogo:
                business?.logo || "",
            };
          })
        );

      setProjects(projectsWithBusiness);
    } catch (error) {
      console.error(
        "Marketplace Error:",
        error
      );

      toast.error(
        error.message ||
          "Unable to load marketplace."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // APPLY
  // =========================

  function handleApply(projectId) {
    if (!user?.uid) {
      toast.info(
        "Please login as a developer to apply."
      );

      navigate("/login");
      return;
    }

    if (user.role !== "developer") {
      toast.warning(
        "Only developers can apply for projects."
      );

      return;
    }

    navigate(
      `/developer/project/${projectId}`
    );
  }

  // =========================
  // SEARCH
  // =========================

  const filteredProjects =
    projects.filter((project) => {
      const query =
        search.toLowerCase().trim();

      if (!query) return true;

      const skills = Array.isArray(
        project.skills
      )
        ? project.skills.join(" ")
        : project.skills || "";

      return (
        project.title
          ?.toLowerCase()
          .includes(query) ||
        project.category
          ?.toLowerCase()
          .includes(query) ||
        project.businessName
          ?.toLowerCase()
          .includes(query) ||
        skills
          .toLowerCase()
          .includes(query)
      );
    });

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="marketplace-page">
        <div className="marketplace-loading">
          <div className="marketplace-spinner"></div>

          <h4>
            Loading Marketplace...
          </h4>

          <p>
            Finding startup opportunities
            for you.
          </p>
        </div>

        <MarketplaceStyles />
      </section>
    );
  }

  return (
    <section className="marketplace-page">

      <div className="marketplace-container">

        {/* =========================
            MARKETPLACE HEADER
        ========================= */}

        <div className="marketplace-heading">

          <div className="marketplace-badge">
            <FaRocket />
            <span>
              Startup Marketplace
            </span>
          </div>

          <h1>
            Discover Startup{" "}
            <span>Projects</span>
          </h1>

          <p>
            Explore exciting startup projects,
            connect with founders and find
            opportunities where your skills
            can make an impact.
          </p>

        </div>


        {/* =========================
            SEARCH
        ========================= */}

        <div className="marketplace-search">

          <FaSearch />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search projects, skills, categories..."
          />

        </div>


        {/* =========================
            RESULT HEADER
        ========================= */}

        <div className="marketplace-result-header">

          <div>
            <h2>
              Available Opportunities
            </h2>

            <p>
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "project"
                : "projects"}{" "}
              available
            </p>
          </div>

          <div className="open-status">
            <FaCheckCircle />
            Open opportunities
          </div>

        </div>


        {/* =========================
            PROJECT GRID
        ========================= */}

        <div className="marketplace-grid">

          {filteredProjects.length > 0 ? (

            filteredProjects.map(
              (project) => {

                const skills =
                  Array.isArray(
                    project.skills
                  )
                    ? project.skills
                    : project.skills
                    ? [project.skills]
                    : [];

                return (
                  <div
                    className="project-card"
                    key={project.id}
                  >

                    {/* Top Gradient */}

                    <div className="project-card-top"></div>


                    <div className="project-card-content">

                      {/* Business */}

                      <div className="business-info">

                        {project.businessLogo ? (
                          <img
                            src={
                              project.businessLogo
                            }
                            alt={
                              project.businessName
                            }
                          />
                        ) : (
                          <div className="business-icon">
                            <FaBuilding />
                          </div>
                        )}

                        <div>
                          <small>
                            Posted by
                          </small>

                          <strong>
                            {
                              project.businessName
                            }
                          </strong>
                        </div>

                      </div>


                      {/* Title */}

                      <h3>
                        {project.title}
                      </h3>


                      {/* Category */}

                      <div className="project-category">
                        <FaBriefcase />

                        {project.category ||
                          "Startup Project"}
                      </div>


                      {/* Details */}

                      <div className="project-details">

                        <div>
                          <FaRupeeSign />

                          <small>
                            Budget
                          </small>

                          <strong>
                            {project.budget
                              ? `₹ ${project.budget}`
                              : "Not specified"}
                          </strong>
                        </div>

                        <div>
                          <FaCalendarAlt />

                          <small>
                            Deadline
                          </small>

                          <strong>
                            {project.deadline ||
                              "Not specified"}
                          </strong>
                        </div>

                      </div>


                      {/* Skills */}

                      <div className="skills-section">

                        <div className="skills-title">
                          <FaCode />
                          Required Skills
                        </div>

                        <div className="skills-list">

                          {skills.length > 0 ? (

                            skills
                              .slice(0, 5)
                              .map(
                                (
                                  skill,
                                  index
                                ) => (
                                  <span
                                    key={
                                      index
                                    }
                                  >
                                    {skill}
                                  </span>
                                )
                              )

                          ) : (
                            <span>
                              No skills specified
                            </span>
                          )}

                          {skills.length >
                            5 && (
                            <span className="more-skills">
                              +
                              {skills.length -
                                5}
                            </span>
                          )}

                        </div>

                      </div>

                    </div>


                    {/* =====================
                        CARD FOOTER
                    ====================== */}

                    <div className="project-card-footer">

                      <div className="project-status">

                        <span>
                          <FaCheckCircle />
                          Open
                        </span>

                        <small>
                          Startup Opportunity
                        </small>

                      </div>


                      {/* View Details */}

                      <button
                        className="view-button"
                        onClick={() =>
                          navigate(
                            `/developer/project/${project.id}`
                          )
                        }
                      >
                        View Details

                        <FaArrowRight />
                      </button>


                      {/* Apply */}

                      <button
                        className="apply-button"
                        onClick={() =>
                          handleApply(
                            project.id
                          )
                        }
                      >
                        Apply Now
                      </button>


                      {!user?.uid && (
                        <p className="login-hint">
                          Login as a developer
                          to apply
                        </p>
                      )}

                    </div>

                  </div>
                );
              }
            )

          ) : (

            /* =========================
               EMPTY STATE
            ========================= */

            <div className="no-projects">

              <div>
                <FaSearch />
              </div>

              <h3>
                No Projects Found
              </h3>

              <p>
                There are currently no startup
                projects matching your search.
              </p>

            </div>

          )}

        </div>

      </div>

      <MarketplaceStyles />

    </section>
  );
}


/* =====================================================
   STYLES
===================================================== */

function MarketplaceStyles() {
  return (
    <style>{`

      /* =========================
         PAGE
      ========================= */

      .marketplace-page {
        background: #F8FBFF;
        min-height: calc(100vh - 90px);
        padding: 65px 20px 90px;
        color: #071D49;
      }

      .marketplace-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
      }


      /* =========================
         HEADER
      ========================= */

      .marketplace-heading {
        text-align: center;
        max-width: 850px;
        margin: 0 auto 40px;
      }

      .marketplace-badge {
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
      }

      .marketplace-heading h1 {
        margin: 0 0 18px;

        color: #071D49;

        font-size: clamp(
          38px,
          5vw,
          58px
        );

        line-height: 1.15;

        font-weight: 800;

        letter-spacing: -1.5px;
      }

      .marketplace-heading h1 span {
        background:
          linear-gradient(
            90deg,
            #1EC8F3,
            #4169FF
          );

        -webkit-background-clip: text;

        -webkit-text-fill-color: transparent;
      }

      .marketplace-heading p {
        max-width: 760px;

        margin: 0 auto;

        color: #526B89;

        font-size: 17px;

        line-height: 1.7;
      }


      /* =========================
         SEARCH
      ========================= */

      .marketplace-search {
        position: relative;

        max-width: 800px;

        margin: 0 auto 45px;
      }

      .marketplace-search svg {
        position: absolute;

        left: 22px;

        top: 50%;

        transform:
          translateY(-50%);

        color: #0B9ED8;

        font-size: 18px;
      }

      .marketplace-search input {
        width: 100%;

        height: 58px;

        box-sizing: border-box;

        padding:
          0 22px 0 55px;

        border-radius: 30px;

        border:
          1px solid #D8E7F1;

        background: #FFFFFF;

        color: #071D49;

        font-size: 15px;

        outline: none;

        box-shadow:
          0 8px 25px
          rgba(7,29,73,0.06);
      }

      .marketplace-search input:focus {
        border-color: #1EC8F3;

        box-shadow:
          0 0 0 3px
          rgba(30,200,243,0.10);
      }


      /* =========================
         RESULT HEADER
      ========================= */

      .marketplace-result-header {
        display: flex;

        align-items: center;

        justify-content: space-between;

        gap: 20px;

        margin-bottom: 22px;
      }

      .marketplace-result-header h2 {
        margin: 0;

        color: #071D49;

        font-size: 24px;

        font-weight: 800;
      }

      .marketplace-result-header p {
        margin: 5px 0 0;

        color: #71849B;

        font-size: 14px;
      }

      .open-status {
        display: flex;

        align-items: center;

        gap: 7px;

        color: #159447;

        font-size: 13px;

        font-weight: 700;
      }


      /* =========================
         GRID
      ========================= */

      .marketplace-grid {
        display: grid;

        grid-template-columns:
          repeat(
            auto-fit,
            minmax(300px, 1fr)
          );

        gap: 24px;
      }


      /* =========================
         CARD
      ========================= */

      .project-card {
        display: flex;

        flex-direction: column;

        background: #FFFFFF;

        border:
          1px solid #DFEAF2;

        border-radius: 20px;

        overflow: hidden;

        box-shadow:
          0 10px 35px
          rgba(7,29,73,0.07);

        transition:
          transform .25s ease,
          box-shadow .25s ease;
      }

      .project-card:hover {
        transform:
          translateY(-5px);

        box-shadow:
          0 18px 42px
          rgba(7,29,73,0.12);
      }

      .project-card-top {
        height: 7px;

        background:
          linear-gradient(
            90deg,
            #1EC8F3,
            #4169FF
          );
      }

      .project-card-content {
        padding: 24px;
      }


      /* =========================
         BUSINESS
      ========================= */

      .business-info {
        display: flex;

        align-items: center;

        gap: 12px;

        margin-bottom: 18px;
      }

      .business-info img,
      .business-icon {
        width: 50px;

        height: 50px;

        min-width: 50px;

        border-radius: 14px;
      }

      .business-info img {
        object-fit: cover;

        border:
          1px solid #DDEBF2;
      }

      .business-icon {
        display: flex;

        align-items: center;

        justify-content: center;

        background: #E5F7FC;

        color: #0B9ED8;

        font-size: 20px;
      }

      .business-info small {
        display: block;

        color: #8193A8;

        font-size: 11px;

        margin-bottom: 3px;
      }

      .business-info strong {
        display: block;

        max-width: 220px;

        overflow: hidden;

        text-overflow: ellipsis;

        white-space: nowrap;

        color: #071D49;

        font-size: 14px;
      }


      /* =========================
         TITLE
      ========================= */

      .project-card h3 {
        margin: 0 0 12px;

        color: #071D49;

        font-size: 21px;

        line-height: 1.3;

        font-weight: 800;
      }


      /* =========================
         CATEGORY
      ========================= */

      .project-category {
        display: inline-flex;

        align-items: center;

        gap: 7px;

        padding: 7px 12px;

        margin-bottom: 18px;

        border-radius: 20px;

        background: #EAF8FD;

        color: #0B9ED8;

        font-size: 12px;

        font-weight: 700;
      }


      /* =========================
         DETAILS
      ========================= */

      .project-details {
        display: grid;

        grid-template-columns:
          1fr 1fr;

        gap: 10px;

        margin-bottom: 20px;
      }

      .project-details > div {
        padding: 11px;

        border:
          1px solid #E5EEF4;

        border-radius: 12px;

        background: #F8FBFF;
      }

      .project-details svg {
        color: #0B9ED8;

        margin-right: 5px;
      }

      .project-details small {
        color: #71849B;

        font-size: 11px;
      }

      .project-details strong {
        display: block;

        margin-top: 4px;

        color: #071D49;

        font-size: 12px;

        white-space: nowrap;

        overflow: hidden;

        text-overflow: ellipsis;
      }


      /* =========================
         SKILLS
      ========================= */

      .skills-section {
        margin-bottom: 5px;
      }

      .skills-title {
        display: flex;

        align-items: center;

        gap: 7px;

        margin-bottom: 10px;

        color: #071D49;

        font-size: 13px;

        font-weight: 700;
      }

      .skills-title svg {
        color: #0B9ED8;
      }

      .skills-list {
        display: flex;

        flex-wrap: wrap;

        gap: 7px;
      }

      .skills-list span {
        padding: 6px 10px;

        border-radius: 8px;

        background: #F3F8FC;

        border:
          1px solid #E1ECF3;

        color: #526B89;

        font-size: 11px;

        font-weight: 600;
      }

      .skills-list .more-skills {
        background: #EAF8FD;

        color: #0B9ED8;

        border-color: #BFEAF7;
      }


      /* =========================
         FOOTER
      ========================= */

      .project-card-footer {
        margin-top: auto;

        padding:
          18px 24px 24px;

        border-top:
          1px solid #EDF2F6;
      }

      .project-status {
        display: flex;

        align-items: center;

        justify-content: space-between;

        gap: 10px;

        margin-bottom: 14px;
      }

      .project-status span {
        display: inline-flex;

        align-items: center;

        gap: 6px;

        padding: 6px 10px;

        border-radius: 20px;

        background: #EAF9F0;

        color: #159447;

        font-size: 11px;

        font-weight: 700;
      }

      .project-status small {
        color: #8193A8;

        font-size: 10px;
      }


      /* =========================
         BUTTONS
      ========================= */

      .view-button,
      .apply-button {
        width: 100%;

        height: 47px;

        border-radius: 25px;

        font-size: 14px;

        font-weight: 700;

        cursor: pointer;

        transition: .2s ease;
      }

      .view-button {
        display: flex;

        align-items: center;

        justify-content: center;

        gap: 7px;

        margin-bottom: 10px;

        background: #FFFFFF;

        color: #0B9ED8;

        border:
          1px solid #1EC8F3;
      }

      .view-button:hover {
        background: #EAF8FD;
      }

      .apply-button {
        border: none;

        background:
          linear-gradient(
            90deg,
            #1EC8F3,
            #13B5E2
          );

        color: #FFFFFF;

        box-shadow:
          0 8px 20px
          rgba(30,200,243,0.18);
      }

      .apply-button:hover {
        transform:
          translateY(-1px);

        box-shadow:
          0 12px 25px
          rgba(30,200,243,0.25);
      }

      .login-hint {
        margin: 8px 0 0;

        text-align: center;

        color: #8193A8;

        font-size: 10px;
      }


      /* =========================
         EMPTY
      ========================= */

      .no-projects {
        grid-column: 1 / -1;

        text-align: center;

        padding: 70px 20px;

        background: #FFFFFF;

        border:
          1px solid #DFEAF2;

        border-radius: 20px;
      }

      .no-projects > div {
        width: 65px;

        height: 65px;

        margin: 0 auto 18px;

        border-radius: 18px;

        display: flex;

        align-items: center;

        justify-content: center;

        background: #EAF8FD;

        color: #0B9ED8;

        font-size: 24px;
      }

      .no-projects h3 {
        margin-bottom: 8px;

        color: #071D49;

        font-weight: 800;
      }

      .no-projects p {
        margin: 0;

        color: #71849B;
      }


      /* =========================
         LOADING
      ========================= */

      .marketplace-loading {
        min-height: 65vh;

        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: center;

        text-align: center;
      }

      .marketplace-loading h4 {
        margin: 0;

        color: #071D49;

        font-weight: 800;
      }

      .marketplace-loading p {
        margin-top: 8px;

        color: #71849B;
      }

      .marketplace-spinner {
        width: 48px;

        height: 48px;

        margin-bottom: 18px;

        border:
          5px solid #DDF6FC;

        border-top-color:
          #1EC8F3;

        border-radius: 50%;

        animation:
          marketplaceSpin 1s
          linear infinite;
      }

      @keyframes marketplaceSpin {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }


      /* =========================
         TABLET
      ========================= */

      @media (max-width: 768px) {

        .marketplace-page {
          padding:
            45px 16px 65px;
        }

        .marketplace-heading {
          margin-bottom: 30px;
        }

        .marketplace-heading h1 {
          font-size: 38px;
        }

        .marketplace-heading p {
          font-size: 15px;
        }

        .marketplace-result-header {
          align-items: flex-start;
          flex-direction: column;
          gap: 8px;
        }

        .marketplace-grid {
          grid-template-columns: 1fr;
        }

      }


      /* =========================
         MOBILE
      ========================= */

      @media (max-width: 480px) {

        .marketplace-page {
          padding:
            35px 14px 55px;
        }

        .marketplace-badge {
          font-size: 13px;

          padding:
            9px 15px;
        }

        .marketplace-heading h1 {
          font-size: 34px;

          letter-spacing:
            -0.8px;
        }

        .marketplace-heading p {
          font-size: 14px;

          line-height: 1.65;
        }

        .marketplace-search input {
          height: 54px;

          font-size: 13px;
        }

        .project-card-content {
          padding: 20px;
        }

        .project-card-footer {
          padding:
            16px 20px 20px;
        }

        .project-card h3 {
          font-size: 19px;
        }

        .project-status small {
          display: none;
        }

      }

    `}</style>
  );
}