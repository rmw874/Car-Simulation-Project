class Car{
    constructor(x, y, width, height, access, maxVel = 3){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.isHit = false;
        this.vel = 0;
        this.ACCELERATION = 0.2;
        this.maxVel = maxVel;
        this.friction = 0.05;
        this.angle = 0;
        this.ANGLE = this.ACCELERATION/10;

        switch(access) {
            case "USER":
                this.sensor = new RaySensor(this);
                break;
        }
        this.controls = new Controls(access);
    }

    Update(roadBoarders, carArray){
        if (!this.isHit){
            this.#Move();
            this.polygon = this.#createPoly();
            this.isHit = this.#assessIsHit(roadBoarders, carArray);
        }
        if(this.sensor){
            this.sensor.Update(roadBoarders, carArray);
        }

    }

    #createPoly(){
        const corners=[];
        const r = Math.hypot(this.width, this.height)/2
        const theta = Math.atan2(this.width, this.height)
        corners.push({
            x: this.x - Math.sin(this.angle - theta) * r,
            y: this.y - Math.cos(this.angle - theta) * r
        });
        corners.push({
            x: this.x - Math.sin(this.angle + theta) * r,
            y: this.y - Math.cos(this.angle + theta) * r
        });
        corners.push({
            x: this.x - Math.sin(Math.PI + this.angle - theta) * r,
            y: this.y - Math.cos(Math.PI + this.angle - theta) * r
        });
        corners.push({
            x: this.x - Math.sin(Math.PI + this.angle + theta) * r,
            y: this.y - Math.cos(Math.PI + this.angle + theta) * r
        });

        return corners;
    }

    #assessIsHit(roadBoarders, carArray){
        for (let i = 0; i < roadBoarders.length; i++){
            if (CollisionDetection(this.polygon, roadBoarders[i])){
                return true;
            }
        }
        for (let i = 0; i < carArray.length; i++){
            if (CollisionDetection(this.polygon, carArray[i].polygon)){
                return true;
            }
        }
    }

    #Move(){
        if (this.controls.forward){
            this.vel += this.ACCELERATION;
        } if (this.controls.backward){
            this.vel -= this.ACCELERATION;
        } if (this.vel != 0){
            const forwardsOrBackwards = this.vel > 0 ? 1: -1; //when the car is not moving, it cannot turn. When it is moving, the way it turns is decided by the cars velocity.
            if (this.controls.left){
                this.angle += this.ANGLE*forwardsOrBackwards;
            } if (this.controls.right){
                this.angle -= this.ANGLE*forwardsOrBackwards;
            }
        }

        if (this.vel > this.maxVel) {
            this.vel = this.maxVel;
        } if (this.vel < -this.maxVel/2){
            this.vel = -this.maxVel/2;
        } if (this.vel > 0) {
            this.vel -= this.friction;
        } if (this.vel < 0) {
            this.vel += this.friction;
        } if(Math.abs(this.vel) < this.friction){
            this.vel = 0;
        }

        
        this.y -= Math.sin(this.angle)*this.vel;
        this.x += Math.cos(this.angle)*this.vel;
    }

    Draw(context, color = "Black"){
        if (this.isHit){
            context.fillStyle = "FloralWhite";
        } else {
            context.fillStyle = color;
        }
        context.beginPath();
        context.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i= 1; i < this.polygon.length; i++){
            context.lineTo(this.polygon[i].x, this.polygon[i].y)
        }
        context.fill();
        // context.save();
        // context.translate(this.x, this.y);
        // context.rotate(-this.angle);

        // context.beginPath();
        // context.rect(
        //     -this.width / 2,
        //     -this.height / 2,
        //     this.width,
        //     this.height
        // )
        // context.fill();
        // context.restore();
        if(this.sensor){
            this.sensor.Draw(context);
        }
    }
}