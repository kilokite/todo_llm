<!-- 首页信息卡 -->
<template>
    <view class="info-card" :style="{'background-color':data.backgroundColor}">
        <view class="top item">
            {{ data.title }}
        </view>
        <view class="bottom item">
            {{ data.content }}
        </view>
    </view>
</template>

<script>
export default{
    props:['data'],
    data(){
        return {
        }
    }
}
</script>

<style scoped>
 .info-card{
    /* background-color: #5883f9; */
    display:flex;
    border-radius: 1rem;
    flex-direction: column;
    margin: .5rem 0;
  }
  .item {
    height: 50%;
    margin: 1rem;
    font-size:1.4rem;
    font-weight: 800;
    color: white;
  }
  .top{
    margin-bottom: .5rem;
  }
  .bottom{
    margin-top: .5rem;
    display: flex;
    flex-direction: row-reverse;
  }
</style>