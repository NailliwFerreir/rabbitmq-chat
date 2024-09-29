const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const amqp = require('amqplib');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*', // Permitir solicitações de qualquer origem
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

app.use(cors({
  origin: '*', // Permitir solicitações de qualquer origem
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

let channel;
// Conexão com o RabbitMQ
const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    console.log('Successfully connected to RabbitMQ');

    channel = await connection.createChannel();
    console.log('Channel created successfully');

    await channel.assertQueue('chat');
    console.log('Queue "chat" asserted successfully');

    channel.consume('chat', (msg) => {
      const message = msg.content.toString();
      io.emit('chat message', message);
      console.log('Message received and emitted:', message);
      // Reconhecer manualmente a mensagem após o processamento
      channel.ack(msg);
    }, { noAck: false });

    // Adicionar evento de fechamento da conexão
    connection.on('close', () => {
      console.error('Connection to RabbitMQ closed');
    });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
};

// Conectar ao RabbitMQ ao iniciar o servidor
connectToRabbitMQ();

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    // Enviar a mensagem para a fila do RabbitMQ
    channel.sendToQueue('chat', Buffer.from(msg));
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});