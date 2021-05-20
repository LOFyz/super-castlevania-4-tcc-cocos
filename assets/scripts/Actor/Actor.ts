import DIRECTION from './DIRECTION';

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Actor extends cc.Component {
  protected isJumping = false;

  public get isInTheFloor(): boolean {
    return this.rigidBody.linearVelocity.y === 0 && this.isJumping === false;
  }

  @property(cc.Float)
  public jumpForce = 0;

  @property(cc.Float)
  public walkForce = 0;

  @property(cc.Float)
  public maxSpeed = 0;

  protected rigidBody: cc.RigidBody;

  protected direction: DIRECTION = DIRECTION.IDLE;

  public onLoad(): void {
    this.rigidBody = this.getComponent(cc.RigidBody);
  }
}
