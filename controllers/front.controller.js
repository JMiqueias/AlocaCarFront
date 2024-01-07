const getHome = (req, res) => {
    // Sua lógica para renderizar a tela Home aqui
    res.render('home'); // Renderiza a página home
};

const getInformacoesVeiculo = (req, res) => {
    // Sua lógica para renderizar a tela de informações do veículo aqui
    res.render('informacoes-veiculo'); // Renderiza a página de informações do veículo
};

const getLista = (req, res) => {
    // Sua lógica para renderizar a tela de lista aqui
    res.render('lista'); // Renderiza a página de lista
};

const getLogin = (req, res) => {
    // Sua lógica para renderizar a tela de login aqui
    res.render('login'); // Renderiza a página de login
};

const getMinhasLocacoes = (req, res) => {
    // Sua lógica para renderizar a tela de minhas locações aqui
    res.render('minhasLocacoes'); // Renderiza a página de minhas locações
};

const getPagarLocacao = (req, res) => {
    // Sua lógica para renderizar a tela de pagar locação aqui
    res.render('pagarLocacao'); // Renderiza a página de pagar locação
};

const getcadastroUsuario = (req, res) => {
    // Sua lógica para renderizar a tela de pagar locação aqui
    res.render('cadastroUsuario'); // Renderiza a página de cadastro
};

module.exports = {
    getHome,
    getInformacoesVeiculo,
    getLista,
    getLogin,
    getMinhasLocacoes,
    getPagarLocacao,
    getcadastroUsuario,
};
