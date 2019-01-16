// pages/adminOrder/adminOrder.js
import orderList from '../../data/adminOrder.js';
import tools from "../../utils/tools.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"2018-05-04"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (orderList) {
      wx.setNavigationBarTitle({
        title: orderList.user + ' 订单列表'
      });
      this.setData(orderList)
    }
  },
  orderDetail: function (e) {
    let index = tools.getVal(e,'index');
    let list = this.data.list.slice();
    list[index].detail = !list[index].detail;
    this.setData({
      list:list
    });
  },
  delectItem(e) {
    let index = tools.getVal(e, 'index');
  },
  bindDateChange(e){
      this.setData({
        date:e.detail.value
      })
  },
  scrollTop(){
    console.log('1')
  },
  scrollBottom(){
    setTimeout(()=>{
       let arr = [];
       for(var i=0;i<5;i++){
         arr.push({
           orderId: "446848",
           table: 1,
           personNum: 3,
           state: -1, //-1：未支付，0：待确认，1:制作中，2：待配送，3：已完成,
           time: "2018-06-09 12:58",
           payType: "微信支付",
           administor: '小李',
           total: 2535.00,
           detail: false,
           foods: [
             {
               name: "重庆鸡丁",
               num: 2,
               count: 100.00,
             },
             {
               name: "重庆鸡丁",
               num: 2,
               count: 100.00,
             },
             {
               name: "重庆鸡丁",
               num: 2,
               count: 100.00,
             },
             {
               name: "重庆鸡丁",
               num: 2,
               count: 100.00,
             },
             {
               name: "重庆鸡丁",
               num: 2,
               count: 100.00,
             },
             {
               name: "重庆鸡丁",
               num: 2,
               count: 100.00,
             },
           ]
         })
       }
       this.setData({
         list:this.data.list.concat(arr)
       }) 
    },1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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