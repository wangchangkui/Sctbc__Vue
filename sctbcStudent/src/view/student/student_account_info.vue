<template>
  <aside class="right-side">
    <!--修改个人信息-->
    <section class="content-header" id="teacher-edit-header">
      <h1>
        查看账号信息
        <small>修改账号数据信息</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#"><i class="fa fa-dashboard"></i> 主页</a>
        </li>
        <li class="active">个人信息</li>
        <li class="active">查看账号信息</li>
      </ol>
    </section>
    <section class="content" id="teacher-edit-content">
      <div class="row">
        <div
          class="
            col-xs-10
            col-xs-push-1
            col-sm-10
            col-sm-push-1
            col-md-10
            col-md-push-1
            col-lg-10
            col-lg-push-1
          "
        >
          <form role="form" @submit.prevent="upload">
            <div class="box-body">
              <div class="row">
                <div class="form-group col-xs-7 col-md-4 col-sm-6 col-lg-4">
                  <label>学号（账号）</label>
                  <fieldset disabled>
                    <input type="text" class="form-control" v-model="userid" />
                  </fieldset>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-xs-7 col-md-4 col-sm-6 col-lg-4">
                  <label>密码</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-xs-7 col-md-4 col-sm-6 col-lg-4">
                  <label>确认密码</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="passwordR"
                  />
                  <label v-if="checkPassword()" style="color=red"
                    >两次密码不一致</label
                  >
                </div>
              </div>
              <div class="row">
                <div class="form-group col-xs-7 col-md-4 col-sm-6 col-lg-4">
                  <label>上传头像</label>
                  <input type="file" id="exampleInputFile" />
                </div>
              </div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
              <button type="submit" class="btn btn-primary">确认修改</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </aside>
</template>

<script>
export default {
  name: "student_account_info",
  data() {
    return {
      userid: sessionStorage.getItem("userid"),
      password: null,
      passwordR: null,
    };
  },
  methods: {
    checkPassword: function () {
      if (this.password === this.passwordR) {
        return false;
      }
      return true;
    },
  },
  upload: function () {
    if (this.checkPassword() == false) {
      this.uploadData();
    }
    return false;
  },
  //待补全，上传学生账号数据的接口
  uploadData: function () {
    let parmas = new URLSearchParams();
    parmas.append("token", sessionStorage.getItem("token"));
    parmas.append("password", this.password);
    this.axios({
      method: "post",
      //待接口写出来后修改
      url: "http://iwck.top:8081/teacher/updeteTeacher",
      data: parmas,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).then((data) => {
      console.log(data.data);
      return false;
    });
  },
};
</script>

<style>
</style>