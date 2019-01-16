// pages/editPerson/editPerson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    number:"",
    date:"2015-09-01",
    time:"13:20",
    items: [
      { value: '管理', info:"允许所有操作" },
      { value: '收银', checked: 'true', info: "可以收钱并手动更改订单支付状态" },
      { value: '普通', info: "改变订单非支付操作状态" },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    let title = type == 'add' ?'新增员工':'编辑员工'
    wx.setNavigationBarTitle({
      title: title
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindDateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e){
    this.setData({
      time: e.detail.value
    })
  },
  radioChange(e){

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})