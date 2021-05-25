const { ccclass } = cc._decorator;

@ccclass
export default class BlockPlatform extends cc.Component {
  public onBeginContact(_otherCollider: cc.BoxCollider): void {
    if (_otherCollider.node.getComponent(cc.RigidBody).type === cc.RigidBodyType.Dynamic) {
      this.getComponent(cc.Animation).play('bridge_block_platform');
    }
  }

  public onAnimationEnd(): void {
    this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 2);
  }
}
