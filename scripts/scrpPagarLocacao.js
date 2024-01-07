document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const veiculoId = urlParams.get('veiculoId');
    const seguroId = urlParams.get('seguroId');
    const dataInicio = urlParams.get('dataInicio');
    const dataFinal = urlParams.get('dataFinal');
    const token = localStorage.getItem('token');

    // Verificar se o token existe, caso contrário, redirecionar para a página de login
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    fetch(`http://localhost:5000/car/${veiculoId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('vehicleImage').src = `http://localhost:5000/${data.carro.foto}`;
            document.getElementById('valorLocacaoValue').innerText = `${data.carro.valor}`;
            // Atualize outros campos do veículo, se necessário
        })
        .catch(error => {
            console.error('Erro ao buscar detalhes do veículo:', error);
        });

    fetch(`http://localhost:5000/secure/${seguroId}`)
        .then(response => response.json())
        .then(seguroData => {
            document.getElementById('seguroValue').innerText = `${seguroData.secure.valorCobertura}`;
            // Atualize outros campos do seguro, se necessário
        })
        .catch(error => {
            console.error('Erro ao buscar detalhes do seguro:', error);
        });

    document.getElementById('dataRetirarValue').innerText = dataInicio;
    document.getElementById('dataDevolverValue').innerText = dataFinal;
});

function confirmarLocacao() {
    const urlParams = new URLSearchParams(window.location.search);
    const veiculoId = urlParams.get('veiculoId');
    const seguroId = urlParams.get('seguroId');
    const dataInicio = urlParams.get('dataInicio');
    const dataFinal = urlParams.get('dataFinal');
    const token = localStorage.getItem('token');

    // Verificar se o token existe, caso contrário, redirecionar para a página de login
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const requestBody = {
        seguro: seguroId,
        dataInicioLocacao: dataInicio,
        dataTerminoLocacao: dataFinal
    };

    // Adicione o código para realizar a requisição POST
    fetch(`http://localhost:5000/car/rent/${veiculoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (response.ok) {
            // Redirecionar em caso de sucesso
            window.location.href = 'minhasLocacoes.html';
        } else {
            // Lidar com erro na resposta
            return response.json().then(errorData => Promise.reject(errorData));
        }
    })
    .catch(errorData => {
        // Mostrar erro no HTML
        const errorMessage = errorData && errorData.message ? errorData.message : 'Erro ao confirmar locação.';
        mostrarErroHtml(errorMessage);
    });
}

function mostrarErroHtml(errorMessage) {
    // Adicione código para mostrar a mensagem de erro no HTML
    const errorDiv = document.getElementById('classePrincipal');
    errorDiv.innerHTML = `<div class="alert alert-danger">${errorMessage}</div>`;
}
