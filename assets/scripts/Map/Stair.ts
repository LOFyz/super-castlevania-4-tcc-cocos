import MainCharacter from '../Actor/Main_Character/MainCharacter';

/* eslint-disable no-param-reassign */
const { ccclass } = cc._decorator;

@ccclass
export default class Stair extends cc.Component {
  public steps = [];

  public contactDisabled = false;
  // public contactDisabled = true;

  public player: MainCharacter = null;

  public orientationX: number;

  public top: number;

  public start(): void {
    console.log(this.node.parent.convertToWorldSpaceAR(this.node.getPosition()).x / 2);

    for (let i = 0; i < this.node.parent.childrenCount; i += 1) {
      this.steps[i] = this.node.parent.getChildByName(`${i}`);
    }
    if (this.node.scaleX > 0) {
      this.orientationX = this.node.x + this.node.width;
    } else {
      this.orientationX = this.node.x;
    }
    this.top = this.node.parent.y + this.node.parent.height;
  }

  public onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider): void {
    contact.disabled = this.contactDisabled;
    if (otherCollider.tag === 2) {
      if (!this.contactDisabled && otherCollider.getComponent(MainCharacter)) {
        this.player = otherCollider.getComponent(MainCharacter);
        this.player.isInAStair = true;
        this.player.stairStep = this;
      }
      if (this.player) {
        contact.disabled = true;
        this.player.node.x = this.orientationX;
        this.player.node.y = this.node.y + 1;
        this.player.rigidBody.type = cc.RigidBodyType.Static;
      }
    }
  }

  public onEndContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider): void {
    if (!this.contactDisabled) {
      if (this.player) {
        contact.disabled = true;
        this.player.isInAStair = false;
        this.player.stairStep = null;
        this.player = null;
      }
    }
  }
}
