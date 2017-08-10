//Initialize all modules.
const express = require('express'),
          app = express(),
   /*===== Sockets =====*/
       server = require('http').createServer(app),
           io = require('socket.io')(server),
         PORT = process.env.PORT || 8080
    //  stripper = new RegExp(/[$&+,:;=?@#|/'<>.^*()%!]/, 'gi')

// Add headers && CORS
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

//Socket initialization and handling client interaction.
io.on('connection', socket=>{ 
    io.emit('message', {connection: 'LOUD AND CLEAR.'})
    socket.on('client:message', data=> {
        // if((data.author.search(/wil/gi) > -1 || stripper.test(data.author)) || data.message.indexOf('Will')>-1 ){
        //     io.emit('server:message', {author: 'Fail Troll', message: data.message.replace('Will','Ian').replace('will',`${String.fromCodePoint(128293)}I'm a really bad troll${String.fromCodePoint(128293)}`), error: true})
        // }
        io.emit('server:message', data)
    })
    socket.on('client:newuser', data=>{
        // if(data.author.search(/wil/gi) > -1 || stripper.test(data.author)){
        //     io.emit('server:userjoin', {author: 'Fail Troll', message: data.message, error: true})
        // }
        io.emit('server:userjoin', data)
    })
});

//Set express to listen on PORT 8080.
server.listen(PORT, ()=>{
    console.log(`Express running on PORT: ${PORT}`)
    console.log('Control+C to kill server.')
})