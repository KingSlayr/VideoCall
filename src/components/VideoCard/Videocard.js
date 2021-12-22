import React, { useState } from 'react'
import './Videocard.css'
import sample_video from '../../assets/loader2.mp4'

export default function Videocard({name,videoRef,type}) {

    // console.log(videoRef);
    return (
        <div className='videocard'>
            <div className='videocard_name'>{name}</div>
            <video loop src={sample_video} ref={videoRef} autoPlay id={type}></video>
        </div>
    )
}
