<!-- 花费卡 -->
<template>
    <view v-if="type == 'card'" class="pay-amount" :class="{ 'green-pay-amount': greenAmount }">{{ amount }}</view>
    <text v-else class="amount" :class="{ 'green-amount': greenAmount }">{{ amount }}</text>
</template>
<script>
export default {
    data() {
        return {
            greenAmount: false
        }
    },
    props: {
        amount: {
            default: 0
        },
        type: {
            type: String,
            default: 'normal'
        }
    },
    beforeMount() {
        if (this.amount > 0) {
            this.greenAmount = true
        }
    }
}
</script>
<style scoped>
.green-pay-amount {
    color: #57c974 !important;
    text-shadow: #00ff00 0 0 2.5rem !important;
}

.green-amount {
    color: #57c974 !important;
    background: #e1ffe1 !important;
}

.amount {
    font-size: 1rem;
    font-weight: 600;
    color: #e23838;
    background: #ffe1e1;
    padding: .1rem .3rem;
    border-radius: .3rem;
    text-align: center;
    font-variant-numeric: lining-nums;
    margin: .1rem .3rem;
}

.pay-amount {
    margin-left: auto;
    font-size: 2rem;
    font-weight: bold;
    color: #e23838;
    text-shadow: #ff0000 0 0 2.5rem;
    background-color: #00000000;
}
</style>