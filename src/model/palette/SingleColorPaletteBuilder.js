export default class SingleColorPaletteBuilder{
    constructor(color){
        this.color = color;
    }
    build(count){
        const palette =[];
        for(let i = 0;i<count;i++){
            palette.push(this.color.clone());
        }
        return palette;
    }
}