import { Application, Text, TextStyle, utils } from "pixi.js";
import Scene from "./scene.js";
import SpriteObject from "./sprite-object.js";
import Keyboard from "./keyboard.js";

let SpeedExplorer = 5;
let margin = 0;

const TextureCache = utils.TextureCache;

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

    setup() {
        this.gameScene = new Scene(this.stage);

        this.gameOverScene = new Scene(this.stage);
        this.gameOverScene.setVisible(false);

        this.dungeon = new SpriteObject(
            this.gameScene,
            TextureCache["dungeon.png"]
        );

        this.explorer = new SpriteObject(
            this.gameScene,
            TextureCache["explorer.png"]
        );
        this.explorer.setPosition(
            this.stage.height / 10,
            this.stage.height / 10
        );

        this.blob = new SpriteObject(
            this.gameScene,
            TextureCache["blob.png"]
        );
        this.blob.setPosition(
            100,
            100
        );

        this.setupController();
        this.ticker.add((delta) => this.loop(delta));
        margin = this.stage.width / 20;
    }

    loop(delta) {
        // console.log(this.explorer.x, ' ', this.explorer.y);
        this.explorer.update(1);
        this.UpdateExplorer();
    }

    end() {
        this.gameScene.setVisible(false);
        this.gameOverScene.setVisible(true);
    }

    UpdateExplorer() {
        if (this.explorer.x < margin)
            this.explorer.x = margin;
        if (this.explorer.y < margin)
            this.explorer.y = margin;
        if (this.explorer.x > this.stage.width - margin - this.explorer.width)
            this.explorer.x = this.stage.width - margin - this.explorer.width;
        if (this.explorer.y > this.stage.height - margin - this.explorer.height)
            this.explorer.y = this.stage.height - margin - this.explorer.height;
    }

    setupController() {
        let left = new Keyboard("ArrowLeft"),
            up = new Keyboard("ArrowUp"),
            right = new Keyboard("ArrowRight"),
            down = new Keyboard("ArrowDown");

        left.setPress(() => {
            if (this.explorer.x > 0)
                this.explorer.vx = -SpeedExplorer;
            else
                this.explorer.vx = 0;
        });

        up.setPress(() => {
            if (this.explorer.y > 0)
                this.explorer.vy = -SpeedExplorer;
            else
                this.explorer.vy = 0;
        });

        right.setPress(() => {
            if (this.explorer.x < this.stage.width - this.explorer.width / 2 - margin)
                this.explorer.vx = SpeedExplorer;
            else
                this.explorer.vx = 0;
            console.log("Hello");
        });

        down.setPress(() => {
            if (this.explorer.y < this.stage.width - this.explorer.height / 2 - margin)
                this.explorer.vy = SpeedExplorer;
            else
                this.explorer.vy = 0;
        });

        left.setRelease(() => {
            this.explorer.vx = 0;
        });

        up.setRelease(() => {
            this.explorer.vy = 0;
        });

        right.setRelease(() => {
            this.explorer.vx = 0;
            console.log("2");
        });

        down.setRelease(() => {
            this.explorer.vy = 0;
        });
    }
}