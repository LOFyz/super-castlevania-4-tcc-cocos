const { ccclass } = cc._decorator;

@ccclass
export default class BlockPlatform extends cc.Component {
  private aux = 0;

  private isInContact = false;

  public onBeginContact(_otherCollider: cc.BoxCollider): void {
    if (_otherCollider.node.getComponent(cc.RigidBody).type === cc.RigidBodyType.Dynamic) {
      if (this.aux === 0) {
        this.getComponent(cc.Animation).play('bridge_block_platform');
      }
      if (this.aux !== 0) {
        this.getComponent(cc.Animation).resume();
      }
      this.isInContact = true;
    }
  }

  public onEndContact(): void {
    this.isInContact = false;
    this.getComponent(cc.Animation).pause();
  }

  public update(dt: number): void {
    if (this.isInContact === true && this.aux > 3) {
      this.aux = 0;
      this.node.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
      this.scheduleOnce(() => {
        this.node.destroy();
      }, 2);
    } else if (this.isInContact === true) {
      this.aux += dt;
    }
  }
}
