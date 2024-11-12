<template>
  <view class="nav-bar">
    <uni-icons type="arrow-left" size="25" @click="back"></uni-icons>
    <text class="pack_title">设置</text>
  </view>

  <view class="content">
    <view class="settings-page">
      <view class="setting-item">
        <uni-icons type="smallcircle" size="30"></uni-icons>
        <text>选择主题颜色</text>
        <picker mode="selector" :range="colors" @change="onColorChange">
          <view>{{ selectedColor }}</view>
        </picker>
      </view>

      <view class="setting-item">
        <uni-icons type="eye-filled" size="30"></uni-icons>
        <text>首页显示的类目</text>
        <checkbox-group @change="onCategoryChange">
          <label v-for="(item, index) in categories" :key="index">
            <checkbox :value="item.value"/>
            <text>{{ item.text }}</text>
          </label>
        </checkbox-group>
      </view>

      <view class="setting-item">
        <uni-icons type="star-filled" size="30"></uni-icons>
        <text>当前计划</text>
        <picker mode="selector" :range="upgradePlans" @change="onUpgradePlanChange">
          <view>{{ selectedUpgradePlan }}</view>
        </picker>
      </view>

      <button @click="saveSettings">保存设置</button>
    </view>
  </view>
</template>

<script setup>
  import { ref } from 'vue';

  const colors = ['蓝色', '红色', '绿色', '紫色', '粉色'];
  const selectedColor = ref(colors[0]); // 默认选中的颜色

  const categories = [
    { value: 'personal', text: '个人' },
    { value: 'work', text: '工作' },
    { value: 'study', text: '学习' },
    { value: 'other', text: '其它' },
  ];
  const selectedCategories = ref([]);

  const upgradePlans = ['基础版', '高级版', '专业版'];
  const selectedUpgradePlan = ref(upgradePlans[0]);

  const onColorChange = (event) => {
    const { value } = event.detail;
    selectedColor.value = colors[value];
  };

  const onCategoryChange = (event) => {
    const { value } = event.detail;
    selectedCategories.value = value;
  };

  const onUpgradePlanChange = (event) => {
    const { value } = event.detail;
    selectedUpgradePlan.value = upgradePlans[value];
  };

  const saveSettings = () => {
    // 这里编写保存设置的逻辑，可能是存储到本地或者发送到服务器
    console.log('保存了设置：', {
      selectedColor: selectedColor.value,
      selectedCategories: selectedCategories.value,
      selectedUpgradePlan: selectedUpgradePlan.value,
    });
  };
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

  .setting-item>text {
    font-size: 1rem;
    font-weight: bold;
    margin: 1rem 0;
  }

  .setting-item {
    margin: 1rem 0;
  }
</style>
