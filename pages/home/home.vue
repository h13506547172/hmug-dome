<template>
  <view>
    <view class="topSearch">
      <view class="search_btn">
        搜索
      </view>
    </view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in bannerData" :key="i">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image @click="goDetail(item.goods_id)" :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in NavsList" :key="i">
        <image @click="clickNavFn(item.name)" :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in Floordata" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box">
            <image class="left-img" :src="item.product_list[0].image_src"
              :style="{'width':item.product_list[0].image_width + 'rpx'}"></image>
          </view>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2,index2) in item.product_list" v-if="index2 !== 0">
              <image :src="item2.image_src" :style="{'width':item2.image_width + 'rpx'}" class="image"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getXXXAPI,
    getNavsAPI,
    getFloordataAPI
  } from "@/api/home.js"
  export default {
    data() {
      return {
        bannerData: [],
        NavsList: [],
        Floordata: []
      };
    },
    onLoad() {
      this.getXXX()
      this.getNavs()
      this.getFloordata()
    },
    methods: {
      // 获取轮播图
      async getXXX() {
        const res = await getXXXAPI()
        // console.log(res)
        this.bannerData = res.message
      },
      // 获取导航区域
      async getNavs() {
        const res = await getNavsAPI()
        // console.log(res)
        this.NavsList = res.message
      },
      // 去详细页
      goDetail(id) {
        uni.navigateTo({
          url: '/subpackage/detail/detail?id=' + id
        })
      },
      // 点击分类导航
      clickNavFn(name) {
        if (name === '分类') {
          // console.log(1111);
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取楼层图片数据
      async getFloordata() {
        const res = await getFloordataAPI()
        // console.log(res);
        this.Floordata = res.message
      }
    }
  }
</script>

<style lang="scss">
  .topSearch {
    width: 750rpx;
    height: 70px;
    background-color: #c00000;
    display: flex;
    justify-content: center;
    overflow: hidden;

    .search_btn {
      width: 400rpx;
      height: 30px;
      margin-top: 30px;
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      cursor: pointer;
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .image {
      height: 190rpx;
    }
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .left-img {
      height: 392rpx !important;
    }
  }
</style>
