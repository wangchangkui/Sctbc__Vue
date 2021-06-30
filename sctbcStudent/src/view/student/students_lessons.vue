<template>
  <aside class="right-side">
    <!--课程信息-->
    <section class="content-header" id="#curriculum-all-header">
      <h1>
        课程信息
        <small>所有课程数据信息</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/index"
            ><i class="fa fa-dashboard"></i> 主页</router-link
          >
        </li>
        <li class="active">课程</li>
        <li class="active">课程信息</li>
      </ol>
    </section>
    <!-- 	1 用axios请求接口，获取所有的班级
			2 判断请求数据是否异常
			3 若异常调到异常界面：未查到数据提示检查是否有教导这个班级
			4 若正常将数据分发到显示的这个组件中
			5 每个数据跳转页面可以传自身的值进行查询 -->
    <section class="content" id="curriculum-all-content">
      <div class="row">
        <div v-for="(lesson, index) in lessonList" :key="index">
          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-3">
            <router-link
              :to="{ name: 'student_study_info', params: { lessonId: lesson.id } }"
            >
              <div class="thumbnail">
                <img src="../../assets/img/custom/class.jpg" />
                <div class="caption">
                  <h3>{{ lesson.currName }}</h3>
                  <label>授课教师：{{lesson.teacherName}}</label>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </aside>
</template>

<script>
export default {
  name: "student_lessons_list",
  data() {
    return {
      lessonList: "",
    };
  },
  mounted() {
    this.getStu_lessons();
  },
  methods: {
    //用来查询所有课程
    getStu_lessons: function () {
      console.log(sessionStorage.getItem("userid"))
      console.log(sessionStorage.getItem("token"))
        var params  = new URLSearchParams();
        params.append("id",sessionStorage.getItem("userid"));
        params.append("token",sessionStorage.getItem("token"));
      this.axios({
        method: "post",
        url:
          "http://iwck.top:8081/stucurriculum/findCurri",
          data:params,
        //headers:{ "Content-Type": "application/x-www-form-urlencoded"}
      }).then((data) => {
        console.log(data)
        // this.deleleObject(data.data.data)
        this.lessonList = data.data.data;
      });
    },
  },
};
</script>

<style>
</style>