export default class RGB{
    constructor(h,s,l,a=1){
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