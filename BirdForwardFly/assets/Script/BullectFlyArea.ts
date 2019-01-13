import {NodePool} from "./NodePool";
import {Bullect} from "./Bullect";
import {Main} from "./Main";
import {Data} from "./Data";

const {ccclass, property} = cc._decorator;

@ccclass('Bullects')
export class Bullects {
    // name:"Foods";

    @property(cc.String)
    name:string = "";

    @property(Number)
    initPollCount: number = 0;

    @property(cc.Prefab)
    prefab: cc.Prefab = null
}

@ccclass
export class BullectFlyArea extends cc.Component {
    main:Main = null;

    @property([Bullects])
    bullects:[Bullects] = [new Bullects()];

    @property(cc.Node)
    bullect_produce_pos:cc.Node = null;

    isShooting:boolean = true;

    onLoad(){
        NodePool.batchInitObjPool(this.node, this.bullects);

        this.schedule(this.produceBullect, Data.bullectAttackSpeed);
    }

    init(main:Main){
        this.main = main;
    }

    updateAttackSpeed(speed:number = Data.bullectAttackSpeed){
        cc.log("刷新子弹速度 ----------",speed);
        Data.bullectSuperSpeed = false;
        this.unschedule(this.produceBullect);
        this.schedule(this.produceBullect,speed);
    }

    produceBullect(){
        cc.log("生成子弹 ---------------");
        if (this.isShooting) {
            let nodeName = this.bullects[0].name + "Pool";
            let newNode = NodePool.genNewNode(this.node[nodeName], this.bullects[0].prefab, this.node);
            newNode.position = this.bullect_produce_pos.parent.convertToWorldSpaceAR(this.bullect_produce_pos.getPosition());
            newNode.getComponent(Bullect).init(this);
        }
    }

    putNodePool(node){
        NodePool.backObjPool(this.node, node);
    }
}
