document.addEventListener("DOMContentLoaded", function () {
    // Verifica se o token está presente no localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        // Redireciona para a página de login se o token não estiver presente
        window.location.href = 'login.html';
        return;
    }

    const apiUrl = 'http://localhost:5000/car/byUser';

    // Configuração do cabeçalho da requisição com o token
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    fetch(apiUrl, {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .then(data => {
        const listaVeiculos = document.getElementById('listaVeiculos');

        // Limpa o conteúdo atual da tabela
        listaVeiculos.innerHTML = '';

        data.carros.forEach(carro => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${carro.nome}</td>
                <td>${carro.tipo}</td>
                <td>${carro.categoria}</td>
                <td>${carro.valor}</td>
            `;
            listaVeiculos.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar carros locados:', error);
    });

    // Evento de clique no link de logout
    const logoutLink = document.getElementById('logoutLink');
    logoutLink.addEventListener('click', function () {
        // Remove o token do localStorage
        localStorage.removeItem('token');
        // Redireciona para a página de login após o logout
        window.location.href = 'home.html';
    });
});
