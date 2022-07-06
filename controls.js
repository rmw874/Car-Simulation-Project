class Controls{
    constructor(){
        this.forward = false;
        this.left = false;
        this.backward = false;
        this.right = false;

        this.#KeyHandler();
    }

    #KeyHandler(){
        document.onkeydown = (event) => {
            switch(event.key) {
                case "w":
                    this.forward = true;
                    break;
                case "a":
                    this.left = true;
                    break;
                case "s":
                    this.backward = true;
                    break;
                case "d":
                    this.right = true;
                    break;
            }
            //console.table(this);
        }
        document.onkeyup = (event) => {
            switch(event.key) {
                case "w":
                    this.forward = false;
                    break;
                case "a":
                    this.left = false;
                    break;
                case "s":
                    this.backward = false;
                    break;
                case "d":
                    this.right = false;
                    break;
            }
            //console.table(this);
        }
    }
}