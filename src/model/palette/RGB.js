export default class RGB{
    constructor(r,g,b,a=1){
        this.r = r;
        this.g = g;
        this.b= b;
        this.a = a;
    }
    clone(){
        return new RGB(
            this.r,
            this.g,
            this.b,
            this.a
        )
    }
    toString(){
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
}