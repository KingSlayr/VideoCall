import React from 'react'
import './Message.css'

function Message({sender,content}) {
    return (
        <div style={{alignSelf : sender==='1'?'flex-end':'flex-start'}} className='message'>
            {content} 
        </div>
    )
}

export default Message
