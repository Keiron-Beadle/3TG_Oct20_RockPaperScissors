class Vector{
    constructor(pX,pY,pZ){
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ);
    }

    add(pVector){
        return new Vector(this.getX() + pVector.getX(), this.getY() + pVector.getY(), this.getZ() + pVector.getZ());
    }

    subtract(pVector){
        return new Vector(this.getX() - pVector.getX(), this.getY() - pVector.getY(), this.getZ() - pVector.getZ())
    }

    multiply(scalarValue){
        return new Vector(this.getX() * scalarValue, this.getY() * scalarValue, this.getZ() * scalarValue);
    }

    divide(scalarValue){
        return new Vector(this.getX() / scalarValue, this.getY() / scalarValue, this.getZ() * scalarValue);
    }

    magnitude(){
        return Math.sqrt(
            Math.pow(this.getX(), 2) + 
            Math.pow(this.getY(), 2) + 
            Math.pow(this.getZ(), 2)
        );
    }

    normalise(){
        var mag = this.magnitude();
        return new Vector( this.getX() / mag, this.getY() / mag, this.getZ() / mag );
    }

    limitTo(scalarValue){
        if (this.magnitude() > scalarValue)
        {
            var normVector = this.normalise();
            return normVector.multiply(scalarValue);
        }
        return this;
    }

    dotProduct(pVector){
        return (pVector.getX() * this.getX() + pVector.getY() * this.getY() + pVector.getZ() * this.getZ());
    }

    interpolate(pVector, scalarValue){
        return pVector.multiply(scalarValue).add(this.multiply(1-scalarValue));
    }

    rotate(scalarValue){
        var newX = this.getX() * Math.cos(scalarValue) - this.getY() * Math.sin(scalarValue);
        var newY = this.getX() * Math.sin(scalarValue) + this.getY() * Math.cos(scalarValue);
        return new Vector(newX, newY, 0);
    }

    angleBetween(pVector){
        return Math.acos( this.dotProduct(pVector) / (this.magnitude() * pVector.magnitude())  );
    }

    decompose(){
        return [this.getX(), this.getY(), this.getZ()];
    }

    getX(){
        return this.mX;
    }
    setX(pX){
        this.mX = pX;
    }
    getY(){
        return this.mY
    }
    setY(pY){
        this.mY = pY;
    }
    getZ(pZ){
        return this.mZ;
    }
    setZ(pZ){
        this.mZ = pZ;
    }
}