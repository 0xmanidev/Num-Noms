export default class XSPRNG{
    constructor(seed){
        this.seed(seed);
        this.max = 0x7FFFFFFF + 1;
    }
    seed(seed){
        if((seed^0)!==seed){
            throw new Error("Seed should be integer")
        }
        this.original = seed;
        this.previous = seed;
    }
    random(){
        const next = XSPRNG.xorshift32plusstar(this.previous);
        this.previous = next;
        return next/this.max;
    }
    static xorshift32plusstar(number){
            number += 113566;
    number *= 5172511;
    number ^= number << 13;
    number ^= number << 5;
    number ^= number >> 17;

    return number >>> 0;
    }
}