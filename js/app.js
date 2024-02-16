const App = document.getElementById('App');



const container = document.createElement('div');
container.className = 'container';
App.appendChild(container);


let clubData = null;

async function loadClubData(){
    try{
        const response = await fetch('jsonFiles/clubs.json');
        clubData = await response.json();
        console.log('Clubes Carregados function loadClubData', clubData);
    } catch (error) {
        console.log('Erro');
    }
};

await loadClubData()
console.log(clubData);



class Club {
    constructor(name, state, players, image){
        this.name = name;
        this.state = state;
        this.players = players|| [];
        this.image = image;

    }
};


let clubGroup = [];


async function createClubs(clubData){

    const teamSelectBox = document.createElement('div');
    const choosedClub = document.createElement('h4');
    choosedClub.innerText = 'Clube Seleciona';
    choosedClub.id = 'choosedClub'

    teamSelectBox.className = 'teamSelectBox';
    App.appendChild(teamSelectBox);
    container.appendChild(choosedClub);


    clubData.clubes.forEach((club, i) => {

        const newClub = new Club(club.name, club.state, club.players, club.image);

        const clubSelectionBtn = document.createElement('button');

        clubSelectionBtn.className = 'clubSelectionBtn';

        const clubImgBtnSelection = document.createElement('img');        

        clubSelectionBtn.id = i;
        clubImgBtnSelection.src = club.image;

        clubSelectionBtn.appendChild(clubImgBtnSelection);

        teamSelectBox.appendChild(clubSelectionBtn); 
        
        clubGroup.push(newClub);

        clubSelectionBtn.addEventListener('click', function() {   // Correção aqui
            document.getElementById('choosedClub').textContent = club.name;
            // selectedTeam = newClub;
            // console.log(this.id);
        });

    });
};



createClubs(clubData);
console.log('Clubes criados e adicionados ao jogo',clubGroup);




let managerName = null;
let selectedData = null;

function createNewGame() {
    return new Promise((resolve, reject) => {
        const inputManagerName = document.createElement('input');
        inputManagerName.id = 'nameManagerId';
        container.appendChild(inputManagerName);

        const managerNameInput = document.getElementById('nameManagerId');
        managerNameInput.addEventListener('input', function () {
            managerName = managerNameInput.value;
            console.log(managerName);
        });

        const startGameBtn = document.createElement('button');
        startGameBtn.id = 'startGameBtn';
        startGameBtn.innerText = 'Iniciar o Jogo';
        container.appendChild(startGameBtn);
        startGameBtn.addEventListener('click', function(){
            // Obter dados selecionados
            selectedData = {
                managerName: managerNameInput.value,
                teamSelected: teamSelected // Certifique-se de definir teamSelected em outro lugar
            };

            const k = document.querySelector('.container');
            const l = document.querySelector('.teamSelectBox');
           

            // Resolve a promessa com os dados selecionados
            resolve(selectedData);


            if(managerName === null && teamSelected === null){
                alert('Escolha um time e coloque seu nome');

            } else {
                k.remove();
                l.remove();
            }
            
            
        });
    });
}
export { selectedData };

// Exemplo de uso da função createNewGame
createNewGame()
    .then(data => {
        // Os dados selecionados estão disponíveis aqui
        console.log('Dados selecionados:', data);
        // Agora você pode fazer o que quiser com os dados, como enviá-los para o servidor, etc.
    })
    .catch(error => {
        console.error('Ocorreu um erro:', error);
    });



let teamSelected;
const clubSelectionBtn = document.querySelectorAll('.clubSelectionBtn');

clubSelectionBtn.forEach(function(button){
    button.addEventListener('click', function(){
        console.log('ID do botão clicado:', this.id);
        teamSelected = this.id;
        console.log(teamSelected);
        return teamSelected;
    });

});