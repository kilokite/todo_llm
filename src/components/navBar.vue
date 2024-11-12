<template>
    <view class="nav-bar">
        <uni-icons type="arrow-left" size="25" @click="back"></uni-icons>
        <text class="pack_title">用户转正</text>
    </view>
</template>

<script>
export default {
    props: {
        //显示sidebar按钮
        sidebar: {
            type: Boolean,
            default: false
        },
        //显示返回按钮
        back: {
            type: Boolean,
            default: false
        },
        //显示下拉菜单
        menu: {
            type: Boolean,
            default: false
        },
        //navbar颜色
        color: {
            type: String,
            default: '#fff'
        },
    },
}
</script>

<style></style>