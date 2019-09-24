//index.js
//获取应用实例
const bgMusic = wx.getBackgroundAudioManager();
const app = getApp();
let AudioContext= wx.createInnerAudioContext();
Component({ 
  properties: {
    // item: {
    //   type: Object
    // },
    src: String,
  },
  observers: {},
  data: {
    isOpen: false,
    offset:0
  },
  lifetimes: {
    attached: function() {
      wx.setInnerAudioOption({
        obeyMuteSwitch:false,
        mixWithOther:true,
        success:function(){
          console.log("成功")
        },
        fail:function(err){
          console.log('setInnerAudioOption失败')
        }
      }) 
    }
  },
  methods: {
  // 播放
  listenerButtonPlay: function () {
    AudioContext.src=this.data.src;
    console.log(AudioContext.src)
    AudioContext.onTimeUpdate(()=>{
     console.log(AudioContext.currentTime)
     let mate=AudioContext.currentTime/AudioContext.duration*100
     this.setData({
       offset:mate
     })
    })
    AudioContext.play();
    AudioContext.onPlay(()=>{
      console.log(AudioContext.src)
        console.log("onplayß")
        this.setData({
          isOpen:true
        })
    });
    AudioContext.onPause(()=>{
      console.log(AudioContext.src)
        console.log("pause")
    });
 
  },
  //暂停播放
  listenerButtonPause(){
     var that = this
     AudioContext.pause()
    that.setData({
      isOpen: false,
    })
  },
  listenerButtonStop(){
    var that = this
    bgMusic.stop()
  },
  // 进度条拖拽/
  sliderChange(e) {
  //AudioContext.src="https://evo-nav-public-media-testing.oss-cn-beijing.aliyuncs.com/0145a083f975a056da92bb6554535af6.mp3";
  console.log(AudioContext.src)
  console.log(e.detail.value)
  let currentTime=e.detail.value/100*AudioContext.duration;
  AudioContext.play();
  AudioContext.seek(currentTime)
    // var offset = parseInt(e.detail.value);
    // bgMusic.play();
    // bgMusic.seek(offset);
    // this.setData({
    //   isOpen: true,
    // })
  },
  }
})
// Page({ 
 
//   onLoad:function(){
 
//   },

//   // 页面卸载时停止播放
//   onUnload() {
//     var that = this
//     that.listenerButtonStop()//停止播放
//     console.log("离开")
//   },
// })