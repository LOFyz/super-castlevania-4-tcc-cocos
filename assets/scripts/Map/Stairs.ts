import DIRECTION from '../Actor/DIRECTION';
import MainCharacter from '../Actor/Main_Character/MainCharacter';
import PlayerStateMachine from '../Actor/Main_Character/PlayerStateMachine';

const { ccclass } = cc._decorator;

@ccclass
export default class Stairs extends cc.Component {
  public stairCollider: cc.PhysicsChainCollider = null;

  public player: MainCharacter = null;

  private top: number;

  public _turn = false;

  public start(): void {
    this.stairCollider = this.getComponent(cc.PhysicsChainCollider);
    this.top = this.node.y + this.node.height;
  }

  public get turn(): boolean {
    return this._turn;
  }

  public set turn(isWalkable: boolean) {
    // if (this.player.node.x <= this.node.x + 10 && this.player.node.x >= this.node.x - 10) {
    //   this.stairCollider.enabled = isWalkable;
    // }
    this._turn = isWalkable;
  }

  public inAStair(): void {
    if (this.top <= this.player.node.y) {
      this.player.getComponent(PlayerStateMachine).downStairs(this.top);
    } else {
      this.player.getComponent(PlayerStateMachine).upStairs(this.top);
    }
  }

  public move(direction: DIRECTION): void {
    if (direction !== this.player.facing && direction !== DIRECTION.IDLE) {
      this.player.reface(direction);
    }
    this.player.direction = direction;
    if (
      (this.player.direction > 0 && this.player.rigidBody.linearVelocity.x < this.player.maxSpeed) ||
      (this.player.direction < 0 && this.player.rigidBody.linearVelocity.x > -this.player.maxSpeed)
    ) {
      this.player.rigidBody.applyForceToCenter(cc.v2(this.player.direction * this.player.walkForce, 0), true);
    }
  }

  public onBeginContact(e: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider): void {
    e.disabled = !this.turn;
    if (otherCollider.getComponent(MainCharacter)) {
      this.player = otherCollider.getComponent(MainCharacter);
      this.player._stair = this;
      this.player.getComponent(cc.RigidBody).gravityScale = 0;
    }
  }

  public onEndContact(e: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider): void {
    e.disabled = !this.turn;
    if (otherCollider.getComponent(MainCharacter)) {
      this.player = otherCollider.getComponent(MainCharacter);
      this.player._stair = null;
      this.player.getComponent(cc.RigidBody).gravityScale = 1;
    }
    this.player.isInAStair = false;
  }
}
