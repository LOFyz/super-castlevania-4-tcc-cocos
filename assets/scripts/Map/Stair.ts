/* eslint-disable no-param-reassign */
const { ccclass } = cc._decorator;

@ccclass
export default class Stair extends cc.Component {
  public steps = [];

  public start(): void {
    for (let i = 0; i < this.node.parent.childrenCount; i += 1) {
      this.steps[i] = this.node.parent.getChildByName(`${i}`);
    }
  }

  public onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider): void {
    contact.disabled = true;
    console.log('a');
  }
}
