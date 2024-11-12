export default {
    formattedTime(data, type) {
        if(data == false){
            return ''
        }
        if (type[0] === 'A') {
            if (type[1] === 'A') {
                let retu = `${data.Y}年${data.M}月${data.D}日`;
                if (data.h !== 0 || data.m !== 0) {
                    retu += ` ${data.h}:${data.m}`;
                }
                return retu;
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
    },
    // 生成一个随机的大写字母
    getRandomLetter() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return letters.charAt(Math.floor(Math.random() * letters.length));
    },

    // 生成八位大写字母组成的ID
    generateCODE() {
        let id = '';
        for (let i = 0; i < 8; i++) {
            id += getRandomLetter();
        }
        return id;
    }

    , getCurrentTime() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const time = { Y: year, M: month, D: day, h: hour, m: minute };
        return time;
    }
    , convertToTimestamp(jsonTime) {
        const time = JSON.parse(jsonTime);
        const date = new Date(time.Y, time.M - 1, time.D, time.h, time.m);
        return date.getTime();
    }
}
