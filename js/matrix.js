class Matrix{
    constructor(x1,x2,x3,y1,y2,y3,z1,z2,z3){
        this.matrix = [[x1,x2,x3],[y1,y2,y3],[z1,z2,z3]];
    }

    length(){
        return this.matrix.length;
    }

    getElement(x,y){
        var item = this.matrix[x][y];
        return this.matrix[x][y];
    }

    setElement(x,y,v)
    {
        this.matrix[x][y] = v;
    }

    static createIdentity(){
        return new Matrix(1,0,0,0,1,0,0,0,1);
    }

    static createTranslation(pVector){
        return new Matrix(1,0,pVector.getX(), 0,1,pVector.getY(),0,0,pVector.getZ());
    }

    static createScale(pVector){
        return new Matrix(pVector.getX(), 0,0,0,pVector.getY(),0,0,0,pVector.getZ());
    }
    
    static createRotation(scalarValue){
        return new Matrix(Math.cos(scalarValue), -Math.sin(scalarValue),0, 
                        Math.sin(scalarValue), Math.cos(scalarValue), 0,
                        0, 0, 1);
    }

    multiplyVector(pVector){
        var returnVecArr = [];
        var rows = 3;
        var columns = 3;
        var decomposedVector = pVector.decompose();
        for (var i = 0; i < rows; i++){
            var sum = 0;
            for (var j = 0; j < columns; j++){
                sum += this.getElement(i,j) * decomposedVector[j];
            }
            returnVecArr[i] = sum;
        }
        var returnVec = new Vector(returnVecArr[0], returnVecArr[1], returnVecArr[2]);
        return returnVec;
    }

    decompose(row){
        if (row){
            var vec1 = new Vector(this.matrix[0][0], this.matrix[0][1], this.matrix[0][2]);
            var vec2 = new Vector(this.matrix[1][0], this.matrix[1][1], this.matrix[1][2]);
            var vec3 = new Vector(this.matrix[2][0], this.matrix[2][1], this.matrix[2][2]);
            return [vec1,vec2,vec3];
        }
        var vec1 = new Vector(this.matrix[0][0], this.matrix[1][0], this.matrix[2][0]);
        var vec2 = new Vector(this.matrix[0][1], this.matrix[1][1], this.matrix[2][1]);
        var vec3 = new Vector(this.matrix[0][2], this.matrix[1][2], this.matrix[2][2]);
        return [vec1,vec2,vec3];
    }

    multiply(pMatrix){
        var returnMatrix = new Matrix(0,0,0,0,0,0,0,0,0);
        var decomposedThisMatrix = this.decompose(true);
        var decomposedPMatrix = pMatrix.decompose(false);

        for (var i = 0; i < decomposedThisMatrix.length; i++){
            for(var j = 0 ; j < decomposedPMatrix.length; j++){
                returnMatrix.setElement(i,j, decomposedThisMatrix[i].dotProduct(decomposedPMatrix[j]));
            }
        }


        return returnMatrix;
    }

    setTransform(context){
        context.setTransform(this.getElement(0,0), this.getElement(1,0),this.getElement(0,1),
        this.getElement(1,1),this.getElement(0,2),this.getElement(1,2));
    }

    transform(context){
        context.transform(this.getElement(0,0), this.getElement(1,0),this.getElement(0,1),
        this.getElement(1,1),this.getElement(0,2),this.getElement(1,2));
    }
}