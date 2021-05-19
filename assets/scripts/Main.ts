const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    physicsManager: cc.PhysicsManager;
    collisionManager: cc.CollisionManager;
    onLoad () {
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager.enabled = true;
        this.physicsManager.gravity = cc.v2(0, -2000);

        this.collisionManager = cc.director.getCollisionManager();
        this.collisionManager.enabled = true;
    }

}
