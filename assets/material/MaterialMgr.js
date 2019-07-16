/**
 * 自定义材质
 */

const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;
const gfx = renderEngine.gfx;
const Material = renderEngine.Material;

var MaterialMgr = {};
let g_shaders = {};
MaterialMgr.addShader = function(shader) {
    if (g_shaders[shader.name]) {
        console.log("addShader - shader already exist: ", shader.name);
        return;
    }

    if (cc.renderer._forward) {
        cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines || []);
        g_shaders[shader.name] = shader;
    } else {
        //在微信上初始时cc.renderer._forward不存在，需要等引擎初始化完毕才能使用
        cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
            cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines || []);
            g_shaders[shader.name] = shader;
        });
    }
}
//取Shader的定义
MaterialMgr.getShader = function(name) {
    return g_shaders[name];
};

MaterialMgr.getShaderByIndex = function(index) {
    let array = Object.values(g_shaders);
    return array[index];
};

MaterialMgr.getAllName = function() {
    let array = Object.keys(g_shaders);
    let result = array.map((name, value) => {
        return {name, value};
    });
    return result;
};

let g_shaderEnum = null;
MaterialMgr.getShaderEnum = function() {
    if (g_shaderEnum) {
        return g_shaderEnum;
    }
    let array = Object.keys(g_shaders);
    let obj = {};
    array.forEach((name, index) => obj[name] = index);
    g_shaderEnum = cc.Enum(obj);
    return g_shaderEnum;
}
module.exports = MaterialMgr;