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

    isPointWithin(x, y) {
        return (
            x >= this.topLeft.x &&
            x <= this.bottomRight.x &&
            y >= this.topLeft.y &&
            y <= this.bottomRight.y
        );
    }
}