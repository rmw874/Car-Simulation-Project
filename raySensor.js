class RaySensor{
    constructor(car){
        this.car = car;
        this.numOfRays = 6; //?seems to be 0-indexed for some reason. possibly not the best math related to angle but it works :).
        this.rayLen = road.height/2;
        this.raySpread = Math.PI*2;

        this.rays = [];
        this.readings = [];
        this.t = 0
    }

    Update(roadBoarders, carArray){
        this.#spawnRays();
        this.#rotateRays();

        this.readings=[];
        for (let i = 0; i < this.rays.length; i++){
            this.readings.push(
                this.#getInterInfo(
                    this.rays[i], 
                    roadBoarders,
                    carArray)
            );
        }
    }

    #getInterInfo(ray, roadBoarders, carArray){
        let overlaps = [];

        for (let i = 0; i < roadBoarders.length; i++){
            const overlap = getIntersection(
                ray[0],
                ray[1],
                roadBoarders[i][0],
                roadBoarders[i][1]
            )
            if (overlap) {
                overlaps.push(overlap);
            }
        }

        for (let i = 0; i < carArray.length; i++){
            const poly = carArray[i].polygon;
            for (let j = 0; j < poly.length; j++){
                const overlap = getIntersection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j+1)%poly.length]
                )
                if (overlap) {
                    overlaps.push(overlap);
                }
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
            ) + this.car.angle + this.t;
            const start = {x: this.car.x, y: this.car.y};
            const end = {
                x: this.car.x + Math.cos(rayAngle) * this.rayLen,
                y: this.car.y - Math.sin(rayAngle) * this.rayLen
            }
            this.rays.push([start, end])
        }
    }

    #rotateRays(){ //!Make this dependent on if turning left or right - keep it at a max
        this.t += 0.01*this.car.vel+0.005
    }

    Draw(context) {
        for (let i = 0; i < this.numOfRays; i++){
            let end = this.rays[i][1];
            if(this.readings[i]){
                end = this.readings[i];
            }

            context.beginPath();
            context.lineWidth = 2.5;
            context.strokeStyle = "royalblue";
            context.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            context.lineTo(end.x, end.y);
            context.stroke();

            context.beginPath();
            context.lineWidth = 2.5;
            context.strokeStyle = "crimson";
            context.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            context.lineTo(end.x, end.y);
            context.stroke();
        }
    }
}