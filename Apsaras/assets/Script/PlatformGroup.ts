import {Platform} from "./Platform";
import {Main} from "./Main";
import {PlatformNodePool} from "./PlatformNodePool";
import {NodePool} from "./NodePool";

const {ccclass, property} = cc._decorator;

@ccclass
export class PlatformGroup extends cc.Component {
    @property(cc.Prefab)
    platform_green:cc.Prefab = null;
    @property(PlatformNodePool)
    node_pool:PlatformNodePool[] = []

    onLoad(){
        NodePool.batchInitObjPool(this, this.node_pool);
    }

    update(dt){
        //if (Main.instance().momentCollision) {
            //for (let i = 0; i < this.node.childrenCount; i++) {
                // if((cc.winSize.height - this.node.children[i].y) > (Main.instance().high_pos.y - Main.instance().start_pos.y))
            // cc.log("this.node.children[this.node.childrenCount - 1].getBoundingBox().yMax ------ " + this.node.children[this.node.childrenCount - 1].getBoundingBox().yMax);
            // cc.log("cc.winSize.height - Main.instance().start_pos.y ---" + (cc.winSize.height - Main.instance().start_pos.y));
            // if (this.node.children[this.node.childrenCount - 1].getBoundingBox().yMax <= cc.winSize.height - Main.instance().start_pos.y)
            // {
            //     cc.log("生成了 一个platform ---------------")
            //     let newNode = cc.instantiate(this.platform_green);
            //     newNode.setAnchorPoint(0,0);
            //     this.node.addChild(newNode);
            //     newNode.y = cc.winSize.height-this.node.children[0].height;
            //     newNode.x = Math.floor(Math.random() * (cc.winSize.width - this.node.children[0].width));
            //     Main.instance().momentCollision = false;
            // }

        if (Math.round(this.node.children[0].getBoundingBox().yMax) <= 0) {
            cc.log("this.node.children[0].getBoundingBox().yMax ================ " + this.node.children[0].getBoundingBox().yMax);
            Main.instance().moveDiatance += 3;
            this.node.children[0].getComponent(Platform).collisionTimes = 0;    //放回对象池后，不重置默认值？？需手动重置
            this.node.children[0].opacity = 255;
            if (this.node.children[0].getComponent(Platform).birthNodePool) {
                NodePool.backObjPool(this, this.node.children[0]);
            }else{
                this.node.children[0].removeFromParent();
            }


            cc.log("newNode.y ----------" + (this.node.children[this.node.childrenCount - 1].y + Main.instance().start_pos.y));
            let randomNum = Math.floor(Math.random() * this.node_pool.length);
            let nodePoolName = this.node_pool[randomNum].nodePoolName + "Pool";
            let newNode = NodePool.genNewNode(this[nodePoolName], this.node_pool[randomNum].prefab, this.node);
            // let newNode = cc.instantiate(this.platform_green);
            newNode.setAnchorPoint(0,0);
            // this.node.addChild(newNode);
            newNode.y =Math.round(this.node.children[this.node.childrenCount - 2].y + Main.instance().start_pos.y+this.node.children[0].height) ;
            newNode.x = Math.floor(Math.random() * (cc.winSize.width - this.node.children[0].width));
            // Main.instance().momentCollision = false;
        }
    }
}
