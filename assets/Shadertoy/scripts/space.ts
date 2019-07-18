// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;

import ShaderAssembler, { default_vert, default_frag_prefix, default_frag_postfix } from './ShaderAssembler';


@ccclass
export default class Test extends cc.Component {

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    _start = 0;
    rand = 0;
    zoom = false;
    zoom_scale = 0.80;
    distfading = 0.73;
    distfading_max = 1.2;
    zoom_start_time = null;
    // 这个时间需要和场景变暗的时间相同
    zoom_dure_time = 1.5;

    start() {
        //this.sprite = cc.find("background")
        //cc.game.addPersistRootNode(this.node);
        this._start = Date.now();
        this.rand = Math.random() * 1000;
        var name = 'space';

        var self = this;
        cc.loader.loadRes('shader/' + name, function (err, data) {
            let shader_assembler = self.sprite.node.getComponent(ShaderAssembler);
            shader_assembler.registerFragShaderTemplate(
                name,
                default_vert,
                default_frag_prefix + data.text + default_frag_postfix
                ,
                [
                    { name: 'use2DPos' },
                    { name: 'useModel' },
                ]);
            let mat = shader_assembler.createCustomMaterial(
                name,
                [
                    { name: 'iResolution', type: renderer.PARAM_FLOAT3 },
                    { name: 'iTime', type: renderer.PARAM_FLOAT },
                    { name: 'zoom', type: renderer.PARAM_FLOAT},
                    { name: 'distfading', type: renderer.PARAM_FLOAT}
                ],
                [
                    { name: 'use2DPos', value: 'true' },
                    { name: 'useModel', value: 'false' }
                ]
            )
            // var iResolution = new cc.Vec3(
            //     self.sprite.spriteFrame.getTexture().width,
            //     self.sprite.spriteFrame.getTexture().height,
            //     10
            // );
            let iResolution = new cc.Vec3(
                self.sprite.node.width / 2,
                self.sprite.node.height / 2,
                10
            );
            shader_assembler.activateCustomMaterial(self.sprite, mat)
            mat.setParamValue("iResolution", iResolution);
            mat.setParamValue("zoom", self.zoom_scale);
            mat.setParamValue("distfading", self.distfading);
        });
        console.log(this.sprite.node.width, this.sprite.node.height)
    }

    startZoom() {
        this.zoom = true;
        this.zoom_start_time = Date.now();
    }

    update() {
        const mat = this.sprite.node.getComponent(ShaderAssembler).currentMaterial;
        if (!mat) {
            return;
        }
        const now = Date.now();
        const time = (now - this._start) / 1000 + this.rand;
        mat.setParamValue("iTime", time);
        let zoom_param = 2000 * this.zoom_dure_time / Math.PI;
        if (this.zoom){
            mat.setParamValue("zoom", this.zoom_scale * (Math.cos((now - this.zoom_start_time) / zoom_param)))
            mat.setParamValue("distfading", this.distfading + (this.distfading_max - this.distfading) * (Math.sin((now - this.zoom_start_time) / zoom_param)))
        }

    }
}
