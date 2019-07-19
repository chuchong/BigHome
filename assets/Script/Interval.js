// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var StageInfo = require('StageInfo')
cc.Class({
  extends: cc.Component,

  properties: {
    Speaker: {
      default: null,
      type: cc.Label
    },
    Description: {
      default: null,
      type: cc.RichText
    },
    Floating: {
      default: null,
      type: cc.RichText
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  define (){
    this.pre_load_time = 0.5; // second before first character
    this.ch_speed = 0.08; // second pre character
    this.speaker_dure = 1.5 // time spent for speaker
    this.distance_mean = 60 // pixels
    this.float_size_mean = 100 // pixels
    this.float_per_char = 3
    this.after_load_time = 1.0 // wait after chars turn out
    this.char_set = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '!', '@', '#', '%', '=']
  },

  start () {
    let size = cc.winSize
    this.node.width = size.width
    this.node.height = size.height
    this.node.setPosition(size.width / 2,size.height / 2)
    this.text = StageInfo.descriptions[StageInfo.currentStage - 1]
    this.speaker = StageInfo.speaker[StageInfo.currentStage - 1]
    this.char_per_line = Math.floor(this.Description.maxWidth / this.Description.fontSize)
    this.line = Math.ceil(this.text.length / this.char_per_line)
    this.char_width = this.Description.fontSize
    this.char_height = this.Description.lineHeight
    this.last_line_char_num = this.text.length % this.char_per_line
    this.box_width = this.Description.node.width
    this.box_height = this.line * this.char_height

    this.define()

    this.Speaker.string = this.speaker
    this.Speaker.node.opacity = 0
    this.Description.string = ""

    setTimeout(this.showDescription, this.pre_load_time * 1000, this)
    setTimeout(this.showSpeaker, (this.pre_load_time + this.text.length * this.ch_speed) * 1000, this)
  },

  charPose (index) {
    let line_index = Math.floor(index / this.char_per_line)
    let row_index = index - line_index * this.char_per_line
    let y = Math.floor((line_index + 0.5) * this.char_height)
    let x = 0;
    if (line_index < this.line - 1){
      x = Math.floor((row_index + 1) * this.char_width)
    }
    else{
      x = Math.floor(this.char_per_line * this.char_width / 2 + ((row_index + 1 - this.last_line_char_num / 2) * this.char_width))
    }
    return {x: x - this.box_width / 2, y: (this.box_height / 2 - y)}
  },

  showDescription (self) {
    let len = self.text.length;
    for (let i = 0; i < len; i++){
      setTimeout(self.showSubstring, i * self.ch_speed * 1000, i, self)
    }
  },

  showSubstring (i, self){
    let text = self.colorString("black", self.text.substring(0, i + 1)) + self.colorString("white", self.text.substring(i + 1))
    self.Description.string = text
    let pose = self.charPose(i)
    for (let i = 0; i < self.float_per_char; i++){
      setTimeout((self)=>{
          let dir = Math.random() * Math.PI
          let dis = Math.random() * self.distance_mean * 2
          self.Floating.node.x = pose.x + dis * Math.cos(dir)
          self.Floating.node.y = pose.y + dis * Math.sin(dir)
          self.Floating.fontSize = Math.random() * self.float_size_mean * 2
          self.Floating.string = self.colorString("black", self.char_set[Math.floor(self.char_set.length * Math.random())])
      }, i * self.ch_speed / self.float_per_char, self)
    }
  },

  showSpeaker (self) {
    let number = self.speaker_dure * 60
    for (let i = 0; i < number; i++){
      setTimeout(()=>{
        self.Speaker.node.opacity = i / number * 255;
      }, 1000.0 / 60.0 * i)
    }
  },

  colorString (color, text){
    if (color === "white"){
      return "<color = #FFFFFF>" + text + "</color>"
    }
    else if (color === "black"){
      return "<color = #000000>" + text + "</color>"
    }
  },

  startGameScene: function () {
    cc.director.loadScene('BattleScene')
  }
  // update (dt) {},
})
