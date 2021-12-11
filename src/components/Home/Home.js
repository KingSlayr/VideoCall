import React from 'react'
import Chat from '../Chat/Chat'
import Videocard from '../VideoCard/Videocard'
import './Home.css'

export default function Home({setroute}) {
    const toggleCam = (e) => {
        if(e.target === document.querySelector('.videocard_icon')){
            return;
        }

        if(e.target.id === '1'){
            if(document.querySelector('.two').classList.contains('home_cam2')){
                document.querySelector('.one').classList.toggle("home_cam2");
                document.querySelector('.one').classList.toggle("home_cam1");
                document.querySelector('.two').classList.toggle("home_cam1");
                document.querySelector('.two').classList.toggle("home_cam2");
            }
        }else{
            if(document.querySelector('.one').classList.contains('home_cam2')){
                document.querySelector('.one').classList.toggle("home_cam2");
                document.querySelector('.one').classList.toggle("home_cam1");
                document.querySelector('.two').classList.toggle("home_cam1");
                document.querySelector('.two').classList.toggle("home_cam2");
            }
        }
    }
    return (
        <div className='home'>
            <i onClick={()=>setroute('signup')} className="home_back fas fa-arrow-left"></i>
            <div className='home_container'>
                <div className='home_camContainer'>
                    {/* opponent video type 2 */}
                    <div onClick={(e)=>toggleCam(e)} className='two home_cam2'><Videocard type={'2'}/></div>
                    {/* my video type 1 */}
                    <div onClick={(e)=>toggleCam(e)} className='one home_cam1'><Videocard type={'1'}/></div>
                </div>
                <div className='home_chat'><Chat/></div>
            </div>
        </div>
    )
}
