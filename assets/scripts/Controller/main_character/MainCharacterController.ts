import KeyboardController from '../KeyboardController';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainCharacterController extends KeyboardController {
  @property
  // Será mudado quando o codigo do personagem for criado
  private character: cc.Node = null;

  private keysPressed: Array<boolean> = [];

  public onKeyDown(e: cc.Event.EventKeyboard): void {
    this.keysPressed[cc.macro.KEY[e.keyCode]] = true;
  }

  public onKeyUp(e: cc.Event.EventKeyboard): void {
    delete this.keysPressed[cc.macro.KEY[e.keyCode]];
  }

  public update(): void {
    // if (cc.macro.KEY.a in this.keysPressed){
    //   função
    // }
  }
}
