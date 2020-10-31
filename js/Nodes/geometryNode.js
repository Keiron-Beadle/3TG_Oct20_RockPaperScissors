class GeometryNode extends SceneGraphNode{
    constructor(pTag, pGeometry){
        super(pTag);
        super.setType("Geometry");
        this.geometry = pGeometry;
    }

    draw(pMainContext, pRenderVisitor){
        pRenderVisitor.peekTransform().setTransform(pMainContext);
        this.geometry.draw(pMainContext);
    }
}