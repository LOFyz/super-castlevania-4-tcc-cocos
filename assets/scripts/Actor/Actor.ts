import DIRECTION from './DIRECTION';

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Actor extends cc.Component {
  public isJumping = false;

  public get isInTheFloor(): boolean {
    return !this.isJumping;
  }

  @property(cc.Float)
  public jumpForce = 0;

  @property(cc.Float)
  public walkForce = 0;

  @property(cc.Float)
  public maxSpeed = 0;

  public rigidBody: cc.RigidBody;

  public direction: DIRECTION = DIRECTION.IDLE;

  public onLoad(): void {
    this.rigidBody = this.getComponent(cc.RigidBody);
  }
}
