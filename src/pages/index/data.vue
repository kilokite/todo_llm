<template>
    <view class="the-bar">
        <text class="title">所有项</text>
        <uni-icons type="more-filled" size="25" color="#000" @click="filterClick" class="bars-icon"></uni-icons>
    </view>
    <view class="content">
        <!-- <view class="addItem"></view> -->
        <uni-fab class="fabpp"  horizontal="right" vertical="bottom" :popMenu="false" direction="vertical"
            :pattern="{ buttonColor: '#5883f9', iconColor: '#fff' }" @fabClick="fabClick"></uni-fab>
        <view class="datalist">
            <!-- 数据展示列表 -->
            <view v-for="(item,index) in list">
                <dataList :data="item" :index="item.id"></dataList>
            </view>
        </view>
        <uni-popup ref="popup" type="top" @change="popup_change">
            <view class="top-card">
                <textarea :focus="true" v-model="putText"/>
                <view class="tool_bar">
                    <text class="type">手动定义</text>
                    <uni-icons type="paperplane-filled" size="20" color="#ffffff" @click="popup_submit"
                        class="ok"></uni-icons>
                </view>
            </view>
        </uni-popup>
        <uni-popup ref="filter" type="top" @change="popup_change">
            <view class="top-card">
                <text>心选的项目</text>
                <view class="select">
                    <uni-icons type="compose" size="20" color="#999"></uni-icons>
                    <uni-icons type="wallet-filled" size="20" color="#999"></uni-icons>
                    <uni-icons type="star-filled" size="20" color="#999"></uni-icons>
                    <uni-icons type="checkmarkempty" size="20" color="#999"></uni-icons>
                    <uni-icons type="heart-filled" size="20" color="#ff7575" class="selected"></uni-icons>
                </view>
                <text>时间</text>
                <view class="select sel-time">
                    <text class="selected">全部</text>
                    <text>今天</text>
                    <text>本周</text>
                    <text>本月</text>
                    <text>本年</text>
                </view>
                <text class="filter_clean">清除选择</text>
            </view>
        </uni-popup>
    </view>
</template>
<script>
import dataList from '@/components/dataList.vue'
import common from '@/common'
import {server} from '@/js/server'
// console.log(common.data.list)
export default {
    data() {
        return {
            common,
            list: common.data.list
        }
    },
    options: { styleIsolation: "shared" },
    methods: {
        fabClick() {
            this.$refs.popup.open()
            uni.hideTabBar()
        },
        popup_change(res) {
            if (!res.show) {
                uni.showTabBar()
            }
        },
        filterClick() {
            this.$refs.filter.open()
        },
        popup_submit(){
            //提交
            server('addItem',{
                user_id: common.id,
                content:this.putText
            },()=>{
                alert("添加成功")
            })
        }
    },
    components: {
        dataList
    }
}
</script>

<style lang="scss" scoped>
.top-card {
    text {
        font-weight: bold;
        font-size: .7rem;
        margin-left: .5rem;
    }
    .filter_clean{
        margin-left: 15rem;
        margin-right: .5rem;
        color: #296dff;
        background-color: #bed9fb;
        padding: .2rem .3rem;
        border-radius: .3rem;
    }
    .select {
        //图标等分
        display: flex;
        justify-content: space-between;
        margin: .6rem 2rem 1rem 0;

        .sel-time  {
            margin: 0 2rem 0 0;
            color: #999;
        }
        .uni-icons {
            margin: 0 .5rem;

            &:first {
                margin-left: 0;
            }
        }

        .selected {
            background-color: #ffe1e1;
            padding: .1rem .2rem;
            border-radius: .5rem;
        }
    }
}

.the-bar {
    display: flex;
    align-items: center;
    margin: .5rem;

    .title {
        margin-bottom: .5rem;
    }

    .bars-icon {
        margin: 0 0 0 auto;
        padding: .2rem .5rem;
    }

    .bars-icon ::v-deep text::before {
        display: block;
        font-weight: bold;
    }
}
.tool_bar {
    display: flex;
    align-items: center;

    .ok {
        margin: 0 0 0 auto;
        padding: .2rem .5rem;
        background: #5883f9;
        border-radius: .5rem;
    }

    .type {
        font-size: .7rem;
        color: #5883f9;
        background-color: #eaf3ff;
        padding: .1rem .2rem;
        border-radius: .3rem;
    }
}

.top-card {
    margin: 1rem;
    padding: 1rem;
    min-height: 5rem;
    background: white;
    border-radius: 1rem;
}

.datalist {
    background: white;
    border-radius: .5rem;
    display: flex;
    flex-direction: column-reverse;
}

.fabpp ::v-deep .uni-fab,
.fabpp ::v-deep .uni-fab__circle {
    box-shadow: #d5e4f782 0 .2rem .5rem;
}

.content {
    position: relative;
}

.addItem {
    background-color: rgb(156, 156, 255);
    height: 3rem;
    width: 3rem;
    border-radius: 5rem;
    position: absolute;
    right: 1rem;
    /* bottom: 5rem; */
    color: #bed9fb;
}</style>