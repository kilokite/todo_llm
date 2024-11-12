<template>
  <view class="content">
    <text class="title">总览</text>
    <view class="tools">
      <!-- 小工具栏围 -->
    </view>
    <view class="overview" v-for="theData in common.data.index">
      <infoCard :data="theData"></infoCard>
    </view>
  </view>
</template>

<script>
import common from '@/common'
import infoCard from '@/components/infoCard.vue'
export default {
  data() {
    return {
      title: 'Hellop',
      common
    }
  },
  methods:{
  },
  onLoad() {},
  components:{
    infoCard
  }
} 
</script>

<style type="scss">

.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  display: none;
  transition: opacity 0.3s ease-out;
}
.mask.show {
  display: block;
}

/* ## main */
.art-list {
  flex: 6;
}
.art-list > ul {
  list-style-type: none;
}
.art-list a {
  text-decoration: none;
  color: rgb(79, 79, 79);
  /* 链接颜色 TODO 应该是变量*/
}
.art-list li {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;
  transition: box-shadow 0.3s ease-out;
  display: flex;
  /* text-decoration: none; */
  color: rgb(79, 79, 79);
  /* 文章列表文字颜色 */
}
.art-list li:hover {
  box-shadow: 0.2rem 0.2rem 2rem rgba(128, 128, 128, 0.199);
  transition: box-shadow 0.5s ease-out;
}
.art-list li .art-card {
  flex: 7;
  align-items: center;
  flex-direction: column;
  font-weight: 400;
}
.art-list li .art-card h2 {
  margin: 0.4rem 0;
  font-size: 2rem;
  font-weight: bold;
}
.art-list li .art-card .art-info {
  /* 时间类型标签 */
  opacity: 0.6;
  margin: 0.4rem 0;
  z-index: -1;
  /* background-color: red; */
}
.art-list li .art-card .art-excerpt {
  /* 缩略？ */
  margin: 1rem 0 1.5rem 0;
  line-height: 1.6;
}
.art-list li .art-card .art-excerpt .art-ellipsis {
  /* 省略号渐变 */
  background: rgb(0, 0, 0);
  background: linear-gradient(90deg, rgb(0, 0, 0) 0%, rgba(0, 131, 255, 0) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  /* font-size: 1.2rem; */
}
.art-list li .art-img {
  display: flex;
  flex-direction: column;
  flex: 3;
  overflow: hidden;
  border-radius: 1rem;
  margin: 0 0 0 1rem;
  transition: transform 0.3s cubic-bezier(0.73, -0.02, 0.27, 1.04), box-shadow 0.3s cubic-bezier(0.73, -0.02, 0.27, 1.04);
}
.art-list li .art-img:hover {
  transform: rotate(0.007turn) scale(1.2);
  transition: transform 0.3s cubic-bezier(0.73, -0.02, 0.27, 1.04), box-shadow 0.3s cubic-bezier(0.73, -0.02, 0.27, 1.04);
  box-shadow: 0 0 1rem rgba(128, 128, 128, 0.411);
}
.art-list li .art-img img {
  width: 100%;
  height: 0;
  flex-grow: 1;
  object-fit: cover;
}

/* ## tag & category */
.art-tags > a,
.art-cats > a {
  /* color: #2a93d4; */
  /* font-size: 1.1rem; */
  transition: color 0.3s;
}

.art-cats > a::before {
  display: inline-block;
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  align-self: center;
  /* ^ 画圈圈 😇 */
  font-size: 0.5rem;
  border: solid 0.13rem;
  border-radius: 1rem;
  margin: 0 0.2rem;
}

.art-tags > a::before {
  content: "#";
  font-weight: bold;
  margin: 0 0.2rem;
}

.art-list li:hover .art-tags > a {
  color: #2a93d4;
}

.art-list li:hover .art-cats > a {
  color: #7f2ad4;
}

.art-tags > a:hover {
  text-decoration: solid;
}

/* ## sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  flex: 2.5;
  flex-basis: auto;
  margin: 2rem 0 2rem 2rem;
  width: 0;
}
.sidebar .vio-card {
  padding: 2rem;
  margin-bottom: 1rem;
}
.sidebar > div {
  position: sticky;
  top: 1rem;
}

.bar-myself {
  padding: 2rem;
}
.bar-myself > .info {
  display: flex;
  align-items: center;
}
.bar-myself > .info > img {
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  margin-right: 1rem;
}
.bar-myself > .info > div > h2 {
  font-weight: bold;
}
.bar-myself > .info > div > p {
  color: rgba(79, 79, 79, 0.8);
}
.bar-myself > .badge {
  margin-top: 1rem;
  white-space: nowrap;
  overflow: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.bar-myself > .badge::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.bar-myself > .badge > img {
  border-radius: 0.3rem;
  height: 2rem;
  margin-right: 0.5rem;
  transition: transform 0.5s cubic-bezier(0, 0, 0, 1);
}
</style>
