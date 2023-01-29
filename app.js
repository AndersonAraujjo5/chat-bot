import express from 'express';
import server from 'http';
import io from 'socket.io';
import fs from 'fs';
import { Buffer } from 'buffer';

const venom = require('venom-bot');

class App {
  constructor() {
    this.app = express();
    this.server = server.createServer(this.app);
    this.io = io(this.server, { cors: { origin: '*' } });
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on('message', () => {
        venom
          .create({
            // session
            session: 'sessionName', // Pass the name of the client you want to start the bot
            catchQR: (base64Qr, asciiQR) => {
              console.log(asciiQR); // Optional to log the QR in the terminal
              const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
              const response = {};

              if (matches.length !== 3) {
                return new Error('Invalid input string');
              }
              response.type = matches[0];
              response.data = Buffer.from(matches[2], 'base64');

              const imageBuffer = response;

              fs.writeFile(
                './image/out.png',
                imageBuffer.data,
                'binary',
                (err) => {
                  if (err != null) {
                    console.log(err);
                  }

                  socket.on('ready', () => {
                    setTimeout(() => {
                      console.log('executando');
                      socket.emit('ready', './image/out.png');
                    }, 3000);
                  });
                },
              );
            },
            logQR: false,
          })
          .then((client) => {
            // eslint-disable-next-line no-use-before-define
            start(client);
          })
          .catch((erro) => {
            console.log(erro);
          });

        function start(client) {
          client.onStateChange((state) => {
            socket.emit('message', `Status: ${state}`);
            console.log(`State changed ${state}`);
          });
        }
      });
    });
  }
}

export default new App().server;
