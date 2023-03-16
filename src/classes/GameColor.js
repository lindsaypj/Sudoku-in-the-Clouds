export class GameColor {
    constructor(color) {
        if (typeof color == "string") {
            // Hex -> "#XXXXXX"
            if (color.startsWith("#")) {
                this.red = parseInt(color.substring(1, 3), 16);
                this.green = parseInt(color.substring(3, 5), 16);
                this.blue = parseInt(color.substring(5, 7), 16);
            }
            // RGB -> "rgb(xx, x, xxx)"
            else if (color.startsWith("rgb(")) {
                this.red = parseInt(color.substring(4, color.indexOf(",")));
                this.green = parseInt(color.substring(color.indexOf(",")+2, color.lastIndexOf(",")));
                this.blue = parseInt(color.substring(color.lastIndexOf(","), color.lastIndexOf(")")));
            }
        }
        else if (color instanceof Array) {
            this.red = color[0];
            this.green = color[1];
            this.blue = color[2];
        }
        else if (color instanceof Object) {
            this.red = color?.red;
            this.green = color?.green;
            this.blue = color?.blue;
        }
        else {
            this.red = 0;
            this.green = 0;
            this.blue = 0;
        }

        // Set Transparency
        this.transparency = 1;
    }

    toHex = function() {
        let red = this.red.toString(16);
        let green = this.green.toString(16);
        let blue = this.blue.toString(16);

        // Correct hex syntax if 0
        if (red === "0") {
            red = "00"
        }
        if (green === "0") {
            green = "00"
        }
        if (blue === "0") {
            blue = "00"
        }

        // Correct length formating
        if (red.length === 1) {
            red = "0"+red;
        }
        if (green.length === 1) {
            green = "0"+green;
        }
        if (blue.length === 1) {
            blue = "0"+blue;
        }

        return "#"+red+green+blue;
    };
}