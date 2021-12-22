import React, { useEffect } from 'react'
import './Chat.css'
import Message from './Message'

function Chat({messageContent,setmessageContent,sendMessage,messages}) {
    useEffect(() => {
        var scroll = document.querySelector('.chat_messages');
        scroll.scrollTop = scroll.scrollHeight;
        scroll.animate({scrollTop: scroll.scrollHeight});
    })
    return (
        <div className='chat'>
            <div className='chat_messages'>
            {/* 1 means self and 2 means opponent */}
                {/* <Message sender={'1'}/> */}
                {
                    messages.map((mess,key)=>{
                        return <Message key={key} sender={mess.type} content={mess.content}/>
                    })
                }
            </div>
            <div className='chat_footer'>
                <input value={messageContent} onInput={(e)=>setmessageContent(e.target.value)} onKeyPress={(e)=>{if(e.key === 'Enter'){sendMessage(e)}}} type="text" name='chat' />
                <i className="chat_send fas fa-arrow-right" 
                    onClick={(e)=>sendMessage(e)}></i>
            </div>
        </div>
    )
}

export default Chat
