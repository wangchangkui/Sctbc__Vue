<template>
  <div class="box">
    <div class="box-header">
      <h3 class="box-title">班级学习情况表</h3>
    </div>
    <!-- /.box-header -->
    <div class="box-body no-padding">
      <table class="table table-condensed table-hover">
        <thead>
          <tr>
            <th style="width: 100px">序号</th>
            <th>学习数据</th>
            <th>任务完成进度</th>
            <th style="width: 40px"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01.</td>
            <td>任务完成进度</td>
            <td>
              <div class="progress xs">
                <div class="progress-bar progress-bar-danger" :style="'width: 55%'"></div>
              </div>
            </td>
            <td><span class="badge bg-red">55%</span></td>
          </tr>
          <tr>
            <td>02.</td>
            <td>视频完成进度</td>
            <td>
              <div class="progress xs">
                <div class="progress-bar progress-bar-yellow" :style="'width: 70%'"></div>
              </div>
            </td>
            <td><span class="badge bg-yellow">70%</span></td>
          </tr>
          <tr>
            <td>03.</td>
            <td>章节测试完成进度</td>
            <td>
              <div class="progress xs">
                <div class="progress-bar progress-bar-primary" :style="'width: 40%'"></div>
              </div>
            </td>
            <td><span class="badge bg-light-blue">40%</span></td>
          </tr>
          <tr>
            <td>04.</td>
            <td>作业完成进度</td>
            <td>
              <div class="progress xs">
                <div class="progress-bar progress-bar-success" :style="'width: 90%'"></div>
              </div>
            </td>
            <td><span class="badge bg-green">90%</span></td>
          </tr>
          <tr>
            <td>05.</td>
            <td>签到次数</td>
            <td>
              <div class="progress xs">
                <div class="progress-bar progress-bar-success" :style="'width: 90%'"></div>
              </div>
            </td>
            <td><span class="badge bg-green">90%</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- /.box-body -->
  </div>
</template>

<script>
  export default{
    name:"class_info_compent",
    // 组件传值
    props:{
      curricul:String,
    },
    data(){
      return {
        
      }
    },
    methods:{
      showData:function(){
        alert(this.curricul);
      }
    }
  }
</script>

<style>
</style>
