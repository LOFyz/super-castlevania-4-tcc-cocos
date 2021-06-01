const { ccclass, property } = cc._decorator;

@ccclass
export default class Camera extends cc.Component {
  @property(cc.Node)
  public player: cc.Node = null;

  @property(cc.Node)
  public map: cc.Node = null;

  public limits: Array<number> = [];

  public _targetPosition: number;

  public get targetPosition(): number {
    return this._targetPosition;
  }

  public set targetPosition(value: number) {
    this._targetPosition = value;
    this.node.x = cc.misc.clampf(cc.misc.lerp(this.node.x, value, 0.2), this.limits[0], this.limits[1]);
  }

  public start(): void {
    this.node.x = this.player.x;
    this.limits[0] = this.node.parent.convertToNodeSpaceAR(this.map.getPosition()).x;
    this.limits[1] = this.map.width * this.map.scaleX - this.node.parent.width;
  }

  public update(): void {
    if (this.targetPosition !== this.player.x) {
      this.targetPosition = this.player.x;
    }
  }
}
