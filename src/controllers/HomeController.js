import io from 'socket.io';
import VenomBot from '../models/VenomBot';

class HomeController {
  index(req, res) {
    const venom = new VenomBot();
    venom.createSession('teste 2');
    res.send('<img src="image/qr.png"></img>');
  }
}

export default new HomeController();
