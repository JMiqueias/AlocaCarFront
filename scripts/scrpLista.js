document.addEventListener("DOMContentLoaded", function () {
    const carTable = document.getElementById('carTable');

    fetch('http://localhost:5000/car?disponivel=true')
        .then(response => response.json())
        .then(data => {
            const carros = data.carros || []; // Verifica se existe a chave 'carros' na resposta
            carros.forEach(carro => {
                const row = document.createElement('tr');

                // Cria links para a página 'informacoes-veiculo.html' ao redor da imagem e do nome do veículo
                const imagemLink = document.createElement('a');
                imagemLink.href = `informacoes-veiculo.html?id=${carro.id}`;
                imagemLink.innerHTML = `<img src="http://localhost:5000/${carro.foto}" width="130" height="80">`;

                const nomeVeiculoLink = document.createElement('a');
                nomeVeiculoLink.href = `informacoes-veiculo.html?id=${carro.id}`;
                nomeVeiculoLink.textContent = carro.nome;

                // Cria as células da tabela e adiciona os links
                const cellImagem = document.createElement('td');
                cellImagem.appendChild(imagemLink);

                const cellNome = document.createElement('td');
                cellNome.appendChild(nomeVeiculoLink);

                // Adiciona as células à linha da tabela
                row.appendChild(cellImagem);
                row.appendChild(cellNome);
                row.innerHTML += `
                    <td>${carro.tipo}</td>
                    <td>${carro.categoria}</td>
                    <td>${carro.valor}</td>
                `;
                carTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar dados dos veículos:', error);
        });
});
