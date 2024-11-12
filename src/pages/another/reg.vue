<template>
  <view class="nav-bar">
    <uni-icons type="arrow-left" size="25" @click="back"></uni-icons>
    <text class="pack_title">用户转正</text>
  </view>
  <view class="content">
    <form @submit.prevent="submitForm">
      <label>
        <span>用户名</span>
        <input type="text" v-model="username" required>
      </label>
      <label>
        <span>密码</span>
        <input type="password" v-model="password" required>
      </label>
      <label>
        <span>电子邮件</span>
        <input type="email" v-model="email" required>
      </label>
      <button type="submit">提交</button>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    submitForm() {
      // 将表单数据发送到服务器以保存用户信息
      const userData = {
        username: this.username,
        password: this.password,
        email: this.email
      }
      console.log(userData) // 在控制台中输出表单数据，以便你可以查看它们是否正确
    },
    back() {
      uni.navigateBack({
        delta: 1
      })
    },
  }
}

</script>

<style>
button {
  margin: 2rem;
  background: #5883f9;
  color: white;
  font-size: 1rem;
  font-weight: bold;
}
input {
  height: 2rem;
  /* border: soli; */
  border-bottom: .1rem solid #d6d6d6;

}

label>span {
  margin: .5rem 0;
  display: inline-block;
  width: 5rem;
  font-weight: bold;
}

.content {
  margin: .3rem 1rem;

  .article_title {
    display: flex;
    margin-bottom: 1rem;
    align-items: center;

    text {
      font-size: 1.2rem;
      font-weight: 900;
    }

    .todoComplete {
      margin-left: .1rem;
      display: block;
    }
  }
}

.nav-bar {
  padding: 1rem;
  display: flex;
  align-items: center;

  .pack_title {
    margin-left: 1rem;
    font-weight: 900;
    font-size: 1.1rem;
  }
}

.nav-bar ::v-deep text::before {
  font-weight: 900;
  display: block;
}

header.search-show .search-container input {
  max-width: 10rem;
}
header ul {
  list-style-type: none;
  display: flex;
  /* opacity: 0.8; */
  /* background-color: #f4f4f4; */
}
header ul li {
  opacity: 1;
  margin: 0 0.2rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.1s ease-out;
  display: flex;
  align-items: center;
}
header ul li:first-child a::before {
  content: "";
  background: #a66df2;
  width: 0.2rem;
}
header ul li a {
  font-family: Roboto-Bold, system-ui, -apple-system, Arial, Helvetica Neue, Helvetica, Nimbus Sans L, Noto Sans, Liberation Sans, PingFang SC, Hiragino Sans GB, Noto Sans CJK SC, Source Han Sans SC, Source Han Sans CN, Microsoft YaHei, Wenquanyi Micro Hei, WenQuanYi Zen Hei, ST Heiti, SimHei, WenQuanYi Zen Hei Sharp, sans-serif;
  text-decoration: none;
  color: rgb(79, 79, 79);
  font-weight: bold;
  font-size: 1.1rem;
  white-space: nowrap;
}
header ul li:hover {
  background-color: rgba(0, 0, 0, 0.0588235294);
  transition: background-color 0.1s ease-out;
}
header .icon {
  margin-right: 0.5rem;
}
header .search::before {
  content: "\e655";
  font-size: 1.5rem;
}
header .dark-light-switch {
  transform: translateY(0.2rem);
}
header .dark-light-switch::before {
  content: "\e65e";
  font-size: 1.7rem;
}

</style>