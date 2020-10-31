class Platform{
    constructor(){

    }

    getVertices(){
        let posX = this.position.getX();
        let posY = this.position.getY();
        return [new Vector(posX, posY, 0),
            new Vector(posX + this.getWidth(), posY, 0),
            new Vector(posX + this.getWidth(), posY + this.getHeight(), 0),
            new Vector(posX, posY + this.getHeight(), 0)];
    }
}