class RenderVisitor{
    constructor(pMainContext){
        this.stack = [];
        this.mainContext = pMainContext;
    }

    visit(pNode){
        switch (pNode.getType()){
            case "Group":
                visitGroup(pNode);
                break;
            
            case "Transform":
                visitTransform(pNode);
                break;

            case "Geometry":
                visitGeometry(pNode);
                break;
        }
    }

    visitGroup(pNode){
        var child;
        for (var i = 0; i < pNode.getNumberOfChildren(); i++){
            child = pNode.getChildAt(i);
            child.accept(this, this.mainContext);
        }
    }

    visitTransform(pNode){
        this.pushTransform(pNode.getLocalTransform());
        this.visitGroup(pNode);
        this.popTransform();
    }

    visitGeometry(pNode){
        pNode.draw(this.mainContext, this);
    }

    pushTransform(pTransform){
        if (this.stack.length == 0){
            this.stack.push(pTransform);
        }
        else{
            var newTransform = this.peekTransform().multiply(pTransform);
            this.stack.push(newTransform);
        }
    }

    peekTransform(){
        return this.stack[this.stack.length-1];
    }

    popTransform(){
        return this.stack.pop();
    }
}