<template>
  <view>
    <!-- 商品卡片 -->
    <van-card :thumb-link='`/subpackage/detail/detail?id=${item.goods_id}`' v-for="item in goodList"
      :key="item.goods_id" :price="item.goods_price | disPrice" :title="item.goods_name"
      :thumb="item.goods_small_logo || defaultImg" />
  </view>
</template>

<script>
  import {
    getGoodListAPI
  } from "@/api/goods.js"
  import message from "@/utils/message.js"
  export default {
    data() {
      return {
        queryData: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodList: [],
        total: 0,
        defaultImg: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        isloading: false
      };
    },
    methods: {
      async getGoodList(cb) {
        this.isloading = true
        const res = await getGoodListAPI(this.queryData)
        // console.log(res);
        this.goodList = [...res.message.goods, ...this.goodList]
        this.total = res.message.total
        this.isloading = false
        cb && cb()
      },
      stopPullDown() {
        uni.stopPullDownRefresh()
      }
    },
    onLoad({
      query
    }) {
      this.queryData.query = query
      this.getGoodList()
    },
    onPullDownRefresh() {
      this.queryData = {
        query: this.queryData.query,
        cid: '',
        pagenum: 1,
        pagesize: 10
      }
      this.goodList = [],
        this.total = 0
      this.getGoodList(this.stopPullDown)
    },
    // 触底事件
    onReachBottom() {
      if (this.queryData.pagenum * this.queryData.pagesize >= this.total) return message('没有更多数据了')
      if (this.isloading) return
      this.queryData.pagenum++
      this.getGoodList()
    }
  }
</script>

<style lang="scss">

</style>
