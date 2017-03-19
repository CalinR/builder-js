import Camera from './camera'
import { LineDef, Sector } from './objects' 

export default class BirdsEyeCamera extends Camera {
    constructor(canvas, controller){
        super(canvas, controller);
    }

    intersect(a, b, c, d){
        let cd = {
            left: c[0] < d[0] ? c[0] : d[0],
            right: c[0] < d[0] ? d[0] : c[0]
        }
        let ab = {
            left: a[0] < b[0] ? a[0] : b[0],
            right: a[0] < b[0] ? b[0] : a[0]
        }

        let dy1 = b[1] - a[1]; // b.y - a.y
        let dx1 = b[0] - a[0]; // b.x - a.x
        let dy2 = d[1] - c[1]; // d.y - c.y
        let dx2 = d[0] - c[0]; // d.x - c.x

        if(dy1 * dx1 == dy2 * dx1){
            // no point
        }
        else {
            let x = ((c[1] - a[1]) * dx1 * dx2 + dy1 * dx2 * a[0] - dy2 * dx1 * c[0]) / (dy1 * dx2 - dy2 * dx1);
            let y = a[1] + (dy1 / dx1) * (x - a[0]);

            if(x > cd.left && x < cd.right && x > ab.left && x < ab.right){
                return {x, y}
            }
        }
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

                for(const linedef of sector.linedefs){
                    let points = LineDef.transformPoints(linedef, origin);
                    // console.log(points);
                    let intersection = this.intersect([points.start.x, points.start.y], [points.end.x, points.end.y], [center.x, center.y], [0, 0]);
                    // let intersection1 = this.intersect(points.start.x, points.start.y, points.end.x, points.end.y, -0.0001,0.0001, -20,5);
                    // let intersection2 = this.intersect(points.start.x, points.start.y, points.end.x, points.end.y, 0.0001,0.0001, 20,5);
                    if(intersection){
                        this.context.fillStyle = 'red';
                        this.context.fillRect(center.x - intersection.x - 2, center.y - intersection.y - 2, 4, 4);
                    }
                    console.log(intersection);
                }
                break;
            }

            this.context.fillStyle = 'red';
            this.context.fillRect(center.x - 2, center.y - 2, 4, 4);

            this.context.beginPath();
            this.context.lineWidth = 1;
            this.context.moveTo(center.x, center.y);
            this.context.lineTo(0, 0);
            this.context.stroke();
            this.context.closePath();

            this.context.beginPath();
            this.context.lineWidth = 1;
            this.context.moveTo(center.x, center.y);
            this.context.lineTo(this.width, 0);
            this.context.stroke();
            this.context.closePath();

        }
    }
}