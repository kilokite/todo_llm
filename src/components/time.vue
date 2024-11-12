<template>
    <div class="time-container">
        <p class="time">{{ formattedTime }}</p>
    </div>
</template>

<script>
export default {
    props: {
        time: {
            type: Object
        },
        type: {
            type: String,
            default: 'AA'
        }
    },
    data() {
        return {
        };
    },
    computed: {
        formattedTime() {
            let data = this.timeData;
            let type = this.type;
            if (type[0] === 'A') {
                if (type[1] === 'A') {
                    return `${data.Y}年${data.M}月${data.D}日 ${data.h}时${data.m}分`;
                } else {
                    return `${data.Y}年${data.M}月${data.D}日`;
                }
            } else {
                if (type[1] === 'A') {
                    return `${data.Y}/${data.M}/${data.D} ${data.h}:${data.m}:${data.s}`;
                } else {
                    return `${data.h}:${data.m}`;
                }
            }
        }
    }
};
</script>
<style>
.time-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 10px;
}

.time {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}
</style>

