import React from 'react'
import "./home.css";

const Home = () => {
    return (
        <div className="home d-flex justify-content-center align-items-center">
            <div className="container home d-flex justify-content-center align-items-center flex-column">
                <h1 className='text-center'>Organize your <br /> work and personal life seamlessly.</h1>
                <p className='text-center'>Achieve focus, organization, and meet your goals with Scheduler.<br />
                    Your ultimate task management solution.</p>

                <button className='btn'>Join</button>
            </div>
        </div>
    )
}

export default Home