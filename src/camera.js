export default class Camera {
    constructor(canvas, controller = null){
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.scene = null;
        this._x = 0;
        this._y = 0;
        this._rotation = 0;
        this.controller = controller;
    }

    get width(){
        return this.canvas.width;
    }

    set width(width){
        this.canvas.width = width;
    }

    get height(){
        return this.canvas.height;
    }

    set height(height){
        this.canvas.height = height;
    }

    get center(){
        return {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        }
    }

    get radians(){
        return this.rotation * Math.PI / 180;
    }

    set radians(radians){
        this.rotation = radians * 180 / Math.PI;
    }

    get origin(){
        return {
            x: this.x,
            y: this.y,
            rotation: this.radians
        }
    }

    get x(){
        return this.controller.x;
    }

    get y(){
        return this.controller.y;
    }

    get rotation(){
        return this.controller.rotation;
    }

    clear(){
        this.context.clearRect(0, 0, this.width, this.height);
    }

    addScene(scene){
        this.scene = scene;
        this.render();
    }
}