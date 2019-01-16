// pages/yourOrder.js
import data from "../../data/employeeOrderDetailData.js"
import tools from "../../utils/tools.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (data){
      wx.setNavigationBarTitle({
        title: '订单详情'
      });
      this.setData(data)
    }  
  },
  hadMadeItem(e){
    if (this.data.state==1){
      let index = tools.getVal(e, 'index');
      let arr = this.data.preOrderData;
      arr[index].hadMade = !arr[index].hadMade;
      this.setData({
        preOrderData:arr
      });
      if(arr.filter(item=>{ return !item.hadMade }).length==0){
        this.hadMade(index);
      }
    }
  },
   /**
   * 确认顾客已支付
   */
  hasPay(){
    let _this = this;
    wx.showModal({
      title:"确认顾客已支付",
      content:"确定顾客已经通过 现金 刷卡 等其他方式完成支付了吗？",
      complete(e){
        if(e.confirm){
          _this.setData({
            state: 0
          })
        }
      }
    })
  },
   /**
   * 无效订单
   */
  canserOrder(){
    let _this = this;
    wx.showModal({
      title: "取消订单",
      content: "点击确定将作废该订单，你确定要取消此订单吗？",
      complete(e) {
        if (e.confirm) {
          _this.setData({
            state: 3
          })
          _this.backToList()
        }
      }
    })
  },
  /**
  * 确认订单
  */
  receiveOrder() {
    let _this = this;
    wx.showModal({
      title: "确认订单",
      content: "厨房确认收到订单并开始制作？",
      complete(e) {
        if (e.confirm) {
          _this.setData({
            state: 1
          })
        }
      }
    })
  },
  /**
  * 制作完成
  */
  hadMade(index) {
    let _this = this;
    wx.showModal({
      title: "制作完成",
      content: "确认菜品已经全部制作完成，准备配送？",
      complete(e) {
        let arr = _this.data.preOrderData;
        if (e.confirm) {
          arr.forEach(item=>{item.hadMade = true});
          _this.setData({
            state: 2,
            preOrderData:arr
          })
        }else if(index||index==0){
          arr[index].hadMade = false;
          _this.setData({
            preOrderData: arr
          })
        }
      }
    })
  },
  /**
   * 配送完成
   */
  hadServing() {
    let _this = this;
    wx.showModal({
      title: "配送完成",
      content: "确认菜品已经全部配送完成，将完成订单？",
      complete(e) {
        if (e.confirm) {
          _this.setData({
            state: 3
          })
        }
      }
    })
  },
  /**
   * 返回列表
   */
  backToList(){
    wx.navigateBack({
      url: '../employeeOrderList/employeeOrderList',
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