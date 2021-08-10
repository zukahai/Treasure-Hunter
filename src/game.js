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
        this.explorer.vx = 1;

        this.setupController();
        this.ticker.add((delta) => this.loop(delta));
    }

    loop(delta) {

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
            if (this.explorer.x > 28) this.explorer.x -= 5;
        });

        up.setPress(() => {
            if (this.explorer.y > 20) this.explorer.y -= 5;
        });

        right.setPress(() => {
            if (this.explorer.x < 512 - 50) this.explorer.x += 5;
        });

        down.setPress(() => {
            if (this.explorer.y < 512 - 65) this.explorer.y += 5;
        });
    }
}