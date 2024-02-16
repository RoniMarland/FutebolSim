import { createNewHTMLElement } from "./constructor.js";
import { loadClubData, createNewGame, clubSelectionBtn, loadHUD } from "./functions.js";
import { paintBgHome } from "./coreFunctions.js";


const App = document.getElementById('App');
const homeContainer = new createNewHTMLElement('div', 'homeContainer', 'homeContainer');

App.appendChild(homeContainer);


async function gameloop() {
    let clubData = null;
    let clubGroup = [];

    // Carrega a base de dados dos clubes
    clubData = await loadClubData();
    console.log(clubData);

    clubGroup = clubData.clubes;
    console.log(clubGroup);

    clubSelectionBtn(clubData);
    paintBgHome(clubData);

    let savedGame = await new Promise((resolve) => {
        function onGameSaveCallBack(gameSave) {
            console.log('Jogo Salvo', gameSave);
            resolve(gameSave);
        }
        createNewGame(clubData, onGameSaveCallBack);
    });

    console.log(savedGame);

    if (savedGame === null) {
        console.log('Nenhum jogo salvo');
    } else {
        setTimeout(() => {
            loadHUD();
        }, 3000);
    }
}

gameloop();
