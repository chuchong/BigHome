// 用于配置关卡标题
var stageTitle = [ '1: Lab 0',
  '2: Lab 3',
  '3: Lab 207',
  '4: Lab 3300'
]

var stageHighestScore = [
  0, 0, 0, 0
]

var currentStage = 4 // 从1开始

var descriptions = [
  '这是关于小宇宙的任务\nMission: 请发射50粒子弹',
  'Mission: 请依次到达所有指定位置',
  'Mission: 请消灭所有失控体',
  'Mission: 请尽可能地存活下去'
]

var speaker = [
  '—— Dr.D ',
  '—— Dr.D ',
  '—— the General ',
  '—— Mr. Robot '
]

module.exports = {
  titles: stageTitle,
  highestScore: stageHighestScore,
  currentStage: currentStage,
  descriptions: descriptions,
  speaker: speaker
}
