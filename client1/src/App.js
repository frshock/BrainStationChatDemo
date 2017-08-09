import React, { Component } from 'react'
import Chat from './Chat'
import io from 'socket.io-client'
import './App.css'
const socket = io('http://localhost:8080')

class App extends Component {
  state = {
    user: '',
    loggedIn: false,
    messages: [
      { author: 'Admin', message: 'Welcome to BrainStation chat! Please be civil.' }
    ]
  }

  componentDidMount() {
    socket.connect()
    socket.on('message', data=>{
      console.log(data)
    })
    socket.on('server:message', data => {
      this.setState({
        messages: this.state.messages.concat(data)
      })
    })
    socket.on('server:userjoin', data=>{
      if(data.error){
        alert('Someone just tried to be a troll. Shame them.')
        this.setState({
          messages: this.state.messages.concat({author:data.author, message: data.message})
        })
      }
      else{
        this.setState({
          messages: this.state.messages.concat(data)
        })
      }
    })
  }

  submitChat = e => {
    e.preventDefault()
    let user;
    this.state.user === '' ? user = 'Uninspired one' : user = this.state.user
    const dataToSend = {
      author: user,
      message: this.refs.chatText.value
    }
    socket.emit('client:message', dataToSend)
    this.refs.chatText.value = ''
  }

  submitUser = () =>{
    console.log('Username saved as ',this.refs.username.value)

    socket.emit('client:newuser', {author:this.refs.username.value, message: 'has connected to the chat!'})
    this.setState({
      loggedIn: true,
      user: this.refs.username.value !== '' ? this.refs.username.value : 'BrainStation Student'
    })
  }

  render() {
    let loginForm;
    if(!this.state.loggedIn){
      loginForm = (<form onSubmit={this.submitUser}>
                    <input ref="username" type='text' placeholder='Enter your username.'/>
                   </form>)
    }
    else { 
      loginForm = <p className="login">Logged in as {this.state.user}</p>
    }
    return (
      <div className="App">
        <h1> Welcome to BrainStation Chat! </h1>
        {loginForm}
        <Chat messages={this.state.messages}/>
        <form className="chatbox" onSubmit={this.submitChat}>
          <input ref="chatText" type="text" placeholder="Talk to the class!" />
        </form>
      </div>
    );
  }
}

export default App;
