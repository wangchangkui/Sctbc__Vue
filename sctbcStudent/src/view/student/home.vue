<template>
  <aside class="right-side">
    <!--首页-->
    <section class="content-header" id="index-header">
      <h1>
        随机一门课程的数据
        <small>程序设计</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/index"
            ><i class="fa fa-dashboard"></i> 主页</router-link
          >
        </li>
        <li class="active">首页</li>
      </ol>
    </section>
    <!-- 传入一个随机课程id，暂时固定 -->
    <info :lessonid="currid"></info>
  </aside>
</template>

<script>
import info from "../../components/all_Info";
export default {
  mounted() {
    this.getStu_lessons();
  },
  name: "home",
  data() {
    return {
      currid: "201589470",
    };
  },
  components: {
    info,
  },
  methods: {
    getStu_lessons: function () {
      var params = new URLSearchParams();
      params.append("id", sessionStorage.getItem("userid"));
      params.append("token", sessionStorage.getItem("token"));
      this.axios({
        method: "post",
        url: "http://iwck.top:8081/stucurriculum/findCurri",
        data: params,
        //headers:{ "Content-Type": "application/x-www-form-urlencoded"}
      }).then((data) => {
        // this.deleleObject(data.data.data)
        this.currid= data.data.data[0].id;
      });
    },
  },
};
</script>

<style scoped>
</style>
