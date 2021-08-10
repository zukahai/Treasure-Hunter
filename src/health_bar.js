import { Container, Graphics} from 'pixi.js'


export default class HealthBar extends Container {
    constructor(stage, x, y){
        super();
        
        this.position.set(x, y);
        this.w = 128;
        this.health = 100;
        stage.addChild(this);
    
        let innerBar = new Graphics();
        innerBar.beginFill(0x000000);
        innerBar.drawRect(0, 0, this.w, 8);
        innerBar.endFill();
        this.addChild(innerBar);
    
        let outerBar = new Graphics();
        outerBar.beginFill(0xff3300);
        outerBar.drawRect(0, 0, this.w, 8);
        outerBar.endFill();
        this.addChild(outerBar);
    
        this.outer = outerBar;
    }

    updateHealth(percentage) {
        this.health += percentage;
        
        this.outer.width = Math.floor( this.health/100 * this.w);
        console.log(this.outer);
    }
}