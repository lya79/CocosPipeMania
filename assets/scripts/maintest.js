// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

/**
 * 每個格子可以設定
 *  1.幾秒鐘通過
 *  2.有幾個座標點
 * 
 *  ex: 一個格子有4個座標點, 預計3秒通過.
 * 
 *  |   A   |   B   |
 *  0 1 2 3 4 5 6 7 8
 *  
 *  1-4座標點屬於 A區塊
 *  5-8座標點屬於 B區塊
 * 
 *  每個座標到下一個座標點的時間間隔 = 幾秒鐘通過 / 有幾個座標點 = 每隔多久刷新一次畫布
 * 
 *  獲得座標點後, 就可以拿來繪製線條, 或是把相關動畫貼上
 */


cc.Class({
    extends: cc.Component,

    properties: {
        showCase1: false,
        showCase2: false,
        showCase3: false,
    },

    /**
     * 參考: https://www.cnblogs.com/fangsmile/p/11642784.html
     * 
     * @param poss      贝塞尔曲线控制点坐标
     * @param precision 精度，需要计算的该条贝塞尔曲线上的点的数目
     * @return 该条贝塞尔曲线上的点（二维坐标）
     */
    //  function bezierCalculate(poss:Array<Point>, precision:number) {
    bezierCalculate(poss, precision) { // 不包含頭尾
        // precision-=1;

        //维度，坐标轴数（二维坐标，三维坐标...）
        let dimersion = 2;

        //贝塞尔曲线控制点数（阶数）
        let number = poss.length;

        //控制点数不小于 2 ，至少为二维坐标系
        if (number < 2 || dimersion < 2)
            return null;

        let result = new Array();

        //计算杨辉三角
        let mi = new Array();
        mi[0] = mi[1] = 1;
        for (let i = 3; i <= number; i++) {

            let t = new Array();
            for (let j = 0; j < i - 1; j++) {
                t[j] = mi[j];
            }

            mi[0] = mi[i - 1] = 1;
            for (let j = 0; j < i - 2; j++) {
                mi[j + 1] = t[j] + t[j + 1];
            }
        }

        //计算坐标点
        for (let i = 1; i < precision; i++) {
            let t = i / precision;
            // let p = new Point(0, 0);
            let p = {
                x: 0,
                y: 0,
            };
            result.push(p);
            for (let j = 0; j < dimersion; j++) {
                let temp = 0.0;
                for (let k = 0; k < number; k++) {
                    temp += Math.pow(1 - t, number - k - 1) * (j == 0 ? poss[k].x : poss[k].y) * Math.pow(t, k) * mi[k];
                }
                j == 0 ? p.x = temp : p.y = temp;
            }
            // p.x = this.toDecimal(p.x);
            // p.y = this.toDecimal(p.y);
        }

        // result.push(poss[poss.length-1])

        return result;
    },

    getDistance(srcPos, targetPos) {
        var a = srcPos.x - targetPos.x;
        var b = srcPos.y - targetPos.y;
        var distance = Math.sqrt(a * a + b * b);
        return distance
    },

    onLoad() {
        this.showCase1 = false;
        this.showCase2 = true;
        this.showCase3 = false;

        if (this.showCase1) {
            {
                var centerX = 0;
                var centerY = 0;

                var node = new cc.Node("showCase1");
                // node.opacity = 200;
                this.node.addChild(node);
                var ctx = node.addComponent(cc.Graphics);

                ctx.lineCap = cc.Graphics.LineCap.BUTT //默认。 向线条的每个末端添加平直的边缘
                ctx.lineJoin = cc.Graphics.LineJoin.ROUND; // 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
                ctx.strokeColor = new cc.Color().fromHEX('#66FFE6');
                ctx.lineWidth = 1;

                ctx.moveTo(0, -64);
                ctx.quadraticCurveTo(0, 0, 64, 0); // 圖片的2/1
                ctx.stroke();
            } {
                var poss = [];
                poss.push({
                    x: 0,
                    y: -64,
                });
                poss.push({
                    x: 0,
                    y: 0,
                });
                poss.push({
                    x: 64,
                    y: 0,
                });
                // console.log("point: "+this.bezierCalculate(poss,2));
                var arr = this.bezierCalculate(poss, 10);
                for (var i = 0; i < arr.length; i++) {
                    console.log("point: " + arr[i].x + ", " + arr[i].y);

                    var name = "circle" + i;
                    var node = new cc.Node(name);
                    this.node.addChild(node);
                    var ctx = node.addComponent(cc.Graphics);
                    ctx.circle(arr[i].x, arr[i].y, 3);

                    let fillColor = cc.Color.RED; //宣告一個顏色變數
                    fillColor.a = 200; //新增透明度
                    ctx.fillColor = fillColor; //填充
                    ctx.strokeColor = new cc.Color().fromHEX('#66FFE6');
                    // ctx.stroke();
                    ctx.fill();
                }
            }
        }

        if (this.showCase2) { // 測試線條逐漸增長 
            // 格子大小
            this.width = 128;
            this.height = 128;

            // 路線起始位置
            var firstX = 0;
            var firstY = 0;

            this.delay = 3; // 每個格子預計幾秒內跑完
            this.posCount = 5; // 每個格子會拆成幾個座標

            this.tmp = 0.0; // 計時用途

            // 格子所在位置
            this.posArray = [];

            {
                let baseX = firstX + this.width;
                let baseY = firstY;
                this.posArray.push({ // 左->上
                    center: { x: baseX, y: baseY },
                    in: { x: baseX - (this.width / 2), y: baseY },
                    out: { x: baseX, y: baseY + (this.height / 2) },
                });
            }

            {
                let baseX = firstX + this.width;
                let baseY = firstY + this.height;
                this.posArray.push({ // 下->右
                    center: { x: baseX, y: baseY },
                    in: { x: baseX, y: baseY - (this.height / 2) },
                    out: { x: baseX + (this.width / 2), y: baseY },
                });
            }

            {
                let baseX = firstX + (this.width * 2);
                let baseY = firstY + this.height;
                this.posArray.push({ // 左->右
                    center: { x: baseX, y: baseY },
                    in: { x: baseX - (this.width / 2), y: baseY },
                    out: { x: baseX + (this.width / 2), y: baseY },
                });
            }

            { // 初始化路線 Graphics
                var node = new cc.Node("showCase2");
                this.node.addChild(node);

                var ctx = node.addComponent(cc.Graphics);
                this.ctx2 = ctx;

                // ctx.lineCap = cc.Graphics.LineCap.BUTT; //默认。 向线条的每个末端添加平直的边缘
                ctx.lineCap = cc.Graphics.LineCap.ROUND; //向线条的每个末端添加圆形线帽
                // ctx.lineCap = cc.Graphics.LineCap.SQUARE; // 向线条的每个末端添加正方形线帽

                ctx.lineJoin = cc.Graphics.LineJoin.ROUND; // 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
                // ctx.lineJoin = cc.Graphics.LineJoin.BEVEL; // 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
                // ctx.lineJoin = cc.Graphics.LineJoin.MITER; // 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。

                // ctx.miterLimit = 100;

                // let fillColor = cc.Color.RED; //宣告一個顏色變數
                // fillColor.a = 200; //新增透明度
                // this.ctx2.fillColor = fillColor; //填充

                ctx.strokeColor = new cc.Color().fromHEX('#66FFE6');
                ctx.lineWidth = 1;
            }

            // 路線座標
            this.pathArray = [];

            { // 將格子座標轉換成路線座標
                this.pathArrayIdx = -2;

                let self = this;
                let getPos = function(pos) { // 取得兩座標之間的子座標(不包含頭座標,有包含尾部座標)  // TODO 
                    let inputPos = [pos.in, pos.center, pos.out];
                    let arr = [];
                    // arr.push(pos.in); // 頭部座標
                    arr = arr.concat(self.bezierCalculate(inputPos, self.posCount)); // 頭和尾兩端的子座標
                    arr.push(pos.out); // 尾部座標
                    return arr;
                }

                // { // 初始化位置
                //     let pos = this.posArray[0];
                //     ctx.moveTo(pos.in.x, pos.in.y);
                // }

                for (let i = 0; i < this.posArray.length; i++) {
                    let pos = this.posArray[i];
                    this.pathArray = this.pathArray.concat(getPos(pos));
                }

                this.pathArrayIdx = -1; // 等待 this.pathArray設定完成
            }



            { // 繪製預計路線
                var self = this;
                var drawPoint = function(x, y) {
                    console.log("draw:", x, y);

                    var node = new cc.Node("showCase2Path" + x + "-" + y);
                    self.node.addChild(node);
                    var ctx = node.addComponent(cc.Graphics);

                    ctx.circle(x, y, 3);
                    ctx.lineWidth = 1;

                    var fillColor = cc.Color.RED; //宣告一個顏色變數
                    fillColor.a = 200; //新增透明度
                    ctx.fillColor = fillColor; //填充
                    ctx.strokeColor = new cc.Color().fromHEX('#00FF00');

                    ctx.stroke();
                    ctx.fill();
                }

                // drawPoint(firstX, firstY);
                for (var i = 0; i < this.pathArray.length; i++) {
                    var pos = this.pathArray[i];
                    drawPoint(pos.x, pos.y);
                }
            }
        }


        // if (this.showCase3) { // 測試波紋 // TODO

        // }
    },



    // called every frame, uncomment this function to activate update callback
    update: function(dt) {
        if (!this.showCase2) {
            return
        }

        { // 計時
            this.tmp += dt;
            if (this.tmp < (this.delay / this.posCount)) {
                return;
            }
            this.tmp = 0;
        }


        if (this.pathArrayIdx <= -2) {
            return
        }

        if (this.pathArrayIdx < this.pathArray.length - 1) {
            this.pathArrayIdx += 1;
        } else {
            return
        }

        { // 畫線
            if (this.pathArrayIdx == 0) {
                let pos = this.posArray[0];
                this.ctx2.moveTo(pos.in.x, pos.in.y);
            }

            {
                let pos = this.pathArray[this.pathArrayIdx];

                console.log("len:" + this.pathArray.length + ", idx:" + this.pathArrayIdx + ", x:" + pos.x + ", y:" + pos.y + ", time:" + (new Date()));

                this.ctx2.lineTo(pos.x, pos.y);
                // let fillColor = cc.Color.RED; //宣告一個顏色變數
                // fillColor.a = 200; //新增透明度
                // this.ctx2.fillColor = fillColor; //填充
                // this.ctx2.strokeColor = new cc.Color().fromHEX('#66FFE6');
                this.ctx2.stroke();
                // this.ctx2.fill();

                // console.log("idx:" + this.pathArrayIdx + ", x:" + pos.x + ", y:" + pos.y + ", time:" + (new Date()));
            }

            // this.ctx2.lineTo(this.headX, this.headY);
            // this.ctx2.stroke();

            // console.log("targetIdx:" + this.targetIdx + "lineTo:", this.headX, this.headY);
        }
    },
});