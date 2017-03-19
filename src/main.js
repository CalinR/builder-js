import BirdsEyeCamera from './birdsEyeCamera'
import map1 from './map1.json'
import JsonToMap from './jsonToMap'
import Player from './player'

class Main {
    constructor(){
        window.deltaTime = 0;
        window.lastUpdate = Date.now();
        this.scene = JsonToMap(map1);
        this.player = new Player(145, 100, 0);
        this.birdsEyeCamera = new BirdsEyeCamera(document.getElementById('canvas'), this.player);

        this.birdsEyeCamera.addScene(this.scene);
        this.loop();
    }

    updateDeltaTime(){
        let currentFrameTime = Date.now();
        window.deltaTime = (currentFrameTime - window.lastUpdate) / 1000.0; // Convert delta time from milliseconds to seconds
        window.lastUpdate = currentFrameTime;
    }

    loop(){
        this.updateDeltaTime();
        this.birdsEyeCamera.render();
        // window.requestAnimationFrame(() => this.loop());
    }
}

window.engine = new Main;
console.log(window.engine);