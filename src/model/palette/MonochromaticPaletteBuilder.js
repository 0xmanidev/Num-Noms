import HSL from "./HSL";

export default class MonochromaticPaletteBuilder{
    constructor(hue,saturation,alpha=1){
        this.hue = hue;
        this.saturation = saturation;
        this.alpha = alpha;
    }
    build(count,range){
        if(count<1){
            throw new Error("Count cannot be less than 1.")
        }
        const maxRange = 100;
        if(range>maxRange){
            range=maxRange;
        }
        const min = (maxRange-range)/2;
        const{hue:h,saturation:s,alpha:a}=this;
        const interval = range /(count-1);
        const palette =[];
        for(let c = count-1;c>=0;c--){
            palette.push(
                new HSL(
                    h,
                    s,
                    Math.floor(interval*c+min),
                    a
                )
            );
        }
        return palette;
    }
}