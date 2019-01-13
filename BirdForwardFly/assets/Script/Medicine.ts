import {Data} from "./Data";

const {ccclass, property} = cc._decorator;

@ccclass
export class Medicine extends cc.Component {
    @property(cc.Label)
    medicine_name:cc.Label = null;

    attribute:number = 0;       //0是速度；1是力量

    init(){
        let random = Math.floor(Math.random() * 10);
        if (random >= Data.randomDifferentMedicine) {
            //力量的药
            this.medicine_name.string = "P";
            this.node.color = cc.Color.RED.fromHEX("#FF0085");
            this.attribute = 1;
        }else{
            //速度的药
            this.medicine_name.string = "S";
            this.node.color = cc.Color.RED.fromHEX("#00FF14");
            this.attribute = 0;
        }
    }
}
