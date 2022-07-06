class Car{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.vel = 0;
        this.ACCELERATION = 0.2;
        this.maxVel = 3;
        this.friction = 0.05;
        this.angle = 0;
        this.ANGLE = this.ACCELERATION/10;

        this.controls = new Controls();
    }

    Update(){
        this.#Move();
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

    Draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(-this.angle);

        context.beginPath();
        context.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        )
        context.fill()
        context.restore();
    }
}