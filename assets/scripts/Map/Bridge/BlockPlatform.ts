const { ccclass, property } = cc._decorator;

@ccclass
export default class BlockPlatform extends cc.Component {
  @property(cc.Node)
  public player: cc.Node = null;

  public onBeginContact(): void {
    this.getComponent(cc.Animation).play('bridge_block_platform');
  }

  public onAnimationEnd(): void {
    this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
    this.scheduleOnce(() => {
      this.node.destroy();
    }, 2);
  }
}
