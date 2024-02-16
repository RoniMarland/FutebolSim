import { createNewHTMLElement } from "./constructor.js";

export async function loadClubData(){
    try{
        const response = await fetch('jsonFiles/clubs.json');
        const clubData = await response.json();
        console.log('Clubes Carregados function loadClubData', clubData);
        return clubData;
    } catch (error) {
        console.log('Erro');
    };
};



export function createNewGame(clubData, onGameSave) {

    let selectedClub = null;
    let managerName = '';
    let gameSave = null;


    const createNewGame = new createNewHTMLElement('div', 'createNewGame');

    let t = new createNewHTMLElement('h5', '');
    t.textContent = 'Nome do Treinador';

    const inputManagerName = new createNewHTMLElement('input', 'inputManagerName');
    inputManagerName.type = 'text';

    createNewGame.appendChild(t);
    createNewGame.appendChild(inputManagerName);
    homeContainer.appendChild(createNewGame);

    inputManagerName.addEventListener('input', function() {
        managerName = inputManagerName.value;
        t.textContent = managerName;
    });

    const startGameBtn = new createNewHTMLElement('button', 'startGameBtn');
    startGameBtn.textContent = 'Start Game';
    createNewGame.appendChild(startGameBtn);

    startGameBtn.addEventListener('click', function() {
        if (selectedClub && managerName !== '') {
            console.log('Start:', selectedClub.name);
            console.log('Start:', managerName);
            gameSave = [selectedClub, managerName];
            console.log(gameSave);
            App.removeChild(homeContainer);    
            
            const h1TimeOut = new createNewHTMLElement('h1', 'h1TimeOut');
            document.body.appendChild(h1TimeOut);

            let secondsLeft = 3;

            function updateTimer(){

                if(selectedClub.colors === '#000000'){
                    h1TimeOut.style.color = 'white';
                } else {
                    h1TimeOut.style.color = '#000000';
                }

                h1TimeOut.textContent = `Aguarde o jogo vai começar em ${secondsLeft} segundos`;

                if(secondsLeft > 0){
                    secondsLeft--;
                    setTimeout(updateTimer, 1000);
                    onGameSave(gameSave);
                } else {
                    document.body.removeChild(h1TimeOut);
                }
            };


            updateTimer();
    
        } else {
            alert('Por favor, selecione um clube e insira o nome do treinador.');
        }
        return gameSave;
    });
    

    const btnSelectTeam = document.querySelectorAll('.clubSelectBtn');

    btnSelectTeam.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            selectedClub = clubData.clubes[index];
            if (selectedClub) {
                console.log('Clube selecionado:', selectedClub.name);
            } else {
                console.log("Clube não encontrado com o índice:", index);
            }
        });
    });
    return function(){
        return gameSave;
    };
}






export function clubSelectionBtn(clubData){

    const homeContainer = document.querySelector('.homeContainer');
    const teamSelection = new createNewHTMLElement('div', 'teamSelection');

    clubData.clubes.forEach((club, i) => {

        const clubSelectBtn = new createNewHTMLElement('button', 'clubSelectBtn', i);
        const clubSelectBtnImg = new createNewHTMLElement('img', 'clubSelectBtnimg');
        
        clubSelectBtnImg.src = club.image;

        clubSelectBtn.appendChild(clubSelectBtnImg);
        teamSelection.appendChild(clubSelectBtn);
        homeContainer.appendChild(teamSelection);

    });    

};


export function loadHUD(){

    const hudContainer = new createNewHTMLElement('div', 'hudContainer', 'hudContainer');
    App.appendChild(hudContainer);

    const hudContainerColumn1 = new createNewHTMLElement('div', 'hudContainerColumn1', 'hudContainerColumn1');
    const hudContainerColumn2 = new createNewHTMLElement('div', 'hudContainerColumn2', 'hudContainerColumn2');

    hudContainer.appendChild(hudContainerColumn1);
    hudContainer.appendChild(hudContainerColumn2);

    const navBar = new createNewHTMLElement('div', 'navBar', 'navBar');
    const sideBar = new createNewHTMLElement('div', 'sideBar', 'sideBar');
    const mainContent = new createNewHTMLElement('div', 'mainContent', 'mainContent');

    hudContainerColumn2.appendChild(navBar);
    hudContainerColumn2.appendChild(mainContent);

};