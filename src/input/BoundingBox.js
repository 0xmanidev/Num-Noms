export default class BoundingBox{
    constructor(x,y,width,length){
        this.topLeft = {
            x,
            y
        };
        this.bottomRight ={
            x:x+width,
            y:y+length
        };
    }
}