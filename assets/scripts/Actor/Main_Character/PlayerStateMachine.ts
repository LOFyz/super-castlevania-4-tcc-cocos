/* eslint-disable no-empty */
import StateMachine from '../../../utils/StateMachine';
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

  public downStairs(): void {
    this.actor.state = PLAYER_STATES.Downstairs;
  }

  public upStairs(): void {
    this.actor.state = PLAYER_STATES.Upstairs;
  }

  public update(): void {
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
}
