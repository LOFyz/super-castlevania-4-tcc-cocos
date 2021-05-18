// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { DIRECTION } from './DIRECTION';

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class Actor extends cc.Component {
	isJumping: boolean = false;

    get isInTheFloor() {
		return this.rigidBody.linearVelocity.y === 0 && this.isJumping===false;
	}

	@property(cc.Float)
	jumpForce: number = 0;

	@property(cc.Float)
	walkForce: number = 0;

	@property(cc.Float)
	maxSpeed: number = 0;

	rigidBody: cc.RigidBody;

	direction: DIRECTION = DIRECTION.IDLE;

	onLoad() {
		this.rigidBody = this.getComponent(cc.RigidBody);
	}

	start() {}

	// update (dt) {}
}
