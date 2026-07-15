export default class KeyboardInput{
    constructor(inputController){
        this.inputController = inputController;
        this.listeners  ={
            keyDown: this.listeners.bind(this)
        };
    }
    listeners(e){
        switch(e.keyCode){
            case 37:
            case 65:
            case 72:
                e.preventDefault();
                this.inputController.left();
                break;
            case 40:
            case 74:
            case 83:
                e.preventDefault();
                this.inputController.down();
                break;
            case 38:
            case 75:
            case 87:
                e.preventDefault();
                this.inputController.up();
                break;
            case 39:
            case 68:
            case 76:
                e.preventDefault();
                this.inputController.right();
                break;
        }
    }
}