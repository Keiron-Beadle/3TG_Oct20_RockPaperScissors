class EnemyAI{
    constructor(){
        this.currentGoal = new Vector(100,0);
        const RANDOM = 0;
        const MOVING = 1;
        const ATTACKING = 2;
        this.states = ["Random", "Moving", "Attacking"];
        this.currentState = this.states[RANDOM];
    }

    update(pPos, pTarget){
        if (this.currentGoal != null){
            this.moveToGoal(pPos);
            return;
        }
        switch(this.currentState){
            case this.states[RANDOM]:
                runRandom(pPos);
                break;
            case this.states[MOVING]:
                runMoving(pPos, pTarget);
                break;
            case this.states[ATTACKING]:
                runAttacking(pPos, pTarget);
                break
        }
    }

    moveToGoal(pPos){
        if (pPos.getX() < this.currentGoal.getX()){
            pPos.setX(pPos.getX()+1);
        }
        else if (pPos.getX() > this.currentGoal.getX()){
            pPos.setX(pPos.getX()-1);
        }
    }

    runRandom(pPos){
        
    }

    runMoving(pPos){

    }

    runAttacking(pPos){

    }
}