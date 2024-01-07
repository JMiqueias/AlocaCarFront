document.getElementById('btnCadastrar').addEventListener('click', function () {
    // Limpa a mensagem de erro
    document.getElementById('mensagemErroCadastro').style.display = 'none';

    // Obtém os valores do formulário
    var nome = document.querySelector("input[name='nome']");
    var email = document.querySelector("input[name='email']");
    var numero = document.querySelector("input[name='numero']");
    var cidade = document.querySelector("input[name='cidade']");
    var estado = document.querySelector("input[name='estado']");
    var senha = document.querySelector("input[name='senha']");

    // Verifica se os campos foram encontrados
    if (!nome || !email || !numero || !cidade || !estado || !senha) {
        console.error('Erro: Campos do formulário não encontrados.');
        return;
    }

    // Monta os dados a serem enviados
    var dados = {
        name: nome.value,
        email: email.value,
        number: numero.value,
        city: cidade.value,
        state: estado.value,
        password: senha.value
    };

    // Envia a requisição POST para http://localhost:5000/user/ usando fetch
    fetch('http://localhost:5000/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => {
        if (!response.ok) {
            // Se a resposta não estiver OK, mostra a mensagem de erro
            document.getElementById('mensagemErroCadastro').style.display = 'block';
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data => {
        // Tratar a resposta do servidor, se necessário
        console.log('Cadastro realizado com sucesso', data);
        // Redirecionar ou exibir uma mensagem de sucesso
		// Redireciona para a página de login após um cadastro bem-sucedido
		window.location.href = "/login";
    })
    .catch(error => {
        // Trate os erros, se necessário
        console.error("Erro ao cadastrar: ", error);
    });
});
