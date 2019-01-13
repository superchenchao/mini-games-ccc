import {BarrierGroup} from "./BarrierGroup";
import {NodePool} from "./NodePool";

const {ccclass, property} = cc._decorator;

@ccclass
export class Barrier extends cc.Component {
    private group:BarrierGroup = null;

    theLastOne:boolean = false;     //不是最后一个障碍物

    init(group:BarrierGroup){
        this.group = group;
        this.node.rotation = 0;
        this.node.active = true;
        this.getComponent(cc.RigidBody).angularVelocity = 0;
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
        this.theLastOne = false;
    }
    onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 0://球碰到甜甜圈
                //this.main.onBallContactBrick(self.node, other.node);
                let worldManifold = contact.getWorldManifold();
                let points = worldManifold.points;
                // cc.log("point ---------- ||" + points);
                let velocity = cc.v2();
                this.node.getComponent(cc.RigidBody).getLinearVelocityFromWorldPoint(points[0], velocity);
                // cc.log("v ---------------- " + velocity);
                // cc.log("this.node.getComponent(cc.RigidBody).linearVelocity ==========  " + this.node.getComponent(cc.RigidBody).linearVelocity);
                // this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-velocity.x * 1, -velocity.y * 1);
                break;
            case 3: //甜甜圈之类的碰到了空气墙
                //
                // BarrierGroup.putNodePool(this.node);
                this.group.putNodePool(this.node);
                break;


        }
    }

    update(dt){
        if (this.theLastOne && this.node.getBoundingBox().yMax < cc.winSize.height-100) {
            this.group.produceNextBarrier = true;
            this.theLastOne = false;
        }
    }
}
