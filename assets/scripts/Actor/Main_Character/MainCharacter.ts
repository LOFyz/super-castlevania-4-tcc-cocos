import Actor from '../Actor';
import DIRECTION from '../DIRECTION';

const { ccclass } = cc._decorator;
@ccclass
export default class MainCharacter extends Actor {
  private facing: DIRECTION = DIRECTION.RIGHT;

  public move(direction: DIRECTION): void {
    if (direction !== this.facing && direction !== DIRECTION.IDLE) {
      this.reface(direction);
    }
    this.direction = direction;
    if (
      (this.direction > 0 && this.rigidBody.linearVelocity.x < this.maxSpeed) ||
      (this.direction < 0 && this.rigidBody.linearVelocity.x > -this.maxSpeed)
    ) {
      this.rigidBody.applyForceToCenter(cc.v2(this.direction * this.walkForce, 0), true);
    }
  }

  public get isMoving(): boolean {
    return this.rigidBody.linearVelocity.x !== 0;
  }

  public jump(): void {
    if (this.isInTheFloor) {
      this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true);
      this.isJumping = true;
    }
  }

  public onBeginContact(e: Event, selfCollider: cc.Collider): void {
    if (selfCollider.tag === 2) {
      this.isJumping = false;
    }
  }

  public reface(direction: DIRECTION): void {
    // eslint-disable-next-line operator-assignment
    this.node.scaleX = this.node.scaleX * -1;
    this.facing = direction;
  }
}
