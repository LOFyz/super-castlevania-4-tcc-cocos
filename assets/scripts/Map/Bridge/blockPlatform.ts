/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
const { ccclass, property } = cc._decorator;

@ccclass
export default class blockPlatform extends cc.Component {
  private aux = 0;

  private isInContact = false;

  public onBeginContact(_contact: Event, _selfCollider: cc.BoxCollider, _otherCollider: cc.BoxCollider): void {
    if (_otherCollider.node.getComponent(cc.RigidBody).type === cc.RigidBodyType.Dynamic) {
      if (this.aux === 0) {
        this.getComponent(cc.Animation).play('bridge_block_platform');
      }
      this.isInContact = true;
      this.getComponent(cc.Animation).resume();
    }
  }

  public onEndContact(_contact: Event, _selfCollider: cc.BoxCollider, _otherCollider: cc.BoxCollider): void {
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
