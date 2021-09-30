// Iremos pegar os dados de API da OpenWeather openweathermap.org
// Entender como o html funciona
// prevenir do formulario ser enviado, se nao a página atualiza
// requisicao interna , criar uma funcao de aviso


document.querySelector('.busca').addEventListener('submit', (event)=> {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

        if(input !== '') {
            showWarning('Carregando...')
        }
});


function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}