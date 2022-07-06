class RaySensor{
    constructor(car){
        this.car = car;
        this.numOfRays = 2;
        this.rayLen = road.height/2;
        this.raySpread = Math.PI;

        this.rays = [];
        this.borderControl = [];
    }

    Update(roadBoarders){
        this.#spawnRays();

        this.borderControl=[];
        for (let i = 0; i < this.rays.length; i++){
            this.borderControl.push(
                this.#getBorderControl(this.rays[i], roadBoarders)
            );
        }
    }

    #getBorderControl(ray, roadBoarders){
        let overlaps = [];

        for (let i = 0; i < roadBoarders.length; i++){
            const overlap = getIntersection(
                ray[0],
                ray[1],
                roadBoarders[i][0],
                roadBoarders[i][1],
            )
            if (overlap) {
                overlaps.push(overlap);
            }
        }
        if (overlaps.length == 0){
            return null;
        } else {
            const offsets = overlaps.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return overlaps.find(e => e.offset == minOffset);
        }
    }

    #spawnRays(){
        this.rays = [];
        for (let i = 0; i < this.numOfRays; i++){
            const rayAngle = linInter(
                this.raySpread / 2,
                -this.raySpread / 2,
                this.numOfRays == 1 ? 0.5: i / (this.numOfRays - 1)
            ) + this.car.angle;
            const start = {x: this.car.x, y: this.car.y};
            const end = {
                x: this.car.x + Math.cos(rayAngle) * this.rayLen,
                y: this.car.y - Math.sin(rayAngle) * this.rayLen
            }
            this.rays.push([start, end])
        }
    }

    Draw(context) {
        for (let i = 0; i < this.numOfRays; i++){
            let end = this.rays[i][1];
            if(this.borderControl[i]){
                end = this.borderControl[i];
            }

            context.beginPath();
            context.lineWidth = 2.5;
            context.strokeStyle = "blue";
            context.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            context.lineTo(end.x, end.y);
            context.stroke();

            context.beginPath();
            context.lineWidth = 2.5;
            context.strokeStyle = "red";
            context.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            context.lineTo(end.x, end.y);
            context.stroke();
        }
    }
}