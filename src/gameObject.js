export default class GameObject {
    constructor(x, y, rotation){
        this.x = x;
        this.y = y;
        this.rotation = rotation;

        setTimeout(() => {
            this.loop();
        }, 100)
    }

    get radians(){
        return this.rotation * Math.PI / 180;
    }

    set radians(radians){
        this.rotation = radians * 180 / Math.PI;
    }

    update(){

    }

    loop(){
        this.update();
        window.requestAnimationFrame(() => this.loop());
    }
}
