<script>
import {refreshData, server} from './js/server'
import common from './common'
export default {
  beforeCreate(){
    //获取用户信息/获取初始用户列表
    uni.getStorage({
      key:'token',
      fail:()=>{
        //新用户
        console.log("无用户")
        server('newuser',{},(err,req)=>{
          if(err){
            console.log(err,"err")

          }else{
            if(req.data.id){
              console.log(req)
                uni.setStorage({key:'token',data:req.data.id})
                uni.setStorage({key:'user',data:"嘉心糖"})
                uni.setStorage({key:'code',data:req.data.code})
                common.id = req.data.id;
                common.name = "嘉心糖";
                common.code = req.data.code;
            }
          }
        })
      },
      success:(res)=>{
        common.id = res.data;
        common.name = uni.getStorageSync('user');
        common.code = uni.getStorageSync('code');
        //已有用户
        refreshData()
      }
    })
  }
}
</script>

<style lang="scss">
page{
  background-color: #f7f7f7;
}
  .title{
    font-size: 1.5rem;
    font-weight: 900;
    margin: .5rem 0 1rem .5rem;
  }
  * {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
  .content {
    display:flex;
    flex-direction:column;
    margin: .5rem;
  }
</style>
