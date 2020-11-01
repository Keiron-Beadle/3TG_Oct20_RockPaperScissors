class Platform{
    constructor(pMainContext, pPos, pSize, pWorldMat){
        this.mainContext = pMainContext;
        this.worldMatrix = pWorldMat;
        this.transformMatrix;
        this.position = pPos;
        this.vertices = [
            new Vector(pPos.getX(), pPos.getY(),0),
            new Vector(pPos.getX() + pSize, pPos.getY(),0),
            new Vector(pPos.getX() + pSize, pPos.getY() + 80,0),
            new Vector(pPos.getX(), pPos.getY() + 80,0)
        ];
        this.image = new Image();
        switch(pSize){
            case 100:
                this.image.src = "SpriteSheets/100Platform.png";
                break;
            case 200:
                this.image.src = "SpriteSheets/200Platform.png";
                break;
            case 300:
                this.image.src = "SpriteSheets/300Platform.png";
                break;
            case 500:
                this.image.src = "SpriteSheets/500Platform.png";
                break;
        }
    }

    getVertices(){
        return this.vertices;
    }

    update(){
        this.transformMatrix = this.worldMatrix.multiply(Matrix.createTranslation(this.position));
    }

    draw(){
        this.transformMatrix.setTransform(this.mainContext);
        this.mainContext.drawImage(this.image, 0, 0);
        this.worldMatrix.setTransform(this.mainContext);
    }
}