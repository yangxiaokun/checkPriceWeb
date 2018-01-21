<template>
  <el-container>
    <el-header style="text-align: center">价格监测</el-header>
    <el-main>
      <div style="text-align: right">
        <!--<el-button plain @click="addCheck">添加</el-button>-->
        <el-button type="primary" plain @click.stop="refreshPrice">立即更新</el-button>
      </div>
      <el-row style="text-align: center;margin-bottom: 20px">
          <el-col :span="4">标题</el-col>
          <el-col :span="4">最新价格</el-col>
          <el-col :span="6">最后更新时间</el-col>
          <el-col :span="6">
            操作
          </el-col>
      </el-row>
      <el-row class="tableRow" v-for="(price,index) in msg" :key="index" style="text-align: center">
          <el-col :span="4">{{price.title}}</el-col>
          <el-col :span="4">{{price.value}}</el-col>
          <el-col :span="6">{{price.lastUpdateTime}}</el-col>
          <el-col :span="6">
            <!--<el-button>显示走势图</el-button>-->
            <el-button plain size="small" v-if="price.check === true" @click.stop="stopCheck(price)">停用</el-button>
            <el-button plain size="small" v-if="price.check === false" @click.stop="restartCheck(price)">启用</el-button>
          </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    refreshPrice () {
      this.$fetchGet('/price/refreshPrice', {}).then((res) => {
        if (res.success) {
          this.msg = res.data
        }
      })
    },
    stopCheck (price) {
      this.$fetchGet('/price/stopCheck', {_id: price._id}).then(res => {
        if (res.success){
          this.$message.success(
            '停用成功'
          )
          price.check = false
        }
      })
    },
    restartCheck (price) {
      this.$fetchGet('/price/restartCheck', {_id: price._id}).then(res => {
        if (res.success){
          this.$message.success(
            '启用成功'
          )
          price.check = true
        }
      })
    }
  },
  mounted () {
    this.$fetchGet('/price/queryAllPrice', {})
      .then((res) => {
        this.msg = res.data
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .tableRow{
    margin: 5px 0;
  }
</style>
