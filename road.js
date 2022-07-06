class Road{
    constructor(y, height, numOfLanes = 3){
        this.y = y;
        this.height = height;
        this.numOfLanes = numOfLanes;
        
        this.upperHalf = y-height/2
        this.lowerHalf = y+height/2

        const inf = 9999999;
        this.roadBeginning = -inf;
        this.roadEnding = inf;

        const bottomLeft = {x: this.roadBeginning, y: this.lowerHalf}
        const topLeft = {x: this.roadEnding, y: this.lowerHalf}
        const bottomRight = {x: this.roadBeginning, y: this.upperHalf}
        const topRight = {x: this.roadEnding, y: this.upperHalf}

        this.borders = [
            [bottomLeft, topLeft],
            [bottomRight, topRight]
        ]
    }
    
    getLaneCenter(lane){
        const laneWidth = this.height/this.numOfLanes;
        return this.upperHalf + laneWidth/2 + 
        Math.min(lane, this.numOfLanes-1)*laneWidth;
    }

    Draw(context){
        context.lineWidth = 5;
        context.strokeStyle = "white"

        for (let i = 1; i <= this.numOfLanes - 1; i++){
            const t = linInter(
                this.upperHalf,
                this.lowerHalf,
                i/this.numOfLanes
            );
                context.setLineDash([40, 15])
                context.beginPath();
                context.moveTo(this.roadEnding, t);
                context.lineTo(this.roadBeginning, t);
                context.stroke();
        }
        context.setLineDash([5,3])
        this.borders.forEach(border =>{ //!fix den her del
            context.beginPath();
            context.moveTo(border[1].x, border[1].y);
            context.lineTo(border[0].x, border[0].y);
            context.stroke();
        })
    }
    addLane(){
        this.numOfLanes++;
    }
    RemoveLane(){
        this.numOfLanes--;
    }
}
