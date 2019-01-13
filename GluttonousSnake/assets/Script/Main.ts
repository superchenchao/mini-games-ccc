import {ColliderHead} from "./ColliderHead";
import {Board} from "./Board";
import {Result} from "./Result";
import {FoodGroup} from "./FoodGroup";
import {Menu} from "./Menu";

const {ccclass, property} = cc._decorator;

@ccclass
export class Main extends cc.Component {
    @property(ColliderHead)
    colliderHead:ColliderHead = null;

    @property(Board)
    board:Board = null;

    @property(Result)
    result:Result = null;

    @property(FoodGroup)
    foodGroup:FoodGroup = null;

    @property(Menu)
    menu:Menu = null;

    onLoad(){
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.colliderHead.init(this);
        this.board.init(this);
        this.result.init(this);
        this.menu.init(this);
    }

    startGame(){
        this.colliderHead.gameStart();
        this.foodGroup.gameStart();
        this.menu.gameStart();
        this.result.gameStart()
    }

    gameOver(){
        this.result.gameOver();
        this.board.gameOver();
        this.foodGroup.gameOver();
        this.colliderHead.gameOver();

    }
}
