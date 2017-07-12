/**
 * Created by xiaojianli on 2017/7/12.
 */
class Touch{
    constructor({target,toLeft,toRight,toTop,toBottom}){
        if(!target){
            return;
        }
        this.target = target;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.isMoving = false;
        this.canMove = false;
        target.addEventListener('touchstart', (ev) => {
            this.startX = ev.touches[0].pageX;
            this.startY = ev.touches[0].pageY;
        }, false);

        target.addEventListener('touchmove', (ev) => {
            this.canMove = true;
        }, false);

        target.addEventListener('touchend', (ev) => {
            if(!this.canMove){
                return;
            }
            this.canMove = false;
            this.endX = ev.changedTouches[0].pageX;
            this.endY = ev.changedTouches[0].pageY;
            var direction = this.getSlideDirection(this.startX, this.startY, this.endX, this.endY);
            switch (direction){
                case 0:
                    break;
                case 1:
                    toTop && toTop();
                    break;
                case 2:
                    toBottom && toBottom();
                    break;
                case 3:
                    toLeft && toLeft();
                    break;
                case 4:
                    toRight && toRight();
                    break;
                default:
            }
        }, false);

        this.getSlideDirection.bind(this);
    }
    //获取角度
    getSlideAngle(dx,dy) {
        return Math.atan2(dy,dx) * 180 / Math.PI;
    }
    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    getSlideDirection(startX,startY, endX, endY) {
        var dy = startY - endY;
        var dx = endX - startX;
        var result = 0;
        //如果滑动距离太短
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
            return result;
        }
        var angle = this.getSlideAngle(dx, dy);
        if (angle >= -45 && angle < 45) {
            result = 4;
        }else if (angle >= 45 && angle < 135) {
            result = 1;
        }else if (angle >= -135 && angle < -45) {
            result = 2;
        }else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        }
        return result;
    }
}

module.exports = Touch;