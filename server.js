
/*server tende ser reniciado para poder fazer alterações*/
var app = require('express')();
var http = require('http').createServer(app);
var express = require('express');
var path = require('path');
/* npm intall  socket.io*/
/* nova variavel */
var io = require('socket.io')(http);


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
/* para resolver o require usar o npm install ejs*/
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



app.get('/', (req, res) => {
    /*comando para chamar elementos do html*/
    //res.send('index.html');
    //res.sendFile(__dirname + '/startingindex.html'); //para teste
        /*comando para chamar o arquivo a ser executado no server*/
    /*ajuste para chamar o css*/
    res.render(__dirname + '/public/startingindex.html');
    
    

});



/*nova rota*/
io.on('connection',(Socket)=>{
    /*novo usuario*/
    console.log('usuario entrou');
});

/*respostas em backend do usuarios  */
io.on('connection', (socket) => {
    console.log('usuario conectado');
    socket.on('desconctado', () => {
        console.log('usuario saiu');
    });
});


/*manda menssagens emm formato de logs*/
io.on('connection', (socket)=> {
    socket.on('chat de menssagens', (msg) =>{
        console.log('message: ' + msg);
    });
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});


/* cada web um usuario certo ?*/
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // Isso emitirá o evento para todos os soquetes conectados 


/**/
io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});


io.on('connection', (socket) => {
    socket.on('chat de menssagens', (msg) => {
        io.emit('chat de menssagens', msg);
        });
    });