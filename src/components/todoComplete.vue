<!-- 组件：任务完成按钮 -->
<template>
    <view>
    <uni-icons :type="icon" size="25" :class="{'small':small,'the-icon':true}" :color="buttonColor" @click="complete"></uni-icons>
    </view>
</template>

<script>
export default {
    data(){
        return{
            isComplete:false,
            buttonColor:'#999999',
            icon:"circle",
            small:false
        }
    },
    methods:{
        complete(){
            if (this.isComplete) {
                this.small = true
                this.buttonColor = '#999999'
                this.$emit('uncomplete')
                this.isComplete = false
                setTimeout(()=>{
                    this.icon = 'circle'
                    this.small = false
                },200)
            }else{
                this.small = true
                this.buttonColor = '#57c974'
                this.$emit('complete')
                this.isComplete = true
                setTimeout(()=>{
                    this.icon = 'checkmarkempty'
                    this.small = false
                },200)
            }
        }
    },
    beforeMount(){
        if (this.taskComplete) {
            this.isComplete = true
            this.icon = 'checkmarkempty'
            this.buttonColor = '#57c974'
        }
    },
    emits:['complete','uncomplete'],
    props:['taskComplete']
}
</script>

<style lang="scss" scoped>
view ::v-deep text::before{
    display: block;
}
.the-icon::before{
    transition: transform .1s ease;
}

.small::before{
    transform: scale(0.1);
    transition: transform .1s ease;
}
</style>