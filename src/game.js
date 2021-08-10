import { Application, Text, TextStyle, utils } from "pixi.js";

export class Game extends Application {
    constructor() {
        super({
            width: 512,
            height: 512,
        });
        this.renderer.view.style.position = "absolute";
        this.renderer.view.style.top = "50%";
        this.renderer.view.style.left = "50%";
        this.renderer.view.style.transform = "translate(-50%,-50%)";
        document.body.appendChild(this.view);
    }

    load() {
        this.loader.add("../assets/images/treasureHunter.json").load(() => this.setup());
    }
}