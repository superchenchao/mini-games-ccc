import {Color, Data} from "./Data";
import {FoodGroup} from "./FoodGroup";

// enum Color {
//     Red,
//     Green,
//     Blue,
//     Yellow,
// }
const {ccclass, property} = cc._decorator;

@ccclass
export class Food extends cc.Component {
    private group:FoodGroup = null;
    @property({
        type: cc.Enum(Color)    // call cc.Enum
    })
    foodColor: Color = Color.Red;

    init(group:FoodGroup){
        this.group = group;
    }

    update(dt){
        this.node.y -= dt * Data.bgSpeed;

        if (this.node.getBoundingBox().yMax < 0) {
            this.group.putNodePool(this.node);
        }


    }
}
