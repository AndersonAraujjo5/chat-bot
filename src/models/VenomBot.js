const venom = require('venom-bot');

export default class VenomBot {
  createSession(sessionName) {
    venom
      .create({
        // session
        session: sessionName, // Pass the name of the client you want to start the bot
        catchQR(base64Qr, asciiQR) {
          console.log(asciiQR); // Optional to log the QR in the terminal
          const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          const response = {};

          if (matches.length !== 3) {
            return new Error('Invalid input string');
          }
          response.type = matches[1];
          response.data = new Buffer.from(matches[2], 'base64');

          const imageBuffer = response;
          require('fs').writeFile(
            'image/qr.png',
            imageBuffer.data,
            'binary',
            (err) => {
              if (err != null) {
                console.log(err);
              }
            },
          );
        },

        statusFind: (statusSession, session) => {
          console.log('Status Session: ', statusSession); // return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
          // Create session wss return "serverClose" case server for close
          console.log('Session name: ', session);
        },
        logQR: false,
      })
      .then((client) => {
        console.log(client);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  viewsQr(qr) {
    return qr;
  }

  start(cliente) {
    cliente.onStateChange((state) => {

    });
  }
}
