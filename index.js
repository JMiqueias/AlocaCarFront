// Importando bibliotecas
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// Configuração do dotenv - variáveis de ambiente
dotenv.config();

// Rota com o frontend
const routes = require("./routes/front.route");

// Propriedades do servidor
const app = express();
const port = process.env.PORT || 80;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

app.use(express.static(__dirname + '/src/views'));
app.use(express.static(__dirname + '/src/views/scripts'));
app.use(express.static(__dirname + '/src/views/img'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas do frontend
app.use(cors());
app.use(routes);

// Pegando o IP
const os = require('os');
const interfaces = os.networkInterfaces();
const addresses = [];
for (const k in interfaces) {
    for (const k2 in interfaces[k]) {
        const address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

// Cria um servidor HTTP e escuta requisições na porta definida
app.listen(port, () => {
    // Imprime no console a URL de acesso ao servidor
    console.log('FrontEnd executando em: ' + addresses + ':' + port + '');
});
