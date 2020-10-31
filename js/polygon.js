class Polygon{
    constructor(pVectorArr, pFillStyle, pLineThickness = 2){
        this.vectorArray = pVectorArr;
        this.fillStyle = pFillStyle;
        this.lineThickness = pLineThickness;
    }

    draw(pMainContext){
        pMainContext.beginPath();
        pMainContext.fillStyle = this.fillStyle;
        pMainContext.lineWidth = this.lineThickness;
        pMainContext.moveTo(this.vectorArray[0].getX(), this.vectorArray[0].getY());
        for (var i = 1; i < this.vectorArray.length; i++){
            pMainContext.lineTo(this.vectorArray[i].getX(), this.vectorArray[i].getY());
        }

        if (this.vectorArray[0].getX() == this.vectorArray[this.vectorArray.length-1].getX() &&
        this.vectorArray[0].getY() == this.vectorArray[this.vectorArray.length-1].getY()){
            pMainContext.closePath();
        }

        pMainContext.fill();
        pMainContext.fillStyle = "#000000";
        pMainContext.stroke();
    }
}