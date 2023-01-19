import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import React, { Component, useEffect, useState } from "react";
import {
  getAllCandidates,
  getUserDataById,
  getUserDocuments,
} from "../../requests/Auth.js";
import { Link, useParams } from "react-router-dom";
import profile from "../../assets/images/icons/profile.png";
import Header from "../Shared/Header.js";


function CandidatePage(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")));
const[ids,setId]=useState("")
  const [documents, setDocuments] = useState({});
	let params = useParams();
  useEffect(() => {
      const ids = localStorage.getItem("ids");
      setId(ids)
      const getUser = async () => {
      const userData = user.filter((item)=>item.id==params.id)
      const documentData = await getUserDocuments(params.id);
      userData && setUser(userData.data.data);  
      if(documentData){
      setDocuments(documentData.data.data);
      }
    };
    getUser();
  },[]);


  return (<>
            <Header />

    <div className="know-more-container ">

      <Card>
        <Card.Header>
          <div className="left-item">
            {" "}
            <img
              src={
                user.avatar
                  ? user.avatar
                  : profile
              }
            />
          </div>
          <div className="college-details">
            <h1>{user.name}</h1>
            <span>
              {user.email}
            </span>
            {user.position && (
              <h4 className="theme-color-college-name">{user.position}</h4>
            )}
          </div>
          <div className="right-item">
            {user.status !== "spam" && user.status == "pending" && (
              <span>
                <Button
                // disabled={applied ? true : false}
                // className={applied ? "theme-color-disabled" : "theme-color"}
                // onClick={applyToUniversity}
                >
                  Verify User
                </Button>
              </span>
            )}

            <span>
              <Button
              // disabled={saved ? true : false}
              // className={saved ? "theme-color-disabled" : "theme-color"}
              // onClick={saveUniversity}
              >
                {user.status == "spam" ? "Delete Spam User" : "Delete User"}
              </Button>
            </span>
          </div>
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <div className="left-item">
              
              <div className="ml-1">
                <span>Phone</span>
                <br />
                <span className="course-spec">
                  {user.phone ? user.phone : "Not Updated"}
                </span>
              </div>
            </div>

            <div className="left-item">
                      <div className="ml-1">
                <span>Location</span>
                <br />
                <span className="course-spec">
                  {user.country ? user.country : "Not Updated"}
                </span>
              </div>
            </div>

            
            
          </blockquote>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <div className="left-item">
              
              <div className="ml-1">
                <span>Resume</span>
                <br />
                <span className="course-spec">
                  {documents && documents.resume ? (
                    <a
                      href={documents.resume ? documents.resume : "#"}
                      target="_blank"
                    >
                      {documents.resume.split("/").pop()}
                    </a>
                  ) : (
                    "Not Updated"
                  )}
                </span>
              </div>
            </div>

            <div className="left-item">
                      <div className="ml-1">
                <span>Cover Letter</span>
                <br />
                <span className="course-spec">
                  {documents && documents.cover_letter ? (
                    <a
                      href={
                        documents.cover_letter ? documents.cover_letter : "#"
                      }
                      target="_blank"
                    >
                      {documents.cover_letter.split("/").pop()}
                    </a>
                  ) : (
                    "Not Updated"
                  )}
                </span>
              </div>
            </div>

            <div className="left-item">
                   <div className="ml-1">
                <span>Other Documents</span>
                <br />
                <span className="course-spec">
                  {documents && documents.other_documents ? (
                    <a
                      href={
                        documents.other_documents
                          ? documents.other_documents
                          : "#"
                      }
                      target="_blank"
                    >
                      {documents.other_documents.split("/").pop()}
                    </a>
                  ) : (
                    "Not Updated"
                  )}
                </span>
              </div>
            </div>
          </blockquote>
        </Card.Body>
        <Card>
          <Card.Header>
            <div className="right-item">
              <span>
                <Link
                  to={ids?`/dashboard?id=${ids}`:"/dashboard"}
                  // disabled={saved ? true : false}
                  // className={saved ? "theme-color-disabled" : "theme-color"}
                  // onClick={saveUniversity}
                >
                  Back to Candidates List
                </Link>
              </span>
            </div>
          </Card.Header>
        </Card>
      </Card>
    </div>
</>
  );
}

export default CandidatePage;
