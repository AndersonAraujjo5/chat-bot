import server from './app';

const porta = 3000;
server.listen(porta, () => {
  console.log('executando...');
  console.log('http://localhost:3000');
});
