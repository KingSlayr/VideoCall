import React from 'react'
import './Message.css'

function Message({sender}) {
    return (
        <div style={{alignSelf : sender==='1'?'flex-end':'flex-start'}} className='message'>
            Message Message 
        </div>
    )
}

export default Message
