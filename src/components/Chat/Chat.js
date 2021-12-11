import React, { useEffect } from 'react'
import './Chat.css'
import Message from './Message'

function Chat() {
    useEffect(() => {
        var scroll = document.querySelector('.chat_messages');
        scroll.scrollTop = scroll.scrollHeight;
        scroll.animate({scrollTop: scroll.scrollHeight});
    })
    return (
        <div className='chat'>
            <div className='chat_messages'>
            {/* 1 means self and 2 means opponent */}
                <Message sender={'1'}/>
                <Message sender={'2'}/>
                <Message sender={'2'}/>
                <Message sender={'1'}/>
                <Message sender={'1'}/>
                <Message sender={'2'}/>
                <Message sender={'1'}/>
                <Message sender={'2'}/>
                <Message sender={'1'}/>
                <Message sender={'1'}/>
                <Message sender={'2'}/>
                <Message sender={'2'}/>
                <Message sender={'1'}/>
                <Message sender={'2'}/>
                <Message sender={'1'}/>
                <Message sender={'1'}/>
                <Message sender={'2'}/>
                <Message sender={'1'}/>
                <Message sender={'2'}/>
                <Message sender={'2'}/>
                <Message sender={'1'}/>
                <Message sender={'2'}/>
                <Message sender={'1'}/>
                <Message sender={'1'}/>
            </div>
            <div className='chat_footer'>
                <input type="text" name='chat' />
                <i className="chat_send fas fa-arrow-right"></i>
            </div>
        </div>
    )
}

export default Chat
