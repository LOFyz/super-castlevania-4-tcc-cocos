import MainCharacter from '../Actor/Main_Character/MainCharacter';

/* eslint-disable no-param-reassign */
const { ccclass } = cc._decorator;

@ccclass
export default class Stair extends cc.Component {
  public steps = [];

  public contactDisabled = true;

  public player: MainCharacter = null;

  public orientationX: number;

  public start(): void {
    for (let i = 0; i < this.node.parent.childrenCount; i += 1) {
      this.steps[i] = this.node.parent.getChildByName(`${i}`);
    }
    if (this.node.scaleX > 0) {
      this.orientationX = this.node.x + this.node.width;
    } else {
      this.orientationX = this.node.x;
    }
  }

  public onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider): void {
    contact.disabled = this.contactDisabled;
    if (!this.contactDisabled) {
      if (otherCollider.getComponent(MainCharacter)) {
        this.player = otherCollider.getComponent(MainCharacter);
      }
      this.player.isInAStair = true;
    }
  }

  public onEndContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider): void {
    contact.disabled = true;
    this.player.isInAStair = false;
    this.player = null;
  }
}
