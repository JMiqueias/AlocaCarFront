function displaySeguroDescription() {
    const seguroSelect = document.getElementById('seguro');
    const seguroDescription = document.getElementById('seguroDescription');
    const selectedOption = seguroSelect.options[seguroSelect.selectedIndex];

    seguroDescription.innerText = selectedOption.getAttribute('data-description');
}

function redirecionarParaPagarLocacao() {
    const seguroSelect = document.getElementById('seguro');
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFinal = document.getElementById('dataFinal').value;
    const veiculoId = new URLSearchParams(window.location.search).get('id'); // Obter o ID do veículo da URL

    const seguroSelecionado = seguroSelect.options[seguroSelect.selectedIndex].value; // Obter o ID do seguro selecionado

    // Redirecionamento para pagarLocacao.html passando parâmetros via URL
    window.location.href = `pagarLocacao.html?veiculoId=${veiculoId}&seguroId=${seguroSelecionado}&dataInicio=${dataInicio}&dataFinal=${dataFinal}`;
    return false; // Evitar que o formulário faça o envio tradicional
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const veiculoId = urlParams.get('id');

    if (veiculoId) {
        // Buscar informações do veículo
        fetch(`http://localhost:5000/car/${veiculoId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('vehicleImage').src = `http://localhost:5000/${data.carro.foto}`;
                document.getElementById('vehicleName').innerText = data.carro.nome;
                document.getElementById('vehicleBrand').innerText = data.carro.tipo;
                document.getElementById('vehicleCategory').innerText = data.carro.categoria;
                document.getElementById('vehiclePrice').innerText = data.carro.valor;

                // Buscar opções de seguros
                fetch('http://localhost:5000/secure')
                    .then(response => response.json())
                    .then(segurosData => {
                        const seguroSelect = document.getElementById('seguro');
                        segurosData.forEach(seguro => {
                            const option = document.createElement('option');
                            option.value = seguro.id_seguro;
                            option.text = `${seguro.nome} R$${seguro.preco}`;
                            option.setAttribute('data-description', seguro.descricao);
                            seguroSelect.appendChild(option);
                        });
                    })
                    .catch(error => {
                        console.error('Erro ao buscar opções de seguros:', error);
                    });
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API do veículo:', error);
            });
    } else {
        console.error('ID do veículo não encontrado na URL');
    }
});
