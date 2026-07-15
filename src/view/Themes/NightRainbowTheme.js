import HSL from "../../model/palette/HSL";
import SingleColorPaletteBuilder from "../../model/palette/SingleColorPaletteBuilder";
import levelPalette from "../../model/game/LevelPalette";

export default class NightRainbowTheme{
    constructor(){
        this.paletteBuilder = new SingleColorPaletteBuilder(
            new HSL (180,60,30)
        );
        this.colors = [
            new HSL(0, 100, 77),
            new HSL(25, 100, 64),
            new HSL(57, 100, 37),
            new HSL(150, 100, 43),
            new HSL(200, 100, 60),
            new HSL(252, 100, 80),
            new HSL(290, 100, 77)
        ];
        this.numberColor = "#202030";
        this.defaultBackgroundColor = "#202030";
        this.textColor = "#FFFFFF";
        this.textBackground = "#202030";
        this.sliderColor = "#FFFFFF";
        this.changesDocumentTextColor = true;
        this.defaultGray = "#969696";
    }
    getLevelPalette(level){
        const numberColor = this.colors[(level-1)%7];
        const boardColors = this.paletteBuilder.build(16);
        return new levelPalette(numberColor,boardColors);
    }
}