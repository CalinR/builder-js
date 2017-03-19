import Camera from './camera'
import { LineDef, Sector } from './objects' 

export default class BirdsEyeCamera extends Camera {
    constructor(canvas, controller){
        super(canvas, controller);
    }

    render(){
        let center = this.center;
        let origin = this.origin;

        if(this.scene){
            this.clear();
            
            for(const sector of this.scene.sectors){
                let portals = [];

                this.context.beginPath();
                this.context.fillStyle = 'rgba(52, 152, 219,0.5)';
                this.context.strokeStyle = '#000';
                this.context.lineWidth = 1;
                for(const [index, linedef] of sector.linedefs.entries()){
                    let points = LineDef.transformPoints(linedef, origin);
                    if(index == 0){
                        this.context.moveTo(center.x - points.start.x, center.y - points.start.y);
                        this.context.lineTo(center.x - points.end.x, center.y - points.end.y);
                    }
                    else {
                        this.context.lineTo(center.x - points.start.x, center.y - points.start.y);
                        this.context.lineTo(center.x - points.end.x, center.y - points.end.y);
                    }

                    if(linedef.isPortal()){
                        portals.push(points);
                    }
                }
                this.context.stroke();
                if(sector.isPointInSector(origin)){
                    this.context.fill();
                }
                this.context.closePath();

                for(const portal of portals){
                    this.context.beginPath();
                    this.context.strokeStyle = 'red';
                    this.context.lineWidth = 2;
                    this.context.moveTo(center.x - portal.start.x, center.y - portal.start.y);
                    this.context.lineTo(center.x - portal.end.x, center.y - portal.end.y);
                    this.context.stroke();
                    this.context.closePath();
                }
            }

            this.context.fillStyle = 'red';
            this.context.fillRect(center.x - 2, center.y - 2, 4, 4);

        }
    }
}