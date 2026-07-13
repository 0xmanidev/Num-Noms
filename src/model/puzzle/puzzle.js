export default class Puzzle{
    constructor(number,board){
        this.number = number;
        this.orginal = number;
        this.board = board;
        this.currentRow = 0;
        this.history = [];
    }
    play(number){
        this.assertOngoing();
        const index = this.board.get(this.currentRow).indexOf(number);
        if(index<0){
            throw new Error("Number is not currently an option");
        }
        return this.playIndex(index);
    }
    playIndex(index){
        this.assertOngoing();
        if(!(index in this.board.get(this.currentRow))){
            throw new Error("Index not available for play")
        }
        const number = this.board.get(this.currentRow,index);
        if(this.number%number% number === 0){
            this.number/=number;
        }else{
            this.number+=number;
        }

        this.currentRow++;
        this.history.push(index);    
    }
    reset(){
        this.history = [];
        this.number = this.orginal;
        this.currentRow = 0;
    }
    state(){}
    isComplete(){}
    assertOngoing(){}
}