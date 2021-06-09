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
    console.log('a');
  }

  public onAnimationEnd(): void {
    console.log('a');
  }

  public downStairs(top: number): void {
    this.actor.isInAStair = true;
    this.actor.state = PLAYER_STATES.DownstairsIdle;
  }

  public upStairs(top: number): void {
    this.actor.isInAStair = true;
    this.actor.state = PLAYER_STATES.UpstairsIdle;
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
    }
    // if (this.actor.isInAStair) {
    //   if()

    // }
  }
}
