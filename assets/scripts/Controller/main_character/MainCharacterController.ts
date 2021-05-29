/* eslint-disable dot-notation */
/* eslint-disable default-case */
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
        this.mainCharacter.jump();
        break;
      case cc.macro.KEY.a || cc.macro.KEY.left:
        this.keysPressed['LEFT'] = true;
        break;
      case cc.macro.KEY.d || cc.macro.KEY.right:
        this.keysPressed['RIGHT'] = true;
        break;
    }
  }

  public onKeyUp(event: cc.Event.EventKeyboard): void {
    switch (event.keyCode) {
      case cc.macro.KEY.a || cc.macro.KEY.left:
        delete this.keysPressed['LEFT'];
        break;
      case cc.macro.KEY.d || cc.macro.KEY.right:
        delete this.keysPressed['RIGHT'];
        break;
    }
  }

  public update(): void {
    if ('LEFT' in this.keysPressed) {
      this.mainCharacter.move(DIRECTION.LEFT);
    }
    if ('RIGHT' in this.keysPressed) {
      this.mainCharacter.move(DIRECTION.RIGHT);
    }
  }
}
