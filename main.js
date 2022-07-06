const canvas = document.getElementById("Canvas")
canvas.height = 300;
canvas.width = window.innerWidth;

const context = canvas.getContext("2d");
const road = new Road(canvas.height/2, canvas.height*0.825)
const car = new Car(100, road.getLaneCenter(99), 75, 40, "USER");
const carArray = [
    new Car(200, road.getLaneCenter(99), 75, 40, "DUMMY", 2)
];

Animate();

function Animate(){
    for (let i = 0; i < carArray.length; i++) {
        carArray[i].Update(road.borders, []);
    }
    car.Update(road.borders, carArray);
    
    canvas.width = window.innerWidth; //clears and keeps canvas updated
    
    context.save();
    context.translate(-car.x+canvas.width*0.5, 0);
    road.Draw(context);
    for (let i = 0; i < carArray.length; i++) {
        carArray[i].Draw(context, "Yellow");
    }

    car.Draw(context, "Coral");
    context.restore();

    requestAnimationFrame(Animate);
}