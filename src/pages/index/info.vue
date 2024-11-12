<template>
    <view  v-if="isLoaded">
    <view class="nav-bar">
        <uni-icons type="arrow-left" size="25" @click="back"></uni-icons>
        <text class="pack_title">清单:长期规划</text>
        <uni-icons type="bottom" size="15" color="#999"></uni-icons>
    </view>
    <view class="content">
        <view class="article_title">
            <text>{{ data.data.title }}</text>
            <todoComplete v-if="data.type == '待办事项'" class="todoComplete" :isComplete="data.data.isComplete"></todoComplete>
            <!-- <view v-if="data.type == '记账'" class="">
                <amount :amount="data.amount"></amount>
            </view> -->
        </view>
        <view v-if="data.type == '记账'" class="pay">
            <view>
            <view class="pay-item">花费项：{{ data.data.item }}</view>
            <view class="pay-wallet">钱包：{{ data.data.wallet }}</view>
            <view class="pay-type">类别：{{ data.data.item_type }}</view>
            </view>
            <amount :amount="data.data.amount" type="card" class="amount"></amount>
        </view>
        <textarea v-model="data.data.content"/>
    </view>
    </view>
</template>

<script>
import todoComplete from '@/components/todoComplete.vue';
import amount from '@/components/amount'
import { server,setItem } from '../../js/server';
if(getCurrentPages().length < 1){
    uni.switchTab({
        url: 'pages/index/data'
    })
}
function getOut(data){
  setItem(data.id,data.data)
  console.log("ok?",data.data)
}
export default {
    data() {
        return {
            data: {},
            isLoaded: false
        }
    },
    methods: {
        back() {
            uni.navigateBack({
                delta: 1
            })
        },
        complete() {
            alert("complete list")
        }
    },
    onHide(){
      getOut(this.data)
    }
    ,
    onUnload(){
      getOut(this.data)
    }
    ,
    onLoad() {
        let event = this.getOpenerEventChannel()
        event.on('acceptDataFromOpenerPage', (get) => {
            // console.log(get)
            this.data = get.data
            this.isLoaded = true
        })
    },
    components: {
        todoComplete,
        amount
    }
}
</script>

<style scoped lang="scss">
.pay{
    padding: 1rem;
    margin: 0 0 1rem 0;
    background: white;
    border-radius: 1rem;
    font-weight: bold;
    font-size: .9rem;
    display: flex;
    overflow: hidden;
    .amount{
        align-self: end;
        margin-bottom:-.5rem;
        margin-right: -.3rem;
    }
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
        .todoComplete{
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

.ticktack-single {
  flex: 6;
  width: 0;
}
.ticktack-single > article {
  border-radius: 1rem;
  box-shadow: 0.2rem 0.2rem 1rem rgba(128, 128, 128, 0.05);
  transition: box-shadow 0.3s;
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  padding: 2rem;
}
.ticktack-single > article:hover {
  box-shadow: 0.2rem 0.2rem 2rem rgba(128, 128, 128, 0.1);
  transition: box-shadow 0.5s;
}
.ticktack-single > article > .info {
  display: flex;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 0.1rem solid rgba(128, 128, 128, 0.199);
}
.ticktack-single > article > .info > div {
  flex: 6;
}
.ticktack-single > article > .info > div > h1 {
  font-size: 2rem;
}
.ticktack-single > article > .info > div p {
  opacity: 0.6;
  margin: 0.4rem 0;
  z-index: -1;
}
.ticktack-single > article > .info > div p .item {
  margin-left: 0.5rem;
}
.ticktack-single > article > .info > div p a {
  color: rgb(79, 79, 79);
}
.ticktack-single > article > .info:hover .art-cats a {
  color: #7f2ad4;
}
.ticktack-single > article > .info:hover .art-tags a {
  color: #2a93d4;
}
.ticktack-single > article > .info > img {
  object-fit: cover;
  border-radius: 1rem;
  transition: box-shadow 0.5s cubic-bezier(0.73, -0.02, 0.27, 1.04);
  transition: transform 0.3s cubic-bezier(0.73, -0.02, 0.27, 1.04);
  border-radius: 1rem;
  width: 30%;
  max-height: 30vh;
}
.ticktack-single > article > .info > img:hover {
  transition: box-shadow 0.3s cubic-bezier(0.73, -0.02, 0.27, 1.04);
  box-shadow: 0 0 1rem rgba(128, 128, 128, 0.411);
}
.ticktack-single > article > .info > img:hover {
  transform: rotate(0.007turn) scale(1.2);
  transition: transform 0.3s cubic-bezier(0.73, -0.02, 0.27, 1.04);
}
.ticktack-single > article > .main-body {
  line-height: 1.8;
  text-align: left;
  font-size: 1.07rem;
}
.ticktack-single > article > .main-body img {
  margin: 1rem 0;
  border-radius: 1rem !important;
  border: 0.1rem solid rgba(128, 128, 128, 0);
}
.ticktack-single > article > .main-body figcaption {
  font-size: 0.8rem;
  font-weight: 400;
  color: rgba(79, 79, 79, 0.8);
  margin-top: -1rem;
  text-align: center;
}
.ticktack-single > article > .main-body h2 {
  margin: 0.8rem 0;
}
.ticktack-single > article > .main-body h2::before {
  content: "#";
  color: white;
  padding: 0.1rem 0.4rem;
  margin-right: 0.5rem;
  background: #a66df2;
  border-radius: 0.5rem;
}
.ticktack-single > article > .main-body h3 {
  margin: 0.5rem 0;
}
.ticktack-single > article > .main-body h3::before {
  content: "##";
  color: white;
  padding: 0.1rem 0.4rem;
  margin-right: 0.5rem;
  background: #a66df2;
  border-radius: 0.5rem;
}
.ticktack-single > article > .main-body ul {
  margin: 0.5rem 0;
  list-style-type: none;
  border-left: 0.3rem dashed #a66df2;
  padding-left: 1rem;
}
.ticktack-single > article > .main-body .wp-block-quote {
  background: rgba(127, 42, 212, 0.0823529412);
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column-reverse;
  margin: 1rem 0;
}
.ticktack-single > article > .main-body .wp-block-quote p {
  align-self: flex-end;
  color: #4f0a9d;
}
.ticktack-single > article > .main-body .wp-block-quote p::before {
  content: "--";
  margin-right: 0.5rem;
}
.ticktack-single > article > .main-body .wp-block-quote p:empty {
  display: none;
}
.ticktack-single > article > .main-body .wp-block-quote p:empty + cite::before {
  content: "TIPS";
  color: white;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.1rem 0.4rem;
  margin-right: 0.5rem;
  background: #a66df2;
  border-radius: 0.5rem;
  border: 0.1rem solid #a66df2;
  color: #a66df2;
  background: none;
}
.ticktack-single > article > .main-body .wp-block-quote cite {
  font-weight: 400;
  color: rgba(79, 79, 79, 0.8);
  text-align: left;
  font-style: normal;
}
.ticktack-single > article > .main-body .wp-block-quote cite::before {
  content: "“";
  color: #a66df2;
  font-size: 2rem;
  margin-right: 0.5rem;
}
.ticktack-single > article > .main-body .wp-block-code {
  background: #242424;
  padding: 1rem;
  border-radius: 1rem;
  margin: 1rem 0;
  font-size: 1rem;
  color: white;
  overflow: auto;
}
.ticktack-single > article > .main-body .wp-block-code code {
  color: white;
}

.directory-header #directory-title {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
}

.directory {
  margin-top: 1rem;
}
</style>