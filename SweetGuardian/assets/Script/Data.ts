export class Data {
    //背景移动速度
    static bgSpeed = 180;
    //产生甜甜圈等 的间隔时间
    static intervalTime = 2;

    // static barrierCount = {
    //     5:{
    //         "donut_1":1,
    //         "donut_2":2,
    //         "donut_3":3,
    //         "donut_4":3,
    //     },
    //     10:{
    //         "donut_1":2,
    //         "donut_2":2,
    //         "donut_3":4,
    //         "donut_4":4,
    //     },
    //     15:{
    //         "donut_1":3,
    //         "donut_2":3,
    //         "donut_3":4,
    //         "donut_4":5,
    //     },
    // }

    static barrierCount = {
        "50":{
            "donut":{
                1:1,
                2:2,
                3:3,
                4:3
            },
            "brick":{
                0:5
            }
        },
        "150":{
            "donut":{
                1:2,
                2:2,
                3:4,
                4:4
            },
            "brick":{
                0:8
            }
        },
        "250":{
            "donut":{
                1:3,
                2:3,
                3:4,
                4:5
            },
            "brick":{
                0:10
            }
        },
    }
}