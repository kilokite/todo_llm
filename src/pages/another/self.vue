<template>
  <view class="container">
    <view class="avatar"></view>
    <view class="username">{{ username }}</view>
    <view class="bio">{{ bio }}</view>
    <view class="stats">
      <view class="stat">
        <view class="number">{{ followers }}</view>
        <view class="label">Followers</view>
      </view>
      <view class="stat">
        <view class="number">{{ following }}</view>
        <view class="label">Following</view>
      </view>
      <view class="stat">
        <view class="number">{{ posts }}</view>
        <view class="label">Posts</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: "GitHub Copilot",
      bio: "I am an AI programming assistant.",
      followers: 1000,
      following: 500,
      posts: 200
    };
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ccc;
  margin-bottom: 20px;
}

.username {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.bio {
  font-size: 16px;
  margin-bottom: 20px;
}

.stats {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.number {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
}

.label {
  font-size: 16px;
  color: #666;
}
</style>
