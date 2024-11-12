<!-- 设置项目列表 -->
<template>
    <view class="setting">
        <view class="icon">
            <image :src="`/src/static/icon/${this.icon}.png`" />
        </view>
        <view class="text">
            <text>
                <slot></slot>
            </text>
        </view>
        <view class="arrow">
            <image src="@/static/icon/arrow.png" />
        </view>
    </view>
</template>
<script>
export default{
    props:['icon']
}
</script>
<style lang="scss">

.setting {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.icon {
    height: 1.2rem;
    margin-left: .5rem;
    image {
        width: 1.2rem;
        height: 1.2rem;
    }
}

.arrow {
    margin-left: auto;
    height: 1.2rem;
    image {
        width: 1.2rem;
        height: 1.2rem;
    }
}

.text {
    margin: .5rem 0 .5rem .5rem;
    text {
        display: block;
        // font-weight: bolder;
        align-items: center;
        font-size: .9rem;
    }
}
</style>