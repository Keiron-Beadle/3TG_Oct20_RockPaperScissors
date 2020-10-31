class SceneGraphNode{
    constructor(pTag){
        this.tag = pTag;
        this.type = "SceneGraph";
    }

    setType(pType){
        this.type = pType;
    }

    getType(){
        return this.type;
    }

    accept(pVisitor, mainContext){
        pVisitor.visit(this, mainContext);
    }
}