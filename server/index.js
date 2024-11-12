/**
 * TODO 去除密码
 * TODO 去除apikey
 */

import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
import tool from './tool.js'
import Data from './data.js'

let app = express();
import cors from 'cors'
app.use(cors());

const configuration = new Configuration({
    apiKey: 'your openAI key',
});
const openai = new OpenAIApi(configuration);

app.listen(8080, () => {
    console.log("server is running")
})

app.use(express.json())

async function main() {
    /**
     * 询问GPT
     * @param {*} question 
     * @param {*} callback 
     * @param {*} count 
     */
    function GPT(question, callback, count = 0, json = true) {
        console.log(question)
        //失败再次尝试，最多五次
        if (count > 5) {
            callback(true)
        } else {
            openai.createCompletion({
                model: "text-davinci-003",
                prompt: question,
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            }, {
                timeout: 5000
            }).then((response) => {
                if (!json) {
                    callback(null, response.data.choices[0].text)
                } else {
                    try {
                        let ans = response.data.choices[0].text;
                        //截取文本ans，第一个{到最后一个}，保留{}
                        let start = ans.indexOf("{");
                        let end = ans.lastIndexOf("}");
                        ans = ans.slice(start, end + 1);
                        ans = ans.replace(/：/g, ":")
                        console.log(response.data.choices[0].text, '->', ans)
                        let data = JSON.parse(response.data.choices[0].text);
                        callback(null, data)
                    } catch (err) {
                        GPT(question, callback, count + 1)
                        console.log("json非法,重新请求", err)
                    }
                }
            }).catch((err) => {
                GPT(question, callback, count + 1)
                console.log("重新请求", err)
            })
        }
    }
    /**
     * 文本分类
     * @param {*} question 
     * @param {*} callback 
     */
    function classify(question, callback) {
        question = `接下来会有一段文本,可能是[待办事项,记账,笔记,键值数据]的其中一种，以用户是随手写的角度考虑
        根据下面的内容,务必仅用json格式回复我,属性type有上述数据类型的5种可能
        内容是“${question}”`;
        GPT(question, (err, type) => {
            if (err) {
                callback(true)
            } else {
                if (type.type == "待办事项" || type.type == "记账" || type.type == "笔记" || type.type == "键值数据") {
                    callback(null, type.type)
                } else {
                    callback(true)
                }
            }
        }
        )
    }
    /**
     * 提取文本内容
     * @param {*} type 
     * @param {*} input 
     * @param {*} callback 
     */
    function analysis(type, input, callback) {
        if (type == "待办事项") {
            let time = JSON.stringify(tool.getCurrentTime())
            let question = `以随手记角度分析待办事项时间;json有{time}一个属性;内容中没有时间时,time为false(无需返回时间);有时间时,time有{Y,M,D,h,m}5个属性,为计划中的时间;现在的时间:${time},内容:${input},输出json(有且仅有)`
            GPT(question, (err, data) => {
                if (!err) {
                    callback(null, data)
                } else {
                    callback(true)
                }
            })
        } else if (type == "记账") {
            let question = `以随手记角度分析记账文本;json有{time,money}两个属性;内容中没有时间时,time为false(无需返回时间);有时间时,time有{Y,M,D,h,m}5个属性,为记账时间;money为记账金额;现在的时间:${time},内容:${input},必须输出json(有且仅有，绝对不可以出现其他内容)            `
            GPT(question, (err, data) => {
                if (!err) {
                    callback(null, data)
                } else {
                    callback(true)
                }
            })
        } else if (type == "笔记") {
            //TODO
            let question = `分析我的笔记，提取一个可以概括全文的标题（只需返回标题，绝对不可以出现其他内容），以下是笔记${input}`
            GPT(question, (err, data) => {
                if (!err) {
                    callback(null, data)
                } else {
                    callback(true)
                }
            }, 1, false)
        } else if (type == "键值数据") {
            //TODO
            let question = `以随手记角度提取文本内容，内容存在键值数据;json有{key,value}两个属性,分别对应数据的key与value;内容:${input},输出json(有且仅有)`
            GPT(question, (err, data) => {
                if (!err) {
                    callback(null, data)
                } else {
                    callback(true)
                }
            })
        }
    }
    /**
     * API：新建用户
     */
    app.post('/newuser', async (req, res) => {
        res.send(await Data.newUser());
    })

    //TODO
    // API路由
    app.get('/user/:id', async (req, res) => {
        const userId = req.params.id;
        const userInfo = await getUserInfo(userId);
        res.send(userInfo);
    });

    /**
     * API：添加数据项
     */
    app.post('/addItem', (req, res) => {
        let { user_id, content } = req.body;
        classify(content, (err, type) => {
            if (!err) {
                if (type == "待办事项") {
                    analysis(type, content, async (err, data) => {
                        if (!err) {
                            //添加数据
                            try {
                                content = {
                                    time: data.time,
                                    title: content,
                                    content: "",
                                    isComplete: false
                                }
                            } catch (err) {
                                //TODO 错误处理
                            }
                            res.send(await Data.addItem(user_id, type, content))
                        } else {
                            res.send({ err, msg: "解析错误" })
                        }
                    })
                } else if (type == "记账") {
                    analysis(type, content, async (err, data) => {
                        if (!err) {
                            //添加数据
                            try {
                                content = {
                                    time: data.time,
                                    money: data.money,
                                    title: content,
                                    content: "",
                                }
                            } catch (err) {
                                //TODO 错误处理
                            }
                            res.send(await Data.addItem(user_id, type, content))
                        } else {
                            res.send({ err, msg: "解析错误" })
                        }
                    })

                } else {
                    res.send({ err, msg: "暂不支持该类型", type: type })
                }
            }
        })
    })
    /**
     * API：分析文本
     */
    app.post('/analysis', (req, res) => {
        let { type, content } = req.body;
        analysis(type, content, (err, data) => {
            if (!err) {
                res.send({ data })
            } else {
                res.send({ err })
            }
        })
    })
    /**
     * API：分类文本
     */
    app.post('/classify', async (req, res) => {
        let question = req.body.question;
        classify(question, (err, type) => {
            if (err) {
                res.send({ err })
            } else {
                res.send({ type })
            }
        })
    })
    /**
     * API：测试
     */
    app.get('/test', (req, res) => {
        setTimeout(() => {
            console.log(2333)
            res.send({ data: "2ssdsdsd333" })
        }, 5000)
    })
    /**
     * API：获取数据列表
      TODO 支持筛选选项
     */
    app.post('/getItemList', async (req, res) => {
        if (req.body.user_id) {
            let { user_id, page = 0 } = req.body;
            let data = await Data.getItemList(user_id, page);
            res.send(data)
        } else {
            res.send({ err: "未登录" })
        }
    })
    /**
     * API:修改todo完成状态
     */
    app.post('/setComplete', async (req, res) => {
        let { item_id, isComplete } = req.body;
        let data = await Data.todoCompelte(item_id, isComplete);
        res.send(data)
    })
    /**
     * API:获取项目
     */
    app.post('/getItemById', async (req, res) => {
        let { item_id } = req.body;
        let data = await Data.getItemById(item_id);
        res.send(data)
    })
    /**
     * API:修改项目
     */
    app.post('/setItem', async (req, res) => {
        let { item_id, data } = req.body;
        data = await Data.setItem(item_id, data);
        res.send(data)
    })
    /**
     * API:模糊查询
     */
    app.post('/search', async (req, res) => {
        let { user_id, keyword } = req.body;
        let data = await Data.search(user_id, keyword);
        res.send(data)
    })
}

main()