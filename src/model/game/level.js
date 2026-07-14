export default class Level{
    constructor(puzzle,palette){
        this.puzzle = puzzle;
        this.palette = palette;
        this.index = Math.floor(puzzle.board.columns /2);
    }
    getNumber(){
        return this.puzzle.original;
    }
}