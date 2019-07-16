cc.Class({
    extends: cc.Component,

    properties: {
        speed: 300,
        x_up_limit: 880,
        x_down_limit: 80,
        y_up_limit: 570,
        y_down_limit: 70
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getPhysicsManager().enabled = true;

    },

    onCollisionEnter: function (other, self) {
        //this.node.destroy();
    },

    start () {
        this.ctx = this.getComponent(cc.Graphics); 
        this.ctx.circle(0,0,5);
        this.ctx.stroke();
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (this.node.x > this.x_up_limit){
            this.node.x = this.x_down_limit
        }
        else if (this.node.x < this.x_down_limit){
            this.node.x = this.x_up_limit
        }
        if (this.node.y > this.y_up_limit){
            this.node.y = this.y_down_limit
        }
        else if (this.node.y < this.y_down_limit){
            this.node.y = this.y_up_limit
        }
    },
});
