import React from 'react'
import CandidateList from '../Candidates/CandidatesList'
import BackgroundDesign from '../Shared/BackgroundDesign'
import Header from '../Shared/Header'

function Dashboard() {
    return (
        <div className='dashboard-main-cont'>
            <Header />
            <BackgroundDesign />
            <div className='dashboard-section-cont' >
                <h4 className='dashboard-header'>All Candidates</h4>
                <CandidateList/>

            </div>

        </div>
    )
}

export default Dashboard
