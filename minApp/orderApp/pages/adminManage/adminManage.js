// pages/adminManage/adminManage.js
import listData from "../../data/adminManageData.js"
import tools from "../../utils/tools.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'员工管理'
    });
    if(listData.list){
      listData.list.forEach(item=>{
        item.show = false;
      })
      this.setData({
        list:listData.list
      })
    }
  },
  showEidt(e){
    let index = tools.getVal(e,'index')
    let list = this.data.list.slice();
    list[index].show = !list[index].show;
    this.setData({
      list: list
    });
  },
  editPerson(e){
    let id = tools.getVal(e,"id");
    wx.navigateTo({
      url: '../editPerson/editPerson?type=edit&id='+id,
    })
  },
  addPerson(){
    wx.navigateTo({
      url: '../editPerson/editPerson?type=add',
    })
  },
  delectPerson(e){
    let id = tools.getVal(e,"id");
    let _this = this;
    wx.showModal({
      content: "确定要删除该员工吗？",
      complete(e) {
        if(e.confirm){
          _this.data.list.splice(_this.data.list.findIndex(i=>i.id==id),1);
          _this.setData({
            list: _this.data.list
          })
        }
      }
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