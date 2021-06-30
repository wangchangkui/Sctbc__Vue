<template>
<aside class="right-side">
<section>
  <div class="box">
    <div class="box-header">
      <h3 class="box-title">
        学生具体的学习情况
        <button class="btn btn-default" @click="showData()">测试</button>
      </h3>
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
            <!-- taskpoint平均值 -->
            <td>任务完成进度</td>
            <td>
              <div class="progress xs">
                <div
                  class="progress-bar progress-bar-danger"
                  :style="'width: '+taskpoint"
                ></div>
              </div>
            </td>
            <td><span class="badge bg-red">{{taskpoint}}</span></td>
          </tr>
          <tr>
            <td>02.</td>
            <!-- videopoint平均值 -->
            <td>视频完成进度</td>
            <td>
              <div class="progress xs">
                <div
                  class="progress-bar progress-bar-yellow"
                  :style="'width: '+videopoint"
                ></div>
              </div>
            </td>
            <td><span class="badge bg-yellow">{{videopoint}}</span></td>
          </tr>
          <tr>
            <td>03.</td>
            <td>作业完成进度</td>
            <td>
              <!-- homeworkpoint平均值 -->
              <div class="progress xs">
                <div
                  class="progress-bar progress-bar-success"
                  :style="'width: '+homeworkpoint"
                ></div>
              </div>
            </td>
            <td><span class="badge bg-green">{{homeworkpoint}}</span></td>
          </tr>
          <tr>
            <td>04.</td>
            <td>签到次数</td>
            <td>
              <!-- signpoint平均值 -->
              <div class="progress xs">
                <div
                  class="progress-bar progress-bar-success"
                  :style="'width: '+signpoint"
                ></div>
              </div>
            </td>
            <td><span class="badge bg-green">{{signpoint}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- /.box-body -->
  </div>
</section>
<!-- 表格组件 -->
  <situation v-bind:studentID="studentId"></situation>
<!-- 邮件组件 -->
<!-- <section>
  <Email v-bind:studentID="studentId"></Email>
</section> -->
</aside>
</template>

<script>
import situation from "../../components/self_study_attitude";
export default {
  name: "student_self_info",
  components:{
    situation,
  },
  mounted() {
    this.getAlltData()
  },
  beforeUpdate(){

  },
   data() {
    //签到的百分比，作业的百分比，任务点完成百分比，视频观看的百分比
    return {
      studentId:"",
        inf:"",
     signpoint:0,
       homeworkpoint:0,
       taskpoint:0,
       videopoint:0,
    };
   
  },
  methods: {
       changepoint:function(){
        var  data=this.inf;
        this.signpoint=parseInt(parseFloat(data.sign_point)*100)+"%";
        this.homeworkpoint =parseInt(parseFloat(data.hoemwork_point)*100)+"%"
        this.taskpoint=parseInt(parseFloat(data.task_point)*100)+"%";
        this.videopoint=parseInt(parseFloat(data.videos_point)*100)+"%";  
       },
       
  getAlltData: function () {
    //
    this.studentId=this.$route.params.studentId;
    this.axios({
      methods: "get",
      url: "http://iwck.top:8081/learn/allDate",
    }).then((data) => {
        for(let i=0;i<=data.data.data.length;i++){
     if(this.$route.params.studentId==data.data.data[i].stu_id)
        {
            this.inf=data.data.data[i]
            this.changepoint();
            break;
        }
        }
    });
  },

  },
  
};
</script>

<style>
</style>