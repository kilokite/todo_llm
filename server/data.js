import mysql from 'mysql'
import tool from './tool.js'

let sql = mysql.createConnection({
    host: 'localhost',
    user: 'zocsrd',
    password: 'zocs.ulock',
    port: 3306,
    database: 'tk'
})

sql.connect((err) => {
    if (err) {
        console.log("!SQL")
    } else {
        console.log("#SQL_ok")
    }
})

export default {
    /**
     * 新建用户
     * @returns {Promise} 
     */
    newUser() {
        return new Promise((resolve) => {
            function generateUniqueCODE(callback) {
                let CODE = tool.generateCODE();
                sql.query('SELECT CODE FROM user WHERE code=?', [CODE], (err, res) => {
                    if (err) {
                        callback(err);
                    } else if (res.length === 0) {
                        callback(null, CODE);
                    } else {
                        // 如果CODE已经存在，递归调用该函数以生成新的CODE并再次检查它是否存在
                        generateUniqueCODE(callback);
                    }
                });
            }
            generateUniqueCODE((err, CODE) => {
                if (err) {
                    console.log(err, "bad");
                } else {
                    sql.query('INSERT INTO user (code) VALUES(?)', [CODE], (err, insert_res) => {
                        if (err) {
                            resolve({ err })

                        } else {
                            resolve({ code: CODE, id: insert_res.insertId })
                        }
                    })
                }
            })
        })
    },
    // 数据库函数
    getUserInfo(userId) {
        //TODO 获取用户信息
        // 这里假设我们已经有了一个可以执行SQL查询的函数 `executeQuery`
        // const result = await executeQuery(`SELECT * FROM users WHERE id = ${userId}`);
        // return result;
    }
    ,
    /**
     * 为一个用户添加项目
     * @param {*} user_id 
     * @param {*} type 
     * @param {*} content 
     * @returns 
     */
    addItem(user_id, type, content) {
        return new Promise((resolve) => {
            content = JSON.stringify(content)
            sql.query('INSERT INTO data (user_id,type,data) VALUES(?,?,?)', [user_id, type, content], (err, insert_res) => {
                if (err) {
                    resolve({ err })
                } else {
                    resolve({ id: insert_res.insertId })
                }
            })
        })
    },
    /**
     * 获取对应用户ID的项目列表
     * @param {*} user_id 
     * @param {*} page 
     * @returns 
     */
    getItemList(user_id, page = 0) {
        //TODO 应该支持筛选选项
        return new Promise((resolve) => {
            sql.query("SELECT * FROM data WHERE user_id=? LIMIT 20 OFFSET ?", [user_id, page], (err, select_res) => {
                if (err) {
                    resolve({ err })
                } else {
                    //解析数据
                    for (let i = 0; i < select_res.length; i++) {
                        select_res[i].data = JSON.parse(select_res[i].data)
                    }
                    // console.log(select_res)
                    resolve(select_res)
                }
            })
        })
    },
    getItemById(item_id) {
        sql.query("SELECT * FROM data WHERE id=?", [item_id], (err, select_res) => {
            if (err) {
                resolve({ err })
            } else {
                if (select_res.length === 0) {
                    resolve({ err: "no item" })
                }else{
                    select_res[0].data = JSON.parse(select_res[0].data)
                    resolve(select_res[0])
                
                }
            }
        })
    },
    /**
     * TODO:为数据项添加可能用于搜索的附加属性
     */
    additional() {

    },
    /**
     * 完成项目
     * @param {*} id 
     * @param {*} type 
     * @returns 
     */
    todoCompelte(id, type) {
        return new Promise((resolve) => {
            sql.query("SELECT * FROM data WHERE id=?", [id], (err, select_res) => {
                if (err) {
                    resolve({ err })
                } else {
                    if (select_res.length === 0) {
                        resolve({ err: "no item" })
                    } else {
                        let item = JSON.parse(select_res[0].data)
                        item.isComplete = type;
                        sql.query("UPDATE data SET data=? WHERE id=?", [JSON.stringify(item), id], (err, update_res) => {
                            if (err) {
                                resolve({ err })
                            } else {
                                resolve({ id })
                            }
                        })
                    }
                }
            })
        })
    },
    /**
     * 修改项目的content
     */
    setItem(id, content) {
        return new Promise((resolve) => {
            sql.query("SELECT * FROM data WHERE id=?", [id], (err, select_res) => {
                if (err) {
                    resolve({ err })
                } else {
                    if (select_res.length === 0) {
                        resolve({ err: "no item" })
                    } else {
                        sql.query("UPDATE data SET data=? WHERE id=?", [JSON.stringify(content), id], (err, update_res) => {
                            if (err) {
                                resolve({ err })
                            } else {
                                resolve({ id })
                            }
                        })
                    }
                }
            })
        })
    },
    /**
     * 模糊查询
     */
    search(user_id, keyword) {
        return new Promise((resolve) => {
            sql.query("SELECT * FROM data WHERE user_id=? AND data LIKE ?", [user_id, "%" + keyword + "%"], (err, select_res) => {
                if (err) {
                    resolve({ err })
                } else {
                    //解析数据
                    for (let i = 0; i < select_res.length; i++) {
                        select_res[i].data = JSON.parse(select_res[i].data)
                    }
                    // console.log(select_res)
                    resolve(select_res)
                }
            })
        })
    }
}