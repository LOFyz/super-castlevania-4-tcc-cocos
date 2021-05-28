import DIRECTION from '../../Actor/DIRECTION';
import MainCharacter from '../../Actor/Main_Character/MainCharacter';
import KeyboardController from '../KeyboardController';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainCharacterController extends KeyboardController {
  @property
  private mainCharacter: MainCharacter = null;

  private keysPressed: Array<boolean> = [];

  public onKeyDown(e: cc.Event.EventKeyboard): void {
    this.keysPressed[cc.macro.KEY[e.keyCode]] = true;
  }

  public onKeyUp(e: cc.Event.EventKeyboard): void {
    delete this.keysPressed[cc.macro.KEY[e.keyCode]];
  }

  public update(): void {
    if (cc.macro.KEY.a || cc.macro.KEY.left in this.keysPressed) {
      this.mainCharacter.move(DIRECTION.LEFT);
    }
    if (cc.macro.KEY.d || cc.macro.KEY.right in this.keysPressed) {
      this.mainCharacter.move(DIRECTION.RIGHT);
    }
  }
}
