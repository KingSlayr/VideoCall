import React, { useEffect, useRef, useState } from 'react'
import Chat from '../Chat/Chat'
import Videocard from '../VideoCard/Videocard'
import './Home.css'

import io from "socket.io-client"
import Peer from "simple-peer"
const socket = io.connect('https://connect-me-backend.herokuapp.com/')

export default function Home({myName,setroute}) {
    const [stream, setstream] = useState()
    const [myId, setmyId] = useState('')
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [opponentName, setopponentName] = useState('')
	const [opponentId, setopponentId] = useState('')
	const [messageContent, setmessageContent] = useState('')
	const [messages, setmessages] = useState([])

    const myVideo = useRef()
	const opponentVideo = useRef()
	const connectionRef= useRef()

    // var socket;

    useEffect(() => {
		
		setmyId(socket.id)
		socket.on("returOpponentId", (id) => {
			navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
				setstream(stream)
				myVideo.current.srcObject = stream
				if(id){
					callUser(id.opponent,id.myId,stream);
				}
			})
		})

		socket.emit('getOpponetId',socket.id)
		socket.on("callUser", (data) => {
			// setReceivingCall(true)
			setCaller(data.from)
			setopponentName(data.name)
			setCallerSignal(data.signal)
			navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
				answerCall(data.from,data.signal,stream);
			})
		})
		socket.on('callEnded',()=>{
			window.location.reload()
		})

	}, [])
	useEffect(() => {
		socket.on('messageReceived',(messageReceived)=>{
			setmessages([...messages,{type:'2',content:messageReceived}])
		})
	}, [messages])

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


	const callUser = (opp,my,stream) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: opp,
				signalData: data,
				from: my,
				name: myName
			})
		})
		peer.on("stream", (stream) => {
			opponentVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (data) => {
			// setCallAccepted(true)
			peer.signal(data.signal)
			setopponentName(data.name)
			setCaller(data.id)
		})

		connectionRef.current = peer
	}

	const answerCall =(gotcaller,gotsignal,stream) =>  {
		// setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: gotcaller, name: myName })
		})
		peer.on("stream", (stream) => {
			opponentVideo.current.srcObject = stream
		})
		peer.signal(gotsignal)
		connectionRef.current = peer
	}
	const leaveCall = () => {
		// setCallEnded(true)
		// connectionRef.current.destroy()
		socket.emit("endCall", {
			opponent: caller,
		})
		window.location.reload()
	}

	const sendMessage = (e) => {
		try {
			if(messageContent!==''){
				socket.emit("sendMessage", {
					to: caller,
					message: messageContent
				})
				setmessages([...messages,{type:'1',content:messageContent}])
				setmessageContent('')
			}
		} catch (error) {
			console.log(error.message);	
		}
	}

    return (
        <div className='home'>
            <i onClick={()=>setroute('signup')} className="home_back fas fa-arrow-left"></i>
            <div className='home_container'>
				<button onClick={()=>leaveCall()} className='home_endButton'>End</button>
		{/* <input type="text" onInput={(e)=>setopponentId(e.target.value)} />
		<button onClick={()=>callUser(opponentId)}> call</button>
		<button onClick={()=>answerCall()}>Answer</button>
		<button onClick={()=>leaveCall()}>End</button> */}
                <div className='home_camContainer'>
                    {/* opponent video type 2 */}
                    <div onClick={(e)=>toggleCam(e)} className='two home_cam2'><Videocard name={opponentName} videoRef={opponentVideo} type={'2'}/></div>
                    {/* my video type 1 */}
                    <div onClick={(e)=>toggleCam(e)} className='one home_cam1'><Videocard name={myName} videoRef={myVideo} type={'1'}/></div>
                </div>
                <div className='home_chat'><Chat messageContent={messageContent} setmessageContent={setmessageContent} sendMessage={sendMessage} messages={messages}/></div>
            </div>
        </div>
    )
}
