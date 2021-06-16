/* eslint-disable no-empty */
import StateMachine from '../../../utils/StateMachine';
import DIRECTION from '../DIRECTION';
import MainCharacter from './MainCharacter';
import PLAYER_STATES from './PLAYER_STATES';

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerStateMachine extends StateMachine<PLAYER_STATES, MainCharacter> {
  @property(MainCharacter)
  protected actor: MainCharacter = null;

  public onAnimationStart(): void {
    console.log();
  }

  public onAnimationEnd(): void {
    console.log();
  }

  public update(): void {
    if (!this.actor.isInAStair) {
      if (this.actor.isJumping && this.actor.state !== PLAYER_STATES.Jumping) {
        this.actor.state = PLAYER_STATES.Jumping;
      }

      if (!this.actor.isJumping && this.actor.state === PLAYER_STATES.Jumping) {
        this.actor.state = PLAYER_STATES.Idle;
      }

      if (this.actor.isWalking && !this.actor.isJumping && this.actor.state !== PLAYER_STATES.Walking) {
        this.actor.state = PLAYER_STATES.Walking;
      }

      if (!this.actor.isWalking && !this.actor.isJumping && this.actor.state !== PLAYER_STATES.Idle) {
        this.actor.state = PLAYER_STATES.Idle;
      }
    } else {
      if (
        this.actor.node.y <= this.actor.stairStep.top
        // &&
        // this.actor.stairStep.orientationX === this.actor.stairStep.node.x &&
        // this.actor.facing === DIRECTION.RIGHT
      ) {
        this.actor.state = PLAYER_STATES.UpstairsIdle;
      }

      if (
        this.actor.node.y >= this.actor.stairStep.top
        // &&
        // this.actor.stairStep.orientationX === this.actor.stairStep.node.x &&
        // this.actor.facing === DIRECTION.LEFT
      ) {
        this.actor.state = PLAYER_STATES.DownstairsIdle;
      }
    }
  }
}
