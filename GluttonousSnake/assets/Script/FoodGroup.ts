import {NodePool} from "./NodePool";
import {Data} from "./Data";
import {Food} from "./Food";
import {Main} from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass('Foods')
export class Foods {
    // name:"Foods";

    @property(cc.String)
    name:string = "";

    @property(Number)
    initPollCount: number = 0;

    @property(cc.Prefab)
    prefab: cc.Prefab = null
}

@ccclass
export class FoodGroup extends cc.Component {
    @property([Foods])
    foods:[Foods] = [new Foods()];

    @property(cc.Node)
    food_produce_posY = null;

    private allTime:number = 0;
    private main:Main = null;
    isDie:boolean = true;      //游戏没有结束

    onLoad(){
        NodePool.batchInitObjPool(this, this.foods);
    }

    init(main:Main){
        this.main = main;
    }

    putNodePool(node){
        NodePool.backObjPool(this, node);
    }

    gameStart(){
        this.isDie = false;
    }

    gameOver(){
        this.isDie = true;
    }

    update(dt){
        if (!this.isDie) {
            this.allTime += dt;
            let randomTime = Math.random() * (Data.ProduceFoodIntervalMax - Data.ProduceFoodIntervalMin) + Data.ProduceFoodIntervalMin;
            //生产食物
            if (this.allTime >= randomTime) {
                //生成哪种类型的食物
                let foodTypeIndex = Math.floor(Math.random() * this.foods.length);
                let nodeName = this.foods[foodTypeIndex].name + "Pool";
                let newNode = NodePool.genNewNode(this[nodeName], this.foods[foodTypeIndex].prefab, this.node);
                newNode.getComponent(Food).init(this);
                let randomPosX = Math.floor(Math.random() * ((this.food_produce_posY.getBoundingBox().xMax - newNode.getBoundingBox().size.width / 2) - (this.food_produce_posY.getBoundingBox().xMin + newNode.getBoundingBox().size.width / 2)) + this.food_produce_posY.getBoundingBox().xMin + newNode.getBoundingBox().size.width / 2);
                newNode.x = randomPosX;
                newNode.y = cc.winSize.height + newNode.getBoundingBox().size.height / 2;

                this.allTime = 0;
            }
        }

    }
}




