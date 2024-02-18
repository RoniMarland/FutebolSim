// Função para gerar dados aleatórios de jogadores
function generateRandomPlayer(name) {
    const positions = {
        first: getRandomPositions(),
        second: getRandomPositions(),
        third: getRandomPositions(),
    };

    return {
        name: name,
        positions: positions,
        age: getRandomNumber(18, 35),
        overall: getRandomNumber(70, 90),
    };
};

// Função para gerar posições aleatórias
function getRandomPositions() {
    const positions = [2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28];
    const randomPositions = [];

    for (let i = 0; i < getRandomNumber(1, 5); i++) {
        const randomIndex = getRandomNumber(0, positions.length - 1);
        const position = positions.splice(randomIndex, 1)[0];
        randomPositions.push(position);
    }

    return randomPositions;
}

// Função para gerar dados aleatórios de um clube
function generateRandomClub() {
    const club = {
        colors: getRandomColor(),
        name: getRandomClubName(),
        state: getRandomState(),
        players: [],
        image: getRandomImage(),
    };

    for (let i = 0; i < getRandomNumber(11, 15); i++) {
        club.players.push(generateRandomPlayer(`Player${i + 1}`));
    }

    return club;
}

// Função para gerar uma cor aleatória em formato hexadecimal
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Função para gerar um nome de clube aleatório
function getRandomClubName() {
    const clubNames = ['Flamengo', 'Palmeiras', 'Santos', 'Corinthians', 'São Paulo', 'Grêmio', 'Internacional', 'Cruzeiro', 'Atlético-MG', 'Fluminense'];
    return clubNames[getRandomNumber(0, clubNames.length - 1)];
}

// Função para gerar um estado aleatório
function getRandomState() {
    const states = ['Rio de Janeiro', 'São Paulo', 'Minas Gerais', 'Rio Grande do Sul', 'Bahia', 'Paraná', 'Santa Catarina', 'Ceará', 'Pernambuco'];
    return states[getRandomNumber(0, states.length - 1)];
}

// Função para gerar uma imagem aleatória
function getRandomImage() {
    const images = ['img/escudos/fla.png', 'img/escudos/pal.png', 'img/escudos/san.png', 'img/escudos/cor.png', 'img/escudos/sao.png'];
    return images[getRandomNumber(0, images.length - 1)];
}

// Função para gerar um número aleatório em um intervalo específico
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função principal para gerar um arquivo JSON com dados aleatórios
export function generateRandomData() {
    const data = {
        clubs: [],
    };

    for (let i = 0; i < 120; i++) {
        data.clubs.push(generateRandomClub());
    }

    const jsonString = JSON.stringify(data, null, 2);

    // Salvar os dados no localStorage
    localStorage.setItem('dbFS', jsonString);

    // Log no console (para fins de demonstração, remova em produção)
    // console.log(jsonString);

    console.log('Dados salvos no localStorage com sucesso!');
    return data;
}
