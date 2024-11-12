import common from '@/common.vue'
export function server(item, parmer, callback) {
    uni.request({
        url: 'http://localhost:8080/' + item,
        method: 'POST',
        header: {
            'content-type': 'application/json'
        },
        data: parmer,
        success: (res) => {
            callback(null, res)
        },
        fail: (err) => {
            callback(err)
        }
    })
}
//获取项目列表
//TODO 标记
export function refreshData() {
    console.log("getting data..")
    server('getItemList', { user_id: common.id }, (err, req) => {
        if (err) {
            console.log("无法连接服务器")
        } else {
            common.data.list = req.data;
            console.log("data get success", req.data)
        }
    })
}
//修改TODO项目状态
export function setComplete(item_id, isComplete) {
    server('setComplete', { item_id, isComplete }, (err, req) => {
        if (err) {
            console.log("无法连接服务器")
        } else {
            console.log("setComplete success", req.data)
        }
    })
}
//修改项目内容
export function setItem(item_id, data) {
    console.log(data)
    server('setItem', { item_id, data }, (err, req) => {
        if (err) {
            console.log("无法连接服务器")
        } else {
            if(!err){
            console.log("setItem success", req.data)
            }else{
                alert("保存失败")
            }
        }
    })
}
//get item by id
export function getItemById(item_id) {
    server('getItemById', { item_id }, (err, req) => {
        if (err) {
            console.log("无法连接服务器")
        } else {
            console.log("getItemById success", req.data)
        }   
    })
}
