<template>
    <view class="content">
        <text class="title">关于我</text>
        <view class="myself">
            <view class="head"></view>
            <view class="info">
                <text class="name">{{ name }}</text>
                <text class="code">引继码: {{ code }}</text>
            </view>
        </view>
        <view class="overview">

        </view>
        <view class="item">
            <Settinglist icon="alert" class="alertCard" @click="toConversion">用户转正</Settinglist>
        </view>
    <view class="item card">
        <Settinglist icon="setting" @click="toSetting">基础设置</Settinglist>
        <Settinglist icon="database">数据管理</Settinglist>
        <Settinglist icon="tag">标签与色卡</Settinglist>
        <Settinglist icon="collect">首页显示</Settinglist>
        <Settinglist icon="info">关于</Settinglist>
    </view>
    </view>
</template>

<script>
import common from '../../common'
import Settinglist from '@/components/settinglist.vue';
export default {
    data() {
        return {
            id: common.id,
            name: common.name,
            code: common.code,
        };
    },
    components: { Settinglist },
    methods: {
        toConversion(){
            uni.navigateTo({
                url: '/pages/another/reg'
            })
        },
        toSetting(){
            uni.navigateTo({
                url: '/pages/another/setting'
            })
        }
    },
}
</script>

<style lang="scss">

.bar-category {
  display: flex;
  flex-wrap: wrap;
}
.bar-category li {
  list-style: none;
  display: inline-block;
  margin: 0.3rem 0.3rem;
  font-size: 1rem;
  font-weight: bold;
  padding: 0 0.3rem;
  word-wrap: break-all;
  border-radius: 0.25rem;
}
.bar-category li span,
.bar-category li a {
  display: inline-block;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}
.bar-category li span {
  border-left: solid 0.1rem;
  padding: 0.2rem;
}
.bar-category li.category {
  background-color: rgba(127, 42, 212, 0.0823529412);
}
.bar-category li.category a,
.bar-category li.category span {
  color: #a66df2;
}
.bar-category li.category span {
  border-color: rgba(127, 42, 212, 0.0823529412);
}
.bar-category li.tag {
  background-color: rgba(42, 147, 212, 0.0823529412);
}
.bar-category li.tag a,
.bar-category li.tag span {
  color: #6dc2f2;
}
.bar-category li.tag span {
  border-color: rgba(42, 147, 212, 0.0823529412);
}

.bar-article .bar-article-title {
  color: rgb(79, 79, 79);
  margin-bottom: 0.3rem;
  font-size: 1rem;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}
.bar-article .icon-sync {
  margin-right: 0.5rem;
}
.bar-article .icon-sync::before {
  content: "\e611";
}
.bar-article .tool-random {
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: rgba(79, 79, 79, 0.344);
  padding: 0.2rem;
  border-radius: 0.25rem;
  border: none;
}

.tool {
  display: flex;
  align-items: center;
}

.vio-pagination {
  display: inline-block;
  background: rgba(127, 42, 212, 0.0823529412);
  border-radius: 1rem;
  padding: 1rem 1.5rem;
}
.vio-pagination:empty {
  display: none;
}
.vio-pagination .page-numbers {
  margin: 0 1rem;
  font-weight: bold;
}
.vio-pagination .dots {
  margin: 0;
}
.vio-pagination .current {
  color: #a66df2;
}

.vio-archive-title {
  border-radius: 1rem;
  box-shadow: 0.2rem 0.2rem 1rem rgba(128, 128, 128, 0.05);
  transition: box-shadow 0.3s;
  padding: 2rem;
  background: white;
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  font-size: 1rem;
}
.vio-archive-title:hover {
  box-shadow: 0.2rem 0.2rem 2rem rgba(128, 128, 128, 0.1);
  transition: box-shadow 0.5s;
}
.vio-archive-title > div {
  display: inline-block;
}
.vio-archive-title h1 {
  font-weight: bold;
}
.vio-archive-title p {
  color: rgba(79, 79, 79, 0.8);
}
.vio-archive-title::before {
  display: inline-block;
  content: "&";
  line-height: 3rem;
  text-align: center;
  color: #a66df2;
  font-weight: bold;
  font-size: 1.5rem;
  height: 3rem;
  width: 3rem;
  background: rgba(127, 42, 212, 0.0823529412);
  border-radius: 1rem;
  margin-right: 1rem;
}
.vio-archive-title[tag]::before {
  content: "#";
  background-color: rgba(42, 147, 212, 0.0823529412);
  color: #6dc2f2;
}
.vio-archive-title[search]::before {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\e655";
  padding-right: 0.15rem;
}

.sticky_post::before {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "\e651";
  color: #a66df2;
  background: rgba(127, 42, 212, 0.0823529412);
  padding: 0.3rem;
  border-radius: 0.5rem;
  transform: rotate(45deg);
}

.alertCard {
    border-radius: .5rem;
    // background-color: #fff6f6;
    border: #f6bdcb .1rem solid;
    background: white;
}
.card{
    background: white;
    border-radius: .5rem;
    // margin: .5rem 0;
    padding: .3rem;
}

.item {
    margin: 1rem 0;
}

.myself {
    display: flex;
    // background-color: #eaf8ff;
    border-radius: 1rem;

    .head {
        height: 4rem;
        width: 4rem;
        background: #aad3ff;
        border-radius: 5rem;
        margin: 1rem 0 1rem 1rem;
    }

    .info {
        margin: 0 0 0 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;

        text {
            display: block;
            margin: 0 0 .5rem 0;
        }

        .name {
            font-size: 1.2rem;
            font-weight: bold;
        }

        .code {
            font-size: .8rem;
            color: #999;
        }
    }
}
</style>