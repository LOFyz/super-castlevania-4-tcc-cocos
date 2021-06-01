const { ccclass, property } = cc._decorator;

@ccclass
export default class Camera extends cc.Component {
  @property(cc.Node)
  public player: cc.Node = null;

  public _targetPosition: number;

  public get targetPosition(): number {
    return this._targetPosition;
  }

  public set targetPosition(value: number) {
    this._targetPosition = value;
    this.node.x = cc.misc.lerp(this.node.x, value, 0.2);
  }

  public start(): void {
    this.node.x = this.player.x;
  }

  public update(): void {
    if (this.targetPosition !== this.player.x) {
      this.targetPosition = this.player.x;
    }
  }
}
