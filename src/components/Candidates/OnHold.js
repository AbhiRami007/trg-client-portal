import React from 'react'
import CandidateList from '../Candidates/CandidatesList'
import BackgroundDesign from '../Shared/BackgroundDesign'
import Header from '../Shared/Header'

function OnHold() {
    return (
        <div className='dashboard-main-cont'>
            <Header />
            <BackgroundDesign />
            <div className='dashboard-section-cont' >
                <h4 className='dashboard-header'>Candidates On-Hold</h4>
                <CandidateList/>

            </div>

        </div>
    )
}

export default OnHold
