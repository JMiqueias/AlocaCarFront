$(".alert-danger").hide();

document.getElementById('btnEntrar').addEventListener('click', function () {
    // Limpa a mensagem de erro
    $(".alert-danger").hide();

    // Obtém os valores de email e senha do formulário
    var email = document.querySelector("input[type='email']").value;
    var senha = document.querySelector("input[type='password']").value;

    // Monta os dados a serem enviados
    var dados = {
        email: email,
        password: senha
    };

    // Envia a requisição POST para http://localhost:5000/auth/ usando fetch
    fetch('http://localhost:5000/auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => {
        if (!response.ok) {
            // Se a resposta não estiver OK, mostra a mensagem de erro
            $(".alert-danger").show();
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data => {
        // Verifica se a resposta contém um erro
        if (data.error) {
            // Se a resposta contiver um erro, mostra a mensagem de erro
            $(".alert-danger").show();
            throw new Error('Erro durante o login');
        }

        // Armazena o token retornado no localStorage
        localStorage.setItem('token', data.token);

        // Redireciona para a página desejada, se necessário
        window.location.href = "minhasLocacoes.html";
    })
    .catch(error => {
        // Trate os erros, se necessário
        console.error("Erro ao fazer login: ", error);
    });
});
