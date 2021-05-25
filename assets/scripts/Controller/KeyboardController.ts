const { ccclass } = cc._decorator;

@ccclass
export default abstract class KeyboardController extends cc.Component {
  public onLoad(): void {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }

  public abstract onKeyDown(e: cc.Event.EventKeyboard): void;

  public abstract onKeyUp(e: cc.Event.EventKeyboard): void;
}
