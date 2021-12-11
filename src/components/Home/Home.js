import React from 'react'
import Chat from '../Chat/Chat'
import Videocard from '../VideoCard/Videocard'
import './Home.css'

export default function Home({setroute}) {
    return (
        <div className='home'>
            <i onClick={()=>setroute('signup')} className="home_back fas fa-arrow-left"></i>
            <div className='home_container'>
                <div className='home_camContainer'>
                    {/* opponent video type 2 */}
                    <div className='home_cam2'><Videocard type={'2'}/></div>
                    {/* my video type 1 */}
                    <div className='home_cam1'><Videocard type={'1'}/></div>
                </div>
                <div className='home_chat'><Chat/></div>
            </div>
        </div>
    )
}
