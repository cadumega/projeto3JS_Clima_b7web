// Iremos pegar os dados de API da OpenWeather openweathermap.org
// Entender como o html funciona
// prevenir do formulario ser enviado, se nao a página atualiza
// requisicao interna , criar uma funcao de aviso

// ao colocar async irei usar code nao ordenado

// Montar requisicao ao site OpenWeather, ira devolver JSON com informações da cidade. Ter o cadastro no site.
// Verificar documentação das inf meteorológicas do lugar na API call.
// encode para corrigir o processo de string e pegar a hash da API key para poder consultar.

document.querySelector('.busca').addEventListener('submit',async (event)=> {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    
    if(input !== '') {
        clearInfo();
        showWarning('Carregando...');

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`); //faz a req e espera o resultado, onde sera armazenado
        let json = await results.json(); // pega o resultado e transforma em json para guardar

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }
    } else {
        clearInfo();
    }
});


function showInfo(obj) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`;
    
    document.querySelector('.tempInfo').innerHTML = `${obj.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', 
    `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

