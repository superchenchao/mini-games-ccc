import {Main} from "./Main";
import {BarrierNodePool} from "./BarrierNodePool";
import {NodePool} from "./NodePool";
import {Data} from "./Data";
import {Barrier} from "./Barrier";

const {ccclass, property} = cc._decorator;

@ccclass
export class BarrierGroup extends cc.Component {
    private main:Main = null;

    @property(BarrierNodePool)
    node_pool:BarrierNodePool[] = [];

    @property(cc.Node)
    birth_pos:cc.Node = null;

    private isDonut:boolean = true;     //本次产生甜甜圈
    startProduceBarrier:boolean = false; //没有开始生产甜甜圈之类的
    private intervalTime:number = 0; //产生甜甜圈等的间隔时间
    private allTime:number = 0;     //总耗时
    produceNextBarrier:boolean = false;     //开始生产下个障碍物

    onLoad(){
        NodePool.batchInitObjPool(this, this.node_pool);

    }

    init(main:Main){
        this.main = main;
        this.isDonut = true;
        this.startProduceBarrier = true;
        this.allTime = 0;
        this.intervalTime = Data.intervalTime;
        this.produceNextBarrier = true;
        this.node.stopAllActions();
    }

    putNodePool(node){

        NodePool.backObjPool(this, node);
    }

    update(dt){
        let temp:number = 0;

        this.allTime += dt;
        //不同时间断，出现不同数量的障碍物
        if (this.allTime > 150) {
            // Data.barrierCount;
            temp = 250;
        }else if (this.allTime > 50) {
            temp = 150;
        }else if (this.allTime > 0) {
            temp = 50;
        }

        // this.intervalTime += dt;
        if (this.startProduceBarrier) {
            if (this.produceNextBarrier) {
                cc.log("生产障碍物 -------------------- ");
                this.produceNextBarrier = false;
                let fun = cc.callFunc(()=>{
                    //生成甜甜圈
                    if (this.isDonut) {
                        let obj = Data.barrierCount[temp +""].donut;
                        let arr = Object.keys(obj);
                        for (let i = 0; i < arr.length; i++) {
                            for (let j = 0; j < obj[arr[i]]; j++) {
                                let produceAreaX = Math.floor(Math.random()*21+(this.birth_pos.x-10));
                                let produceAreaY = Math.floor(Math.random()*21+(this.birth_pos.y-10));

                                let newNode = NodePool.genNewNode(this["donut_"+arr[i]+"Pool"], this.node_pool[arr[i]].prefab, this.node);
                                newNode.getComponent(Barrier).init(this);
                                newNode.x = produceAreaX;
                                newNode.y = produceAreaY;

                                //当前批次的最后一个障碍物
                                if (i == arr.length -1 && j == obj[arr[arr.length -1]] - 1) {
                                    this.isDonut = false;
                                    cc.log("下次生产砖块 ================= ")
                                    newNode.getComponent(Barrier).theLastOne = true;
                                }
                            }
                        }

                    }else{
                        let obj = Data.barrierCount[temp +""].brick;
                        for (let j = 0; j < 2; j++) {

                            for (let i = 0; i < obj["0"]; i++) {
                                let newNode = NodePool.genNewNode(this["brick" + "Pool"], this.node_pool[0].prefab, this.node);
                                newNode.getComponent(Barrier).init(this);
                                if (j == 0) {
                                    newNode.x = this.birth_pos.x - newNode.width / 2;
                                }else {
                                    newNode.x = this.birth_pos.x + newNode.width / 2;
                                }
                                newNode.y = this.birth_pos.y + newNode.height * i;

                                //当前批次的最后一个障碍物
                                if (j ===1 && i === obj["0"] - 1) {
                                    this.isDonut = true;
                                    cc.log("下次生产甜甜圈 ================= ")
                                    newNode.getComponent(Barrier).theLastOne = true;
                                }
                            }
                        }
                    }
                });

                this.node.runAction(cc.sequence(cc.delayTime(0), fun));


                this.intervalTime = 0;
            }
        }
    }
}
