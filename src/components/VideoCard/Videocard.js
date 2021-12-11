import React, { useState } from 'react'
import './Videocard.css'
import sample_video from '../../assets/sample_video.mp4'

export default function Videocard({type}) {
    const [mute, setmute] = useState(false)
    const toggleMute = () => {
        setmute(!mute)
    }
    return (
        <div className='videocard'>
            <video src={sample_video} muted autoPlay></video>
            {type==='1' 
            ? mute
                ?<i onClick={()=>toggleMute()} className="videocard_icon fas fa-microphone-alt-slash"></i>
                :<i onClick={()=>toggleMute()} className="videocard_icon fas fa-microphone-alt"></i> 
            :''
            }
        </div>
    )
}
