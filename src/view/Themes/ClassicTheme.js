import XSPRNG from "../../model/random/XSPRNG";
import MonochromaticPaletteBuilder from "../../model/palette/MonochromaticPaletteBuilder";
import HSL from "../../model/palette/HSL";
import levelPalette from "../../model/game/LevelPalette";

export default class ClassicTheme {
    constructor(paletteRange){
        this.paletteRange = paletteRange;
        this.prng = new XSPRNG(1);
        this.paletteBuilder = new MonochromaticPaletteBuilder(
            null,
            null,
            0.8
        );
    }
    numberColor = #FFFFFF;

    defaultBackgroundColor = "#D3D3D3";

    textColor = "#000000";

    textBackground = "#FFFFFF";

    sliderColor = "#FFFFFF";

    changesDocumentTextColor = false;

    defaultGray = "#808080";

    getLevelPalette(level){
        if(typeof this.prng.seed ==="function"){
            this.prng.seed(level);
        }
        const hue = Math.floor(this.prng.random()*360);
        const saturation = Math.floor(this.prng.random()*20)+80;
        const boardColors = this.paletteBuilder.build(
            16,
            this.paletteRange
        );
        const numberColor = HSL.complement(
            boardColors[Math.floor(this.prng.random()*16)]
        );
        const backgroundColor = numberColor.clone();
        backgroundColor.l = Math.floor(numberColor.l+45)%101;
        backgroundColor.a =1;
        return new levelPalette(
            numberColor,
            boardColors,
            backgroundColor
        );
    }

}