import React, {Component} from 'react'
import io from 'socket.io-client'

class Chat extends Component{
    render(){
        const messages = this.props.messages.map((el,i)=>{
                return(
                    <div key={i}>
                        <span> {String.fromCodePoint(128293)} {el.author} : {el.message}</span>
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