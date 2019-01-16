// pages/homePage/homePage.js

import foodsData from '../../data/foodsData';
import tools from "../../utils/tools.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodsData: [],
    nowIndex: 0,
    sellCarShow: false,
    account: 0,
    allNum:0,//已选择食物数量
    detailId:'',//要显示详情的食物id
    showDetail:false,
    discounts:0//已减折扣
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (foodsData.length > 0) {
      var foodList = foodsData[0].foodList
      this.setData({
        foodsData: foodsData,
      })
    }
  },
  // 选择食品
  chooseFood: function (e) {
    var index = tools.getVal(e, 'food');
    this.setData({
      nowIndex: index,
    })
  },
  //加入、减少购物车
  selectFood: function (e) {
    var id = tools.getVal(e, "foodId");
    var type = tools.getVal(e, "type");
    var nowIndex = tools.getVal(e, "listId");
    var data = this.data.foodsData.slice();
    var allNum = this.data.allNum;
    if (type == "add") {
      data[nowIndex].foodList[id].selected++;
      allNum++;
    } else {
      data[nowIndex].foodList[id].selected--;
      allNum--;
    }
    this.setData({
      foodsData: data,
      allNum: allNum
    });
    this.accountVal();
    this.discountsVal();
    this.selectedNum();
  },
  //计算折扣
  discountsVal:function(){
    var account = this.data.account;
    var a = account%100;
    var b = (account-a)/100;
    this.setData({
      discounts:b*20
    })  
  },
  //显示选择数量
  selectedNum:function(){
    var data = this.data.foodsData.slice();
    data.forEach(item=>{
      item.selectedNum = 0;
      item.foodList.forEach(o=>{
        item.selectedNum += o.selected;
      })
    });
    this.setData({
      foodsData:data
    })
  },
  //显示隐藏购物车详情
  toggleSellCar: function () {
    this.setData({
      sellCarShow: !this.data.sellCarShow
    })
  },
  //计算总价
  accountVal: function () {
    var account = 0, data = this.data.foodsData;
    //遍历拿到数据
    data.forEach((item) => {
      item.foodList.filter((obj) => {
        if (obj.selected > 0) {
          account += obj.price * obj.selected
        }
      })
    });
    this.setData({
      account: account
    })
  },
  //清空购物车
  clearSell: function () {
    var _this = this;
    wx.showModal({
      title: "清空购物车",
      content: "确定要清空所有菜品吗？",
      success: function (res) {
        //确定清空
        if (res.confirm) {
          var data = _this.data.foodsData.slice();
          data.forEach((item) => {
            item.foodList.filter((obj) => {
              if (obj.selected > 0) {
                obj.selected = 0;
              }
            })
          });
          _this.setData({
            account: 0,
            foodsData: data,
            sellCarShow: false,
            allNum:0
          });
          _this.selectedNum();
          wx.showToast({
            title: '购物车已清空',
            duration: 1000,
            icon: "success"
          })

          //取消清空
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //查看详情
  lookForDetail:function(e){
    var id = tools.getVal(e,"detailId");
    if(id){
      this.setData({
        detailId:id,
        showDetail:true
      })
    }
  },
  hideDetail:function(){
    this.setData({
      showDetail:false
    })
  },
  // 埋单
  goForOrder:function(){
    wx.setStorageSync("foodsData", this.data);//保存已经操作的数据
    wx.navigateTo({
      url: '../perOrder/perOrder',
    })
  },
  //to 已下单
  toYourOrder:function(){
    wx.setStorageSync("foodsData", this.data);
    // wx.navigateTo({
    //   url: '../yourOrder/yourOrder?type=2',
    // })
    wx.navigateTo({
      url: '../yourOrderList/yourOrderList',
    })
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