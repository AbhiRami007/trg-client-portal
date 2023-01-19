import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import OnHold from "../components/Candidates/OnHold";
import ProfilePage from "../components/Candidates/Profile/ProfilePage";
import Rejected from "../components/Candidates/Rejected";
import Selected from "../components/Candidates/Selected";
// import JobsPage from "../components/Candidates/JobsPage";
import Dashboard from "../components/Dashboard/Dashboard";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<Navigate to="/dashboard" />} />
      {/* Pages */}
      <Route path="dashboard" element={<Dashboard />} />
      {/* <Route path="saved-candidates" element={<CandidatesSaved />} /> */}
      <Route path="view-candidate/:id" element={<ProfilePage />} />
      <Route path="selected" element={<Selected />} />
      <Route path="on-hold" element={<OnHold />} />
      <Route path="rejected" element={<Rejected />} />
      {/* <Route path='/view-applied-jobs/:id' element={<JobsPage />} />  */}
      {/* <Route
        path="/profile/*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ProfilePage />
          </Suspense>
        }
      /> */}

      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { PrivateRoutes };
