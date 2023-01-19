import React, { Fragment, useEffect, useState } from "react";
import edit from "../../../../assets/images/icons/edit.png";
import download from "../../../../assets/images/icons/download.png";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getUserDataById, getUserDocuments } from "../../../../requests/Auth";

function PersonalDetails({ setIsOpen }) {
  const [personal, setPersonal] = useState(true);
  const [edDocs, setEdDocs] = useState(false);

  const [user, setUser] = useState({});
  const [ids, setId] = useState("");
  const [documents, setDocuments] = useState({});
  let params = useParams();
  useEffect(() => {
    const getUser = async () => {
      const user = JSON.parse(localStorage.getItem("userData"));
      const documents = JSON.parse(localStorage.getItem("userDocs"));
      const ids = localStorage.getItem("ids");
      setId(ids);
      const userData = user.filter((item) => item.id == params.id);
      const documentData = documents.filter((item) => item.id == params.id);
      userData && setUser(userData[0]);
      documentData && setDocuments(documentData[0]);
    };
    getUser();
  }, []);
  const handleTabSwitch = (id) => {
    if (id == "personal") {
      setPersonal(true);
      setEdDocs(false);
    } else {
      setPersonal(false);
      setEdDocs(true);
    }
  };
  return (
    <Fragment>
      <div className="profile-section-personal-detail-left">
        <div className="personal-detail-title">
          <h4>Personal Details</h4>
        </div>
        <ul>
          <li
            className={personal && "personal-details-head"}
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleTabSwitch("personal")}
          >
            Personal details{" "}
          </li>
          <li
            className={edDocs && "personal-details-head"}
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleTabSwitch("docs")}
          >
            Education Documents
          </li>
          {/* <li className="personal-details-head">Key skill </li> */}
        </ul>
      </div>
      <div className="profile-section-personal-detail-right">
        <div className="profile-section-personal-table">
          <div className="personal-detail-title">
            <h4>Personal Details</h4>
          </div>
          <div className="personal-detail-table">
            <table>
              <tbody>
                <tr>
                  <td>Full Name </td>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <td>Professional Title</td>
                  <td>{user.title ? user.title : "Not Updated"}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>Date of birth</td>
                  <td>
                    {user.date_of_birth ? user.date_of_birth : "Not Updated"}
                  </td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>{user.country ? user.country : "Not Updated"}</td>
                </tr>
                <tr>
                  <td>Language</td>
                  <td>{user.language ? user.language : "Not Updated"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="profile-section-personal-resume">
          <div className="personal-detail-title">
            <h4>Resume</h4>
          </div>

          <div className="profile-section-personal-resume-update">
            <div>
              {documents && documents.resume
                ? documents.resume.split("/").pop()
                : "Not Updated"}
            </div>
          </div>

          {documents && documents.resume && (
            <div className="resume-update">
              <a
                href={documents.resume ? documents.resume : "#"}
                target="_blank"
                className="button"
                style={{ textDecoration: "none" }}
              >
                View Resume
              </a>
            </div>
          )}
        </div>
        <div className="profile-section-personal-resume">
          <div className="personal-detail-title">
            <h4>Cover Letter</h4>
          </div>

          <div className="profile-section-personal-resume-update">
            <div>
              {documents && documents.cover_letter
                ? documents.cover_letter.split("/").pop()
                : "Not Updated"}
            </div>
          </div>

          {documents && documents.cover_letter && (
            <div className="resume-update">
              <a
                href={documents.cover_letter ? documents.cover_letter : "#"}
                target="_blank"
                className="button"
                style={{ textDecoration: "none" }}
              >
                View Cover Letter
              </a>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default PersonalDetails;
