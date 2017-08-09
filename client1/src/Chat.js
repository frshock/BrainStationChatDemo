import React, {Component} from 'react'
import io from 'socket.io-client'
const socket = io('http://localhost:8080')

class Chat extends Component{
    
    render(){
        const messages = this.props.messages.map(el=>{
                return(
                    <div>
                        <span>{el.author} : {el.message}</span>
                    </div>
                )
            })
        return (
            <div className="messageContainer">
                {messages}
            </div>
        )
    }
}

export default Chat