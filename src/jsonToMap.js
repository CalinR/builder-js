import { Sector, LineDef, Vertex, Thing } from './objects'

const JsonToMap = (json) => {
    let map = {
        sectors: [],
        things: []
    };
    for(let sector of json.sectors){
        let currentSector = new Sector([], sector.floorHeight, sector.ceilingHeight, sector.id)
        for(let linedef of sector.linedefs){
            let currentLinedef = null;
            for(let l of window.linedefs){
                if(l.id == linedef.id){
                    currentLinedef = l;
                }
            }
            if(!currentLinedef){
                let startVertex = new Vertex(linedef.startVertex.x, linedef.startVertex.y, linedef.startVertex.id);
                let endVertex = new Vertex(linedef.endVertex.x, linedef.endVertex.y, linedef.endVertex.id);
                currentLinedef = new LineDef([startVertex, endVertex], linedef.leftSidedef, linedef.rightSidedef, linedef.id);
            }
            currentLinedef.parents.push(currentSector);
            currentSector.linedefs.push(currentLinedef);
        }
        
        map.sectors.push(currentSector);
    }
    for(let thing of json.things){
        map.things.push(new Thing(thing.x, thing.y, thing.sprite, thing.type, thing.hex, thing.id));
    }
    return map;
}

export default JsonToMap;