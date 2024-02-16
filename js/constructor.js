export class createNewHTMLElement{

    constructor(elementType, elementClass, id = ''){
        const newElement = document.createElement(elementType);
        newElement.className = elementClass;
        newElement.id = id;
        return newElement;
    };

};

class Club {
    constructor(name, state, players, image){
        this.name = name;
        this.state = state;
        this.players = players|| [];
        this.image = image;

    }
};