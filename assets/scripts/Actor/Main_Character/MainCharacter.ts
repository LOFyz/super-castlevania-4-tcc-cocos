import Stairs from '../../Map/Stairs';
import Actor from '../Actor';
import DIRECTION from '../DIRECTION';
import PLAYER_STATES from './PLAYER_STATES';

const { ccclass } = cc._decorator;
@ccclass
export default class MainCharacter extends Actor {
  public facing: DIRECTION = DIRECTION.RIGHT;

  private _state: PLAYER_STATES = PLAYER_STATES.Idle;

  public isInAStair = false;

  public _stair: Stairs = null;

  public get state(): PLAYER_STATES {
    return this._state;
  }

  public set state(newState: PLAYER_STATES) {
    if (newState !== this._state) {
      this.getComponent(cc.Animation).play(newState);
      this._state = newState;
    }
  }

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

  public get isWalking(): boolean {
    return this.direction !== 0;
  }

  public jump(): void {
    if (!this.isJumping && !this._stair) {
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
