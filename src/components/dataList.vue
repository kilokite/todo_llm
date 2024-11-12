<!-- 项目列表 -->
<template>
    <view class="content">
        <view class="todo" v-if="this.data.type == '待办事项'">
            <todoComplete @complete="complete" @uncomplete="uncomplete" :taskComplete="data.data.isComplete"></todoComplete>
            <view class="todo_info" @click="itemClick">
                <text class="todo_title">{{ data.data.title }}</text>
                <text class="todo_time">{{ time }}</text>
            </view>
        </view>
        <view class="bill list-card" v-else-if="this.data.type == '记账'">
            <uni-icons type="wallet-filled" size="25" class="icon" color="#999999"></uni-icons>
            <view class="info" @click="itemClick">
                <text class="info_title">{{ data.data.title }}</text>
                <text class="info_time">{{ time }}</text>
            </view>
            <billAmount :amount="data.data.amount"></billAmount>
        </view>
        <view class="list-card" v-else-if="this.data.type == '笔记'">
            <uni-icons type="compose" size="23" class="icon" color="#999999"></uni-icons>
            <view class="info">
                <text class="info_title" @click="itemClick">{{ data.data.title }}</text>
                <text class="info_content">{{ data.data.content.substring(0, 100) }}</text>
                <text class="info_time">{{ data.time }}</text>
            </view>
        </view>
        <view class="list-card" v-else-if="data.type == '键值数据'">

        </view>
    </view>
</template>

<script>
import todoComplete from '@/components/todoComplete.vue'
import billAmount from '@/components/amount'
import time from './time.vue'
import tool from '../js/tool'
import { server , setComplete} from '../js/server'
export default {
    props: ['data','index'],
    data(){
        return {
            time:tool.formattedTime(this.data.data.time,'AA')
        }
    },
    components: { todoComplete , billAmount},
    methods: {
        uncomplete(){
            setComplete(this.index,false)
        },
        complete() {
            setComplete(this.index,true)
        },
        itemClick() {
            //跳转info
            uni.navigateTo({
                url: `info?id=${this.data.id}`,
                success: (res) => {
                    // console.log(this.data);
                    res.eventChannel.emit('acceptDataFromOpenerPage', { data: this.data })
                }
            })
        }
    },
    
}
</script>

<style scoped lang="scss">
.icon ::v-deep text::before {
    display: block;
}

.content {
    margin: .3rem .5rem;
}

.note {
    .icon {
        align-self: start;
    }
}

.list-card {
    padding: .4rem;
    display: flex;
    align-items: center;

    .info {
        display: flex;
        flex-direction: column;
        margin-left: .3rem;
        padding: .2rem .5rem;

        .info_content {
            font-size: .8rem;
            color: #999;
            margin-top: .2rem;
        }

        .info_time {
            font-size: .8rem;
            color: #999;
            margin-top: .3rem;
        }

        .info_title {
            font-size: .9rem;
            font-weight: 500;
        }
    }
}

.bill {
    .amount {
        font-size: 1rem;
        font-weight: 600;
        color: rgb(226, 56, 56);
        background: #ffe1e1;
        padding: .1rem .3rem;
        border-radius: .3rem;
        text-align: center;
        font-variant-numeric: lining-nums;
        margin-left: auto;
    }
}

.todo {
    padding: .4rem;
    display: flex;
    align-items: center;

    .todo_info {
        display: flex;
        flex-direction: column;
        margin-left: .3rem;
        padding: .2rem .5rem;

        .todo_time {
            font-size: .8rem;
            color: #999;
            margin-top: .2rem;
        }

        .todo_title {
            font-size: .9rem;
            font-weight: 500;
        }
    }
}
</style>