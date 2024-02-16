const App = document.getElementById('App');
let gameCondititon = true;
let clubData = null;

async function loadClubData() {
    try {
        const response = await fetch('jsonFiles/clubs.json');
        clubData = await response.json();
        console.log('Clubes Carregados function loadClubData', clubData);
    } catch (error) {
        console.log('Erro');
    }
};



class newDiv {
    constructor(divClass, divId, parentToAppend) {
        const newDiv = document.createElement('div');
        newDiv.className = divClass;
        newDiv.id = divId;
        parentToAppend.appendChild(newDiv);
    };
};




async function formation(players) {
    const App = document.getElementById('App');

    const taticFieldContainer = document.createElement('div');
    taticFieldContainer.className = 'taticContainer';
    taticFieldContainer.id = 'taticFieldContainer';
    App.appendChild(taticFieldContainer);

    const selectTatic = document.createElement('select');
    const taticOptions = ['Seleciona uma tatica', 'Tática 442', 'Tática 433', 'Tática 352'];



    const taticArrays = {
        'Tática 442': [
            { id: 2 },
            { id: 5 },
            { id: 6 },
            { id: 8 },
            { id: 9 },
            { id: 15 },
            { id: 16 },
            { id: 18 },
            { id: 19 },
            { id: 26 },
            { id: 28 },
        ],
        'Tática 433': [
            { id: 2 },
            { id: 5 },
            { id: 6 },
            { id: 8 },
            { id: 9 },
            { id: 12 },
            { id: 16 },
            { id: 18 },
            { id: 20 },
            { id: 24 },
            { id: 27 },
        ],
        'Tática 352': [
            { id: 2 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 14 },
            { id: 10 },
            { id: 18 },
            { id: 16 },
            { id: 22 },
            { id: 28 },
            { id: 26 },
        ],
    };

    taticOptions.forEach((tatic, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = tatic;
        selectTatic.appendChild(option);
    });

    App.appendChild(selectTatic);

    const numPositions = 30;
    const positionsOnPitch = [];


    // criando posicoes no campo
    for (let i = 0; i < numPositions; i++) {
        positionsOnPitch.push({
            id: i,
            positionName: '',
            playerIdPosition: null,
        });

        // Cria o elemento da posição
        const positionDiv = document.createElement('div');
        positionDiv.className = 'position';
        positionDiv.textContent = `Pposição ${i}`;
        positionDiv.id = `position-${i}`;


        // Insere positionDiv no início do taticFieldContainer
        taticFieldContainer.insertBefore(positionDiv, taticFieldContainer.firstChild);
    }



    // Objeto para rastrear quais jogadores já foram posicionados em cada posição
    const playerPositions = {};

    // Função para limpar a tática
    function clearTactic() {
        for (let i = 0; i < numPositions; i++) {
            const positionDiv = taticFieldContainer.querySelector(`#position-${i}`);
            positionDiv.textContent = `Posição ${i}`;
            positionDiv.style.backgroundColor = '';
            positionDiv.style.color = '';
            positionsOnPitch[i].positionName = '';
            positionsOnPitch[i].playerIdPosition = null;
        }

        // Reinicia o rastreamento das posições dos jogadores
        for (const positionId of Object.keys(playerPositions)) {
            playerPositions[positionId] = null;
        }
    };



    // Botão para limpar a tática
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Limpar Tática';
    clearButton.addEventListener('click', clearTactic);
    App.appendChild(clearButton);

    // Botão para salvar a tática selecionada com os jogadores
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Salvar Tática';
    saveButton.addEventListener('click', () => {
        saveTactic(selectedTactic, playerPositions);
    });

    App.appendChild(saveButton);









    let selectedTactic = null;

    // Adicionando o event listener para selecionar a tática
    selectTatic.addEventListener('change', (event) => {
        selectedTactic = event.target.value;

        if (selectedTactic !== '0') {
            // Limpa a tática antes de posicionar novos jogadores
            clearTactic();

            const selectedTacticName = taticOptions[selectedTactic];
            const selectedTacticArray = taticArrays[selectedTacticName];

            selectedTacticArray.forEach((tacticPosition) => {
                let bestPlayer = null;
                let bestOverall = 0;

                players.forEach((player) => {
                    const { first, second, third } = player.positions;

                    if (first.includes(tacticPosition.id)) {
                        const playerOverall = player.overall;
                        if (!bestPlayer || playerOverall > bestOverall) {
                            const isPlayerAlreadyPositioned = Object.values(playerPositions).includes(player);
                            if (!isPlayerAlreadyPositioned) {
                                bestPlayer = player;
                                bestOverall = playerOverall;
                            }
                        }
                    } else if (second.includes(tacticPosition.id)) {
                        if (!bestPlayer) {
                            bestPlayer = player;
                        } else if (second.includes(tacticPosition.id) && !bestPlayer.positions.first.includes(tacticPosition.id)) {
                            bestPlayer = player;
                        }
                    } else if (third.includes(tacticPosition.id)) {
                        if (!bestPlayer) {
                            bestPlayer = player;
                        } else if (third.includes(tacticPosition.id) && !bestPlayer.positions.first.includes(tacticPosition.id) && !bestPlayer.positions.second.includes(tacticPosition.id)) {
                            bestPlayer = player;
                        }
                    }
                });

                if (bestPlayer) {
                    const positionDiv = taticFieldContainer.querySelector(`#position-${tacticPosition.id}`);
                    let backgroundColor = '';

                    if (bestPlayer.positions.first.includes(tacticPosition.id)) {
                        backgroundColor = '#0fd80f';
                    } else if (bestPlayer.positions.second.includes(tacticPosition.id)) {
                        backgroundColor = 'yellow';
                    } else if (bestPlayer.positions.third.includes(tacticPosition.id)) {
                        backgroundColor = 'red';
                    }

                    positionDiv.style.backgroundColor = backgroundColor;
                    positionDiv.style.color = 'white';

                    if (tacticPosition.id > 0 && tacticPosition.id <= numPositions) {
                        const playerPositionDiv = document.createElement('div');
                        playerPositionDiv.draggable = true;
                        positionDiv.draggable = true;
                        playerPositionDiv.id = tacticPosition.id;
                        playerPositionDiv.textContent = `Posição ${tacticPosition.id}: ${bestPlayer.name}`;
                        positionDiv.appendChild(playerPositionDiv);
                        playerPositions[tacticPosition.id] = bestPlayer;
                    }

                   
                }
            });
        }
    });

    

    // Função para salvar a tática selecionada com os jogadores
    function saveTactic(selectedTactic, playerPositions) {
        if (selectedTactic !== null) {
            const savedFormation = {
                tactic: taticOptions[selectedTactic],
                players: Object.values(playerPositions)
            };
            console.log('Tática selecionada e jogadores salvos:', savedFormation);
            // Aqui você pode fazer o que quiser com a variável savedFormation
        } else {
            console.log('Nenhuma tática selecionada.');
        }
    }


    return positionsOnPitch;
}





































async function gameLoop() {

    await loadClubData();
    console.log(clubData);

    console.log(formation(clubData.clubes[1].players));



}

gameLoop();