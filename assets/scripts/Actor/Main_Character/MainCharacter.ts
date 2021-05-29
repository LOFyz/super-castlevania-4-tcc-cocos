import Actor from '../Actor';
import DIRECTION from '../DIRECTION';

const { ccclass } = cc._decorator;
@ccclass
export default class MainCharacter extends Actor {
  public move(direction: DIRECTION): void {
    this.direction = direction;
    if (
      (this.direction > 0 && this.rigidBody.linearVelocity.x < this.maxSpeed) ||
      (this.direction < 0 && this.rigidBody.linearVelocity.x > -this.maxSpeed)
    ) {
      this.rigidBody.applyForceToCenter(cc.v2(this.direction * this.walkForce, 0), true);
    }
  }
}
