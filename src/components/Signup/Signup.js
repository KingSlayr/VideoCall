import React from 'react'
import './Signup.css'

export default function Signup({setroute}) {
    return (
        <div className='signup'>
            <div className='signup_form'>                
                <div className='signup_title'>
                    Enter Here !
                </div>
                <div className='signup_input'>
                    <span>Nickname</span>
                    <span><input type="text" name='name'/></span>
                </div>
                <div>
                    <button onClick={()=>setroute('home')}>Enter</button>
                </div>
            </div>
        </div>
    )
}
