export default class Keyboard {
    constructor(value) {
        this.value = value;
        this.isDown = false;
        this.isUp = true;
        this.press = undefined;
        this.release = undefined;
        this.handle();
    }

    setPress(fn) {
        this.press = fn;
        console.log("B");
    }

    setRelease(fn) {
        console.log("A");
        this.release = fn;
    }

    handle() {
        window.addEventListener(
            "keydown", (event) => this.downListener(event), false
        );
        window.addEventListener(
            "keyup", (event) => this.upListener(event), false
        );
    }

    downListener(event) {
        if (event.key === this.value)
            if (this.isUp && this.press)
                this.press();
    }

    upListener(event) {
        console.log(event.key);
        this.release();
        this.isDown = false;
        this.isUp = true;
        event.preventDefault();
    }

    unsubscribe() {
        window.removeEventListener("keydown", this.downListener);
        window.removeEventListener("keyup", this.upListener);
    }

}