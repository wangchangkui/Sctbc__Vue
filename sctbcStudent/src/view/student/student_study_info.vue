<template>
  <aside class="right-side">
    <!--班级详细数据-->
    <section class="content-header" id="#class-detail-header">
      <h1>
        班级详细数据
        <small>班级详细数据信息</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/index"
            ><i class="fa fa-dashboard"></i> 主页</router-link
          >
        </li>
        <li class="active">班级</li>
        <li class="active">班级信息</li>
        <!-- 待更改 -->
      </ol>
    </section>

    <!-- 用来放学生该课程信息 -->
    <info :lessonid="$route.params.lessonId"></info>
  </aside>
</template>

<script>
import info from "../../components/all_Info";
export default {
  components: {
    info,
  },
  name: "student_study_info",
  mounted() {
    this.lessonId=this.created();
  },
  data() {
    //先获得班级id
    //然后通过班级id教师id和token去获取到课程数据
    return {
      lessonId: "",
      classid: "",
      // curriculinm: this.getCurriculinm(),
    };
  },
  methods: {
    created: function () {
      return this.$route.params.lessonId;
    },
    alert: function () {
      // console.log(this.curriculinm);
    },
  },
};
</script>

<style>
</style>