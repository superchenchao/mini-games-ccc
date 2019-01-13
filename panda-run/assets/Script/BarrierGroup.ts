import {Main} from "./Main";
import {BarrierScroll} from "./BarrierScroll";

const {ccclass, property} = cc._decorator;

@ccclass
export class BarrierGroup extends cc.Component {
    //零号出生位置
    @property(cc.Prefab)
    platform_group_1:cc.Prefab[] = [];

    @property(cc.Prefab)
    platform_group_2:cc.Prefab[] = [];

    @property(cc.Prefab)
    platform_group_3:cc.Prefab[] = [];

    @property(cc.Node)
    platform_default:cc.Node = null;

    @property(cc.Node)
    birth_node_group:cc.Node[] = []

    platform_all:Array<cc.Prefab[]> = new Array<cc.Prefab[]>()

    // speed:number = Main.barrierSpeed;
    screenWidth:number = 0;

    //存储在屏幕范围内移动的障碍物
    barrier_list:BarrierScroll[] = []

    onLoad(){
        this.screenWidth = cc.winSize.width;
        this.platform_default.getComponent(BarrierScroll).birthIndex = 0;
        this.barrier_list.push(this.platform_default.getComponent(BarrierScroll));

        this.platform_all = [this.platform_group_1, this.platform_group_2, this.platform_group_3]
    }

    update(dt){

        for (let i = 0; i < this.node.childrenCount; i++) {

            let box = this.node.children[i].getBoundingBox();
            let index = this.barrier_list.indexOf(this.node.children[i].getComponent(BarrierScroll));

            let interval = Math.random() * 150;

            if (box.xMax < this.screenWidth && index != -1) {

                //生产下一个障碍物的位置
                let preBarrierIndex = this.barrier_list[index].birthIndex;  //现在屏幕中的障碍物出生的位置
                let nextBarrierIndex = Math.floor(Math.random() * this.birth_node_group.length);   //马上要生成的障碍物的位置

                cc.log("下一个障碍物出生的位置 ------ " + nextBarrierIndex);


                let randomPlatform = Math.floor(Math.random() * this.platform_all[nextBarrierIndex].length)
                let p = cc.instantiate(this.platform_all[nextBarrierIndex][randomPlatform]).getComponent(BarrierScroll);
                p.birthIndex = nextBarrierIndex;
                p.node.setAnchorPoint(0,0);
                this.node.addChild(p.node);
                p.node.y = this.birth_node_group[nextBarrierIndex].getPosition().y;
                p.node.x = this.birth_node_group[nextBarrierIndex].getPosition().x + interval;
                cc.log(" barrier x 位置 ----- " + p.node.x);

                this.barrier_list.splice(index, 1);
                this.barrier_list.push(p)
            }

            if (box.xMax < 0) {
                this.node.children[i].removeFromParent();
            }

        }
    }

}
