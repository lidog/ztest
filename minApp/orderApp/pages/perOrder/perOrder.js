Page({

  /**
   * 页面的初始数据
   */
  data: {
    preOrderData:[],
    account:0,
    discounts:0,
    table:12,
    tips:'',
    fee: 5,//茶位
    feeAll:5,//茶位总价
    person:0,//用餐人数index
    personNum: ["1 人", "2 人", "3 人", "4 人", "5 人", "6 人", "7 人", "8 人", "9 人", "手动输入"],
    index: 0,
    payType:[
      "微信支付",
      "现金支付"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '提交订单'
    });

    const _this = this;
    //从 storage 获取勾选的菜品
    wx.getStorage({
      key: 'foodsData',
      success: function(res) {
        let foodsData = res.data.foodsData;
        if (foodsData.length>0){
          let arr = [];
          foodsData.forEach((item) => {
            arr = arr.concat(item.foodList.filter((obj) => {
              return obj.selected > 0
            }))
          });
          _this.setData({
            preOrderData: arr,//帅选出已经选择的食物
            account: res.data.account,
            discounts: res.data.discounts
          })
        };
      },
    })
  },
  payTypeChange:function(e){
    if (e.detail.value == this.data.index) {
      wx.showToast({
        title: '选择未改变！',
        duration: 1000,
        icon: "none"
      })
      return;
    }
    this.setData({
      index: e.detail.value
    })
  },
  personChange:function(e){
    if (e.detail.value==this.data.person){
      wx.showToast({
        title: '选择未改变！',
        duration: 1000,
        icon: "none"
      })
      return;
    }
    var feeAll = (Number(e.detail.value)+ 1)*this.data.fee;
    this.setData({
      person: e.detail.value,
      feeAll: feeAll
    })
  },
  tipsVal:function(e){
    this.setData({
      tips: e.detail.value
    })
  },
  toPay:function(){
    //弹出支付机制,获得一个订单号
    const orderId = "4402851";
    this.setData({
      orderId: orderId
    })
    //支付成功以后执行函数
    this.paySucces();
  },
  paySucces:function(){
    wx.setStorageSync("yourOrder", this.data);
    //不带返回的跳转
    wx.reLaunch({
      url: '../yourOrder/yourOrder?type=1',
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