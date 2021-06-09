/* eslint-disable dot-notation */
import DIRECTION from '../../Actor/DIRECTION';
import MainCharacter from '../../Actor/Main_Character/MainCharacter';
import KeyboardController from '../KeyboardController';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainCharacterController extends KeyboardController {
  @property(MainCharacter)
  public mainCharacter: MainCharacter = null;

  private keysPressed: Array<boolean> = [];

  public onKeyDown(event: cc.Event.EventKeyboard): void {
    switch (event.keyCode) {
      case cc.macro.KEY.space:
        this.keysPressed[event.keyCode] = true;
        break;
      case cc.macro.KEY.a || cc.macro.KEY.left:
        this.keysPressed[event.keyCode] = true;
        break;
      case cc.macro.KEY.d || cc.macro.KEY.right:
        this.keysPressed[event.keyCode] = true;
        break;
      case cc.macro.KEY.w:
        this.keysPressed[event.keyCode] = true;
        break;
      default:
    }
  }

  public onKeyUp(event: cc.Event.EventKeyboard): void {
    switch (event.keyCode) {
      case cc.macro.KEY.space:
        delete this.keysPressed[event.keyCode];
        break;
      case cc.macro.KEY.a || cc.macro.KEY.left:
        delete this.keysPressed[event.keyCode];
        this.mainCharacter.direction = 0;
        break;
      case cc.macro.KEY.d || cc.macro.KEY.right:
        delete this.keysPressed[event.keyCode];
        this.mainCharacter.direction = 0;
        break;
      case cc.macro.KEY.w:
        delete this.keysPressed[event.keyCode];
        break;
      default:
    }
  }

  public update(): void {
    if (cc.macro.KEY.a in this.keysPressed && !this.mainCharacter.isInAStair) {
      this.mainCharacter.move(DIRECTION.LEFT);
    }
    if (cc.macro.KEY.d in this.keysPressed && !this.mainCharacter.isInAStair) {
      this.mainCharacter.move(DIRECTION.RIGHT);
    }
    if (cc.macro.KEY.a in this.keysPressed && this.mainCharacter.isInAStair) {
      this.mainCharacter._stair.move(DIRECTION.LEFT);
    }
    if (cc.macro.KEY.d in this.keysPressed && this.mainCharacter.isInAStair) {
      this.mainCharacter._stair.move(DIRECTION.RIGHT);
    }
    if (cc.macro.KEY.space in this.keysPressed && !this.mainCharacter.isInAStair) {
      this.mainCharacter.jump();
    }
    if (this.mainCharacter._stair) {
      if (
        cc.macro.KEY.w in this.keysPressed &&
        (cc.macro.KEY.d in this.keysPressed || cc.macro.KEY.a in this.keysPressed) &&
        !this.mainCharacter._stair.turn
      ) {
        this.mainCharacter._stair.turn = true;
        this.mainCharacter._stair.inAStair();
      }
      if (
        !(
          cc.macro.KEY.w in this.keysPressed &&
          (cc.macro.KEY.d in this.keysPressed || cc.macro.KEY.a in this.keysPressed)
        ) &&
        this.mainCharacter._stair.turn &&
        !this.mainCharacter.isInAStair
      ) {
        this.mainCharacter._stair.turn = false;
      }
    }
  }
}
