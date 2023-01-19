import React, { useEffect, useState } from "react";
import backgroundImage from "../../../../assets/images/background/bg2.png";
import profilImage from "../../../../assets/images/icons/blank.png";
import flag from "../../../../assets/images/icons/flag.png";
import { useParams } from "react-router-dom";

function ProfileInfo({ tab, setTab }) {
  const [user, setUser] = useState({});
  const [documents, setdocuments] = useState({});

	let params = useParams();
  useEffect(() => {
    const getUser = async () => {
      const user = JSON.parse(localStorage.getItem("userData"));
      const document = JSON.parse(localStorage.getItem("userDocs"));

      const userData = [...user.filter((item)=>item.id==params.id)];
      const docs = [...document.filter((item)=>item.id==params.id)];

      userData && setUser(userData[0]);
      docs && setdocuments(docs[0]);
    };
    getUser();
  },[]);
  return (
    <div>
      <div>
        <img
          src={backgroundImage}
          width={"100%"}
          style={{ minHeight: 150, borderRadius: 15 }}
          alt="background-images"
        />
      </div>
      <div className="profileInfo-cont">
        <div className="profileInfo-profile-detail">
          <div className="profileInfo-profile-image">
            <img
              src={user.avatar?user.avatar:profilImage}
              width={"100%"}
              height={"100%"}
              alt="profile-image"
            />
          </div>
          <div className="profileInfo-profile-detail-text">
            <h4>{user.name}</h4>
            {user.country&&<p>
              <img src={flag} height={13} alt="flag-icon" /> {user.country}
            </p>}
            {user.position&&<p>
              {user.position}
            </p>}
            
          </div>
          
        </div>
        {documents&&documents.video_resume&&<div className="profileInfo-profile-complition">
          
          <div>
            <video
              // poster={videoThumb}
              width={"100%"}
              height={"100%"}
              controls={true}
            >
              <source src={documents.video_resume} type="video/mp4" />
            </video>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default ProfileInfo;
