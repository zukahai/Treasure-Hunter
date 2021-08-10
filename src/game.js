import { Application, Text, TextStyle, utils } from "pixi.js";
import Scene from "./scene.js";
import SpriteObject from "./sprite-object.js";
import Keyboard from "./keyboard.js";


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
        // this.explorer.vx = 1;

        this.setupController();
        this.ticker.add((delta) => this.loop(delta));
    }

    loop(delta) {
        // console.log(this.explorer.x, ' ', this.explorer.y);
        this.explorer.update(1);
    }

    end() {
        this.gameScene.setVisible(false);
        this.gameOverScene.setVisible(true);
    }

    setupController() {
        let left = new Keyboard("ArrowLeft"),
            up = new Keyboard("ArrowUp"),
            right = new Keyboard("ArrowRight"),
            down = new Keyboard("ArrowDown");

        left.setPress(() => {
            if (this.explorer.x > 0) this.explorer.vx = -5;
            console.log("Hello");
        });

        up.setPress(() => {
            if (this.explorer.y > 0) this.explorer.vy = -5;
        });

        right.setPress(() => {
            if (this.explorer.x < this.stage.width - this.explorer.width / 2) this.explorer.vx = 5;
        });

        down.setPress(() => {
            if (this.explorer.y < this.stage.width - this.explorer.height / 2) this.explorer.vy = 5;
        });

        left.setRelease(() => {
            console.log("left");
            this.explorer.vx = 0;
        });

        up.setRelease(() => {
            this.explorer.vy = 0;
        });

        right.setRelease(() => {
            this.explorer.vx = 0;
        });

        down.setRelease(() => {
            this.explorer.vy = 0;
        });
    }
}