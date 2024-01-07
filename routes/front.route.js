const routes = require("express").Router();
const frontController = require("../controllers/front.controller");

// Rota para a página inicial (Home)
routes.get("/", frontController.getHome);

// Rota para a página de informações do veículo
routes.get("/informacoes-veiculo", frontController.getInformacoesVeiculo);

// Rota para a página da lista de veículos
routes.get("/lista", frontController.getLista);

// Rota para a página de login
routes.get("/login", frontController.getLogin);

// Rota para a página de "Minhas Locações"
routes.get("/minhasLocacoes", frontController.getMinhasLocacoes);

// Rota para a página de pagamento de locação
routes.get("/pagarLocacao", frontController.getPagarLocacao);

// Rota para a página de cadastro de usuario
routes.get("/cadastroUsuario", frontController.getcadastroUsuario);

module.exports = routes;
