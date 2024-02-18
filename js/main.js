import { createHUD, loadGameData } from './core/coreFunctions.js'
import { createNewHtmlElement } from './helpers/constructors.js';
import { generateRandomData } from './helpers/rcpg.js'


createHUD();

function homePage(){
    
    if(newGame = true){
        loadGameData(startGame());
        
    } else if (loadGame = true){
        loadGameData();
    }


};



function startGame(){


    console.log("Jogo iniciado!");

    gameLoop()

};


function gameLoop(){

    console.log('gameloop')
    console.log(generateRandomData())


};


