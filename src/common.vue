<script>
let id = 0
let code = '000000'
let name = "未登陆"
let refresh = false
let data = {
    list: [
        {
            id: 8,
            user_id: 37,
            type: '待办事项',
            data: {
                time: {},
                title: '明年今天去看电影',
                content: '',
                isComplete: false
            },
            time: "2023-05-09T14:51:14.000Z"
        },
        {
            type: "记账",
            title: "早上吃饭花六元",
            amount: "-6",
            content: "如何评价",
            item: "早上吃饭",
            wallet: "必要花费",
            time: "2020 -32-3- ",
            item_type: "吃",
            id: 18
        },
        {
            type: "记账",
            title: "搬砖",
            amount: "+50",
            content: "如何评价",
            item: "早上吃饭",
            wallet: "必要花费",
            time: "2020 -32-3- ",
            item_type: "吃",
            id: 19
        },
        {
            type: "待办事项",
            title: "洗衣服",
            isComplete: true,
            time: "2020-12-12 12:12:12",
            endTime: "2020-12-12 15:12:12",
            content: "这是一条待办事项A",
            id: 20
        },
        {
            type: "待办事项",
            title: "明年今天去看电影",
            isComplete: false,
            time: "2020-12-12 12:12:12",
            endTime: "2020-12-12 15:12:12",
            content: "这是一条待办事项A",
            id: 21
        },
        {
            type: "笔记",
            title: "紫罗兰花语",
            content: "紫罗兰的花语：永恒的美与爱；质朴，美德，盛夏的清凉。 紫罗兰（蓝色）：警戒，忠诚，我将永远忠诚。 紫罗兰（白色）：让我们抓住幸福的机会吧。 紫罗兰（紫色）：在梦境中爱上你，对我而言你永远那么美。",
            time: "2020-12-12 12:12:12",
            id: 22
        }
    ],
    index: [
        {
            "title": "今天的花销",
            "backgroundColor": "#5883f9",
            "content": "-66"
        },
        {
            "title": "今天完成的事",
            "backgroundColor": "#5883f9",
            "content": "5件"
        }
    ]
}
export default {
    id, code, name, data, refresh
}
</script>