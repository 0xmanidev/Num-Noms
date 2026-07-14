export default class HSL{
    constructor(h,s,l,a=1){
        this.h = h;
        this.s = s;
        this.l= l;
        this.a = a;
    }
    static complement(hsl){
        return new HSL(
            (hsl.h+180)%360,
            hsl.s,
            hsl.l,
            hsl.a
        );
    }
    clone(){
        return new HSL(
            this.h,
            this.s,
            this.l,
            this.a
        );
    }
    toString(){
        return `hsla(${this.h},${this.s}%,${this.l}%,${this.a})`
    }
}