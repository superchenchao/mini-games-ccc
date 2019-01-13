import {Data} from "./Data";
import {Barrier} from "./Barrier";
import {Medicine} from "./Medicine";
import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class BarrierGroup extends cc.Component {
    @property(cc.Node)
    barrier_box:cc.Node = null;

    @property(cc.Node)
    medicine_box:cc.Node = null;

    @property(cc.Prefab)
    medicine_prefab:cc.Prefab = null;

    private isProduceMedicine:boolean = false;      //没有生成出药

    private medicinePool:cc.NodePool = null;
    private medicineInitialPos:cc.Vec2 = cc.v2();
    public isPause:boolean = true;
    private main:Main = null;

    onLoad(){
        this.medicinePool = new cc.NodePool("Medicine");
        this.medicineInitialPos = this.medicine_box.getPosition();

        this.schedule(this.randomProduceMedicine,2.5);
    }

    init(m:Main){
        this.main = m;
    }

    randomProduceMedicine(){
        //生产药品

        if (!this.isProduceMedicine ) {
            if(this.barrier_box.getBoundingBox().xMin > 0 && this.barrier_box.getBoundingBox().xMax < cc.winSize.width) {
                let random =Math.floor(Math.random() * 100);
                cc.log("随机数 ---是否药品--------",random);
                if (random < Data.randomMedicine) {
                    this.isProduceMedicine = true;
                    let newNode = null;
                    if (this.medicinePool.size() > 0) {
                        newNode = this.medicinePool.get(this);
                        newNode.active = true;
                    } else {
                        newNode = cc.instantiate(this.medicine_prefab);
                    }
                    this.medicine_box.addChild(newNode);
                    newNode.getComponent(Medicine).init();
                    let randomY = Math.floor(Math.random() * this.medicine_box.height);
                    // cc.log("药的位置 ---------",randomY);
                    newNode.y = randomY;
                    newNode.x = 0;
                }
            }
        }
    }

    update(dt){
        // cc.log("this.barrier_box.x =========",this.barrier_box.x)
        if (this.isPause) {
            if (this.barrier_box.getBoundingBox().xMax < 0) {
                Data.isProduceState = true; //处于生成障碍物状态
                this.barrier_box.x = cc.winSize.width;
                for (let i = 0; i < this.barrier_box.childrenCount; i++) {
                    this.barrier_box.children[i].getChildByName("barrier").active = true;
                    this.barrier_box.children[i].getChildByName("barrier").getComponent(Barrier).maxNum += 1;
                    this.barrier_box.children[i].getChildByName("barrier").getComponent(Barrier).randomBarrier(1);
                    this.barrier_box.children[i].getChildByName("barrier").getComponent(Barrier).resetBarrier();
                }

                //极小概率随机生产一个特殊方块
                let random = Math.floor(Math.random() * 100);
                cc.log("是否 特殊方块 ---",random);
                if (random < Data.randomSquare) {
                    let randomIndex = Math.floor(Math.random() * this.barrier_box.childrenCount);
                    this.barrier_box.children[randomIndex].getChildByName("barrier").getComponent(Barrier).produceSpecialBarrier();
                }
            }else{
                this.barrier_box.x -= dt * Data.barrierSpeedX;
            }


            if (this.isProduceMedicine) {
                this.medicine_box.x -= dt * Data.barrierSpeedX;
                if (this.medicine_box.getBoundingBox().xMax < 0) {
                    this.medicine_box.position = this.medicineInitialPos;
                    this.medicinePool.put(this.medicine_box.children[0]);

                    this.isProduceMedicine = false;
                }
            }
        }


    }
}
