import { Application, Text, TextStyle, utils } from "pixi.js";
import Scene from "./scene.js";
import SpriteObject from "./sprite-object.js";
import Keyboard from "./keyboard.js";

let SpeedExplorer = 5;
let margin = 0;
let Nblob = 6;

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

        this.blob = [];
        for (let i = 0; i < Nblob; i++) {
            this.blob[i] = new SpriteObject(
                this.gameScene,
                TextureCache["blob.png"]
            );
            this.blob[i].setPosition(
                this.stage.width / 5 + i * this.stage.width / 9,
                Math.random() * this.stage.height
            );
            this.blob[i].direction = (Math.random() < 0.5) ? 1 : -1;
        }


        this.setupController();
        this.ticker.add((delta) => this.loop(delta));
        margin = this.stage.width / 20;
    }

    loop(delta) {
        // console.log(this.explorer.x, ' ', this.explorer.y);
        this.explorer.update(1);
        this.UpdateExplorer(this.explorer);
        for (let i = 0; i < Nblob; i++) {
            this.moveBlob(this.blob[i]);
            this.UpdateExplorer(this.blob[i]);
        }
    }

    end() {
        this.gameScene.setVisible(false);
        this.gameOverScene.setVisible(true);
    }

    moveBlob(blob) {
        blob.vy = blob.direction * SpeedExplorer / 2;
        blob.update(1);
        if (blob.y < margin || blob.y > this.stage.height - margin - blob.height)
            blob.direction *= -1;
    }

    UpdateExplorer(sprite) {
        if (sprite.x < margin)
            sprite.x = margin;
        if (sprite.y < margin)
            sprite.y = margin;
        if (sprite.x > this.stage.width - margin - sprite.width)
            sprite.x = this.stage.width - margin - sprite.width;
        if (sprite.y > this.stage.height - margin - sprite.height)
            sprite.y = this.stage.height - margin - sprite.height;
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
        });

        down.setRelease(() => {
            this.explorer.vy = 0;
        });
    }
}