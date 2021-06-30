<template>
  <div class="skin-blue">
    <header class="header">
      <nav
        class="navbar navbar-static-top"
        role="navigation"
        style="margin-bottom: 0px"
      >
        <router-link
          to="/index"
          class="logos"
          style="
            color: #ffffff;
            float: left;
            font-size: 20px;
            line-height: 50px;
            text-align: center;
            padding: 0 10px;
            width: 220px;
            font-family: 'Kaushan Script', cursive;
            font-weight: 500;
            height: 56px;
            display: block;
          "
        >
          Sctbc
        </router-link>
        <button
          href="#"
          class=""
          data-toggle="offcanvas"
          role="button"
          style="
            float: left;
            padding: 9px 5px;
            margin-top: 8px;
            margin-right: 0px;
            margin-bottom: 8px;
            margin-left: 5px;
            background-color: transparent;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 0 !important;
          "
        >
          <span class="glyphicon glyphicon-align-justify"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <div class="navbar-right">
          <ul class="nav navbar-nav">
            <li class="dropdown user user-menu">
              <a class="dropdown-toggle" data-toggle="dropdown">
                <i class="glyphicon glyphicon-user"></i>
                <span> {{ username }}<i class="caret"></i></span>
              </a>
              <ul class="dropdown-menu">
                <!-- User image -->
                <li class="user-header bg-light-blue">
                  <img
                    src="../assets/img/avatar3.png"
                    class="img-circle"
                    alt="User Image"
                  />
                  <p>
                    {{ username }}
                    <small>2021-5-8</small>
                  </p>
                </li>
                <!-- Menu Footer-->
                <li class="user-footer">
                  <div class="pull-left">
                    <router-link class="btn btn-default btn-flat" to="/student_info"
                      >个人信息</router-link
                    >
                  </div>
                  <div class="pull-right">
                    <a href="#" @click="exit()" class="btn btn-default btn-flat"
                      >退出登录</a
                    >
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <div class="wrapper row-offcanvas row-offcanvas-left">
      <!--
        	作者：offline
        	时间：2021-05-08
        	描述：侧边栏
        -->
      <aside class="left-side sidebar-offcanvas">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
          <!-- Sidebar user panel -->
          <div class="user-panel">
            <div class="pull-left info">
              <br />
              <p>欢迎您, {{ username }}  同学</p>
            </div>
          </div>
          <ul class="sidebar-menu">
            <li class="active">
              <router-link to="/index">
                <i class="fa fa-dashboard"></i> <span>首页</span>
              </router-link>
            </li>
            <li class="active">
              <router-link to="/lessonList">
                <i class="fa fa-bar-chart-o"></i> <span>课程信息</span>
              </router-link>
            </li>
            <li class="treeview">
              <a href="#">
                <i class="fa fa-laptop"></i>
                <span>个人信息</span>
                <i class="fa fa-angle-left pull-right"></i>
              </a>
              <ul class="treeview-menu">
                <li>
                  <router-link to="student_info">
                    <i class="fa fa-angle-double-right"></i
                    >查看个人信息</router-link
                  >
                </li>
                <li>
                  <router-link to="student_account_info"
                    ><i class="fa fa-angle-double-right"></i
                    >查看账号信息</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="treeview">
              <a href="#">
                <i class="fa fa-edit"></i> <span>留言</span>
                <i class="fa fa-angle-left pull-right"></i>
              </a>
              <ul class="treeview-menu">
                <li>
                  <router-link to="/lam">
                    <i class="fa fa-angle-double-right"></i>
                    收到的留言</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </aside>

      <!--
        	作者：offline
        	时间：2021-05-08
        	描述：主要内容区域
        -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      //获取用户的id
      userid: this.getuserid(),
      //获取用户的名称
      username: sessionStorage.getItem("name"),
    };
  },
  methods: {
    getuserid: function () {
      return sessionStorage.getItem("userid");
    },
    // getusername: function () {
    //   this.axios({
    //     method: "get",
    //     url:
    //       "http://iwck.top:8081/teacher/selectTeacherByid?id=" +
    //       sessionStorage.getItem("userid") +
    //       "&token=" +
    //       sessionStorage.getItem("token"),
    //   }).then((data) => {
    //     this.usernamedata = data.data.data.name;
    //     return data.data.data.name;
    //   });
    // },
    exit: function () {
      this.axios({
        method: "get",
        url:
          "http://iwck.top:8081/studentlogin/ExitToken?token=" +
          sessionStorage.getItem("token"),
      }).then((data) => {
        sessionStorage.clear();
        alert("为您跳转到登录界面")
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style>
aside {
  height: 100%;
}
</style>
