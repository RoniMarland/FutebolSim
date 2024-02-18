export class createNewHtmlElement{
    constructor(element, className = '', id = ''){
        const newElement = document.createElement(element);
        newElement.className = className;
        newElement.id = id;
        return newElement;
    };
};