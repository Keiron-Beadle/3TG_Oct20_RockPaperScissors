class EnemyAI{
    constructor(pVisibility){
        this.RANDOM = 0;
        this.MOVING = 1;
        this.ATTACKING = 2;
        this.visibility = pVisibility;
        this.states = ["Random", "Moving", "Attacking"];
        this.currentState = this.states[this.RANDOM];
    }

    update(pPos, pTarget, pObstacleArray, pCanvas){
        let returnGoal;
        if (Math.floor(pPos.getX()) == Math.floor(pTarget.getPosition().getX())){
            return pTarget.getPosition();
        }
        else if (this.visibilityTest(pPos, pTarget, pObstacleArray)){
            this.currentState = this.states[this.MOVING];
        }
        else{
            this.currentState = this.states[this.RANDOM];
        }

        switch(this.currentState){
            case this.states[this.RANDOM]:
                returnGoal = this.runRandom(pPos, pCanvas);
                break;
            case this.states[this.MOVING]:
                returnGoal = this.runMoving(pPos, pTarget, pCanvas);
                break;
            case this.states[this.ATTACKING]:
                returnGoal = this.runAttacking(pPos, pTarget);
                break
        }
        return returnGoal;
    }

    visibilityTest(pPos, pTarget, pObstacles){
        let targetPos = pTarget.getCenterPosition();
        let vecLine = new Vector(targetPos.getX() - pPos.getX(), targetPos.getY() - pPos.getY(), 0);
        let distance = vecLine.magnitude();
        if (distance <= this.visibility){
            if (pObstacles == undefined){
                return true;
            }
            if (pObstacles.length == 0){
                return true;
            }
            for (var i = 0; i < pObstacles.length; i++){

                let vertices = pObstacles.getVertices();
                vecLine /= distance;
                //let dDistLine = vecLine.multiply(new Vector(pPos.getX(), pPos.getY()));
                let vecPerpendicularLine = new Vector(-vecLine.getY(), vecLine.getX());
                let dDistPerpendicularLine = vecPerpendicularLine.multiply(new Vector(pPos.getX(), pPos.getY()));

                /*
                    This is all 'simple' math but it confused me, from what I gather, it's basically
                    getting all 4 lines of a rectangle, and checking if the line between player + enemy
                    intersects any of these lines, if it does, the enemy CANNOT see the player
                */

                let dPerpLineDist1 = vecPerpendicularLine.multiply(vertices[0]).subtract(dDistPerpendicularLine);
                let dPerpLineDist2 = vecPerpendicularLine.multiply(vertices[1]).subtract(dDistPerpendicularLine);
                let dPerpLineDist3 = vecPerpendicularLine.multiply(vertices[2]).subtract(dDistPerpendicularLine);
                let dPerpLineDist4 = vecPerpendicularLine.multiply(vertices[3]).subtract(dDistPerpendicularLine);

                let dMinPerpLineDist = Math.min(dPerpLineDist1, dPerpLineDist2, dPerpLineDist3, dPerpLineDist4 );
                let dMaxPerpLineDist = Math.max(dPerpLineDist1,dPerpLineDist2,dPerpLineDist3,dPerpLineDist4);
                
                if (dMinPerpLineDist <= 0 && dMaxPerpLineDist <= 0 ||
                    dMinPerpLineDist >= 0 && dMaxPerpLineDist >= 0){
                        return true;
                }
                else{
                    return false;
                }
            }
        }
    }

    //This will move randomly if the enemy cannot see the player
    runRandom(pPos, pCanvas){
        while (true){
            let movement = Math.floor(Math.random() * 10);
            if (movement <= 5){
                movement = 10 -Math.random() *100;
            }
            else{
                movement = 10 + Math.random() *100;
            }
            let newVec = new Vector(pPos.getX() + movement, pPos.getY());
            let canvasWidth = pCanvas.width / 2 - 270;
            //let canvasHeight = pCanvas.height / 2 - 270;
            if (newVec.getX() <= canvasWidth && newVec.getX() >= 0){
                return newVec;
            }
        }
    }

    //This will move toward the player
    runMoving(pPos, pTarget, pCanvas){
        pTarget.getTransformedPosition().setTransform(pCanvas.getContext('2d'));
        let targetPos = pTarget.getPosition();
        if (targetPos.subtract(pPos).magnitude() <= 300){
            this.currentState = this.states[this.ATTACKING];
            return this.runAttacking(pTarget);
        }
        else{
            return targetPos;
        }
    }

    //If close enough, we'll also attack the player
    runAttacking(pTarget){
        return pTarget.getPosition();
    }

    getState(){
        return this.currentState;
    }
}