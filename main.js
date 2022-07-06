const canvas = document.getElementById("Canvas")
canvas.height = 300;
canvas.width = window.innerWidth;

const context = canvas.getContext("2d");
const road = new Road(canvas.height/2, canvas.height*0.825)
const car = new Car(100, road.getLaneCenter(7), 75, 40);

animate();

function animate(){
    car.Update();
    canvas.width = window.innerWidth; //clears and keeps canvas updated
    context.save();
    context.translate(-car.x+canvas.width*0.5, 0);
    road.Draw(context);
    car.Draw(context);
    context.restore();
    requestAnimationFrame(animate);
}