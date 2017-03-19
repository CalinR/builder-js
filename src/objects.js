let sectorId = 0;
let lineDefId = 0;
let vertexId = 0;
let vertex3Id = 0;

window.sectors = [];
window.linedefs = [];
window.vertices = [];
window.things = [];

export class Sector {
    constructor(linedefs, floorHeight = 0, ceilingHeight = 10, id = sectorId++){
        this.id = id;
        this.linedefs = linedefs;
        this.floorHeight = parseFloat(floorHeight);
        this.ceilingHeight = parseFloat(ceilingHeight);
        window.sectors.push(this);
    }

    sortedLinedefs(){
        let sortedLinedefs = [];

        for(let linedef of this.linedefs){
            if(sortedLinedefs.length){
                let lastLinedef = sortedLinedefs[sortedLinedefs.length - 1];
                if(linedef.end.x == lastLinedef.end.x && linedef.end.y == lastLinedef.end.y){
                    sortedLinedefs.push({ ...linedef, start: linedef.end, end: linedef.start })
                   
                }
                else {
                    sortedLinedefs.push(linedef);
                }
            }
            else {
                sortedLinedefs.push(linedef);
            }
        }

        // console.log(sortedLinedefs);

        return sortedLinedefs;
    }

    isPointInSector(origin){
        let sumOfAngles = 0;
        for(let linedef of this.sortedLinedefs()){
            sumOfAngles += this.getAngle(origin.y - linedef.start.y, origin.x - linedef.start.x, origin.y - linedef.end.y, origin.x -linedef.end.x);
        }
        return Math.abs(sumOfAngles).toFixed(2) == (Math.PI * 2).toFixed(2);
    }

    getAngle(x1, y1, x2, y2){
        let theta1 = Math.atan2(y1, x1);
        let theta2 = Math.atan2(y2, x2);
        let dtheta = theta2 - theta1;

        if(dtheta > Math.PI){
            dtheta -= Math.PI * 2;
        }

        if(dtheta < -Math.PI){
            dtheta += Math.PI * 2;
        }
        // while(dtheta > Math.PI){
        //     dtheta -= Math.PI * 2;
        // }
        // while (dtheta < -Math.PI){
        //     dtheta += Math.PI * 2;
        // }

        return dtheta;
    }

}

export class LineDef {
    constructor(vectors, leftSidedef = '#ccc', rightSidedef = '#ccc', id = lineDefId++){
        this.id = id;
        this.vertices = vectors;
        this.start = vectors[0];
        this.end = vectors[1];
        this.leftSidedef = leftSidedef;
        this.rightSidedef = rightSidedef;
        this.parents = [];
        window.linedefs.push(this);
    }

    isPortal(){
        return this.parents.length > 1;
    }

    static transformPoints(linedef, origin){
        const startX = linedef.start.x - origin.x;
        const startY = linedef.start.y - origin.y;
        const endX = linedef.end.x - origin.x;
        const endY = linedef.end.y - origin.y;

        const y1 = startX  * Math.cos(origin.rotation) + startY * Math.sin(origin.rotation);
        const x1 = startX * Math.sin(origin.rotation) - startY * Math.cos(origin.rotation);
        const y2 = endX  * Math.cos(origin.rotation) + endY * Math.sin(origin.rotation);
        const x2 = endX * Math.sin(origin.rotation) - endY * Math.cos(origin.rotation);

        return {
            start: {
                x: x1,
                y: y1
            },
            end: {
                x: x2,
                y: y2
            }
        };
    }

    length(){
        let xDiff = this.vertices[0].x - this.vertices[1].x;
        let yDiff = this.vertices[0].y - this.vertices[1].y;

        return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    }
}

export class Vertex {
    constructor(x, y, id = vertexId++){
        this.id = id;
        this.x = x;
        this.y = y;
        window.vertices.push(this);
    }
}

export class Thing {
    constructor(x, y, sprite = null, type, hex, id = window.things.length){
        this.id = id;
        this.x = x;
        this.y = y;
        this.hex = hex;
        this.sprite = sprite;
        this.thingType = type;
        window.things.push(this)
    }

    type(){
        return 'thing';
    }
}