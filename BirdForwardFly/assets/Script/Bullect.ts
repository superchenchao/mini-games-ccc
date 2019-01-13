import {Data} from "./Data";
import {Bird} from "./Bird";
import {Barrier} from "./Barrier";
import {BullectFlyArea} from "./BullectFlyArea";
import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export class Bullect extends cc.Component {
    private bullectArea:BullectFlyArea = null;

    bullectPower:number = Data.bullectPower;

    onLoad(){
    }

    init(bullectArea:BullectFlyArea){
        this.bullectArea = bullectArea;
        this.node.scale = 1;
        this.bullectPower = Data.bullectPower;
    }

    // 只在两个碰撞体开始接触时被调用一次
    onCollisionEnter (other, self) {
        //cc.log("子弹击中物体 --------------");
        if (other.tag == 1) {
            this.bullectArea.putNodePool(this.node);
            //子弹碰撞到障碍物
            if (Data.isGameOver) {
                this.bullectPower = 0;
            }

            if (other.node.getComponent(Barrier).figure > this.bullectPower) {
                other.node.getComponent(Barrier).changeFigure(this.bullectPower);
            }else{
                other.node.getComponent(Barrier).playAnim();
                other.node.active = false;
                // cc.log("other.node.getComponent(Barrier).especiallyBarrier",other.node.getComponent(Barrier).especiallyBarrier);
                // cc.log("Data.bullectSuperSpeed",Data.bullectSuperSpeed);
                if (other.node.getComponent(Barrier).especiallyBarrier == 1 && !Data.bullectSuperSpeed) {
                    cc.log("super speed ---------------------------");
                    //攻速加到最大！！！
                    Data.bullectSuperSpeed = true;
                    // let tempAttackSpeed = Data.bullectAttackSpeed;
                    // Data.bullectAttackSpeed = 0.05;
                    this.bullectArea.main.bullectArea.updateAttackSpeed(Data.superAttackSpeed);
                    //持续的时间到了后，恢复之前的攻速
                    this.scheduleOnce(()=>{
                        //cc.log("zidan恢复常速 -----------", tempAttackSpeed);
                        this.bullectArea.main.bullectArea.updateAttackSpeed();
                    },Data.superSpeedDuration);
                }
            }
        }
    }

    update(dt){
        this.node.scale += 0.05;
        this.node.x += Data.bullectSpeedX * dt;

        if (this.node.getBoundingBox().xMin > cc.winSize.width){
            this.bullectArea.putNodePool(this.node);
        }
    }
}
