<template>
  <aside class="right-side">
    <!--修改个人信息-->
    <section class="content-header" id="teacher-edit-header">
      <h1>
        查看个人信息
        <small>修改个人数据信息</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#"><i class="fa fa-dashboard"></i> 主页</a>
        </li>
        <li class="active">个人信息</li>
        <li class="active">查看个人信息</li>
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
          <form role="form">
            <div class="box-body">
              <div class="row">
                <div class="form-group col-xs-7 col-md-4 col-sm-6 col-lg-4">
                  <label>姓名</label>
                  <input type="text" class="form-control" v-model="name" />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-xs-7 col-md-4 col-sm-6 col-lg-4">
                  <label>性别</label>
                  <input type="radio" name="sex" value="0" v-model="sex" />男
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" name="sex" value="1" v-model="sex" />女
                </div>
              </div>
              <div class="row">
                <div class="form-group col-xs-7 col-md-4 col-sm-4 col-lg-4">
                  <label>专业班级</label>
                  <!-- <input type="text" class="form-control" value="软件19332" placeholder="请输入手机号" /> -->
                  <select
                    class="form-control"
                    @change="getSpecialty()"
                    v-model.lazy="fac_id"
                  >
                    <!-- 待更改 -->
                    <option value="" selected="selected" disabled>
                      -请选择系别-
                    </option>
                    <option
                      v-for="(item1, index) in fac_inf"
                      :key="index"
                      :value="item1.id"
                    >
                      {{ item1.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group col-xs-7 col-md-4 col-sm-4 col-lg-4">
                  <label> &nbsp; </label>
                  <select
                    class="form-control"
                    @change="getlessons()"
                    v-model.lazy="all_id"
                  >
                    <!-- 待更改 -->
                    <option value="" selected="selected" disabled>
                      -请选择专业-
                    </option>
                    <option
                      v-for="(item2, index) in all_inf"
                      :key="index"
                      :value="item2.id"
                    >
                      {{ item2.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group col-xs-7 col-md-4 col-sm-4 col-lg-4">
                  <label> &nbsp; </label>
                  <select class="form-control" v-model.lazy="class_id">
                    <!-- 待更改 -->
                    <option value="" selected="selected" disabled>
                      -请选择班级-
                    </option>
                    <option
                      v-for="(item2, index) in class_inf"
                      :key="index"
                      :value="item2.id"
                    >
                      {{ item2.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-xs-7 col-md-4 col-sm-6 col-lg-4">
                  <label>身份证号</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="IDCard"
                    placeholder="请输入身份证号"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-xs-12 col-md-8 col-sm-10 col-lg-8">
                  <label>家庭住址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="非必填"
                    v-model="address"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-xs-12 col-md-8 col-sm-10 col-lg-8">
                  <label>就读学校</label>
                  <input
                    type="text"
                    class="form-control"
                    value="四川工商职业技术学院"
                    placeholder="非必填"
                    v-model="educationSchool"
                  />
                </div>
              </div>
              <div class="row">
                <div class="form-group col-xs-7 col-md-4 col-sm-6 col-lg-4">
                  <label>电话号码</label>
                  <!-- <input type="text" class="form-control" value="软件19332" placeholder="请输入手机号" /> -->

                  <input
                    type="text"
                    class="form-control"
                    value="13545789524"
                    placeholder="请输入手机号"
                    v-model="telephone"
                  />
                </div>

                <div class="form-group col-xs-7 col-md-4 col-sm-4 col-lg-4">
                  <label>备用号码</label>
                  <!-- <input type="text" class="form-control" value="软件19332" placeholder="请输入手机号" /> -->

                  <input
                    type="text"
                    class="form-control"
                    value="13545789524"
                    placeholder="非必填"
                    v-model="phone"
                  />
                </div>
              </div>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
              <button type="button" class="btn btn-primary">确认修改</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </aside>
</template>

<script>
export default {
  name: "student_info",
  mounted() {
    this.getInfo();
    this.getFacInf();
  },
  data() {
    return {
      //从接口获得的信息
      fac_inf: "",
      all_inf: "",
      class_inf: "",
      //双向绑定信息
      all_id: "",
      fac_id: "",
      class_id:"",
      name: "",
      sex: "",
      class_name: "",
      IDCard: "",
      address: "",
      home_phone: "",
      educationSchool: "",
      telephone: "",
      phone: "",
    };
  },
  methods: {
    //获取本人已有信息
    getInfo: function () {
      this.axios({
        method: "get",
        url:
          "http://iwck.top:8081/student/findStudentById?token=" +
          sessionStorage.getItem("token") +
          "&id=" +
          sessionStorage.getItem("userid"),
      }).then((data) => {
        console.log(data.data.data);
        this.address = data.data.data.address;
        this.class_name = data.data.data.class_name;
        this.educationSchool = data.data.data.educationSchool;
        this.IDCard = data.data.data.idcard;
        this.name = data.data.data.name;
        this.sex = data.data.data.sex;
        this.telephone = data.data.data.phone;
        this.phone = data.data.data.home_phone;
      });
    },
    /*
    此处开始下拉框联动操作
    */
    //获取院系信息
    getFacInf: function () {
      this.axios({
        method: "get",
        url:
          "http://iwck.top:8081/faculty/findFacultys?token=" +
          sessionStorage.getItem("token"),
        //headers:{ "Content-Type": "application/x-www-form-urlencoded"}
      }).then((data) => {
        this.fac_inf = data.data.data;
        console.log(this.fac_inf);
      });
    },
    //获取专业信息
    getSpecialty: function () {
      this.axios({
        method: "get",
        url:
          "http://iwck.top:8081/speciality/findSpecialitys?token=" +
          sessionStorage.getItem("token") +
          "&id=" +
          this.fac_id,
        //headers:{ "Content-Type": "application/x-www-form-urlencoded"}
      }).then((data) => {
        this.all_inf = data.data.data;
        console.log(this.all_inf);
      });
    },
    //获取班级信息
    getlessons: function () {
      this.axios({
        method: "get",
        url:
          "http://iwck.top:8081/stuclass/queryClassIdAndName?token=" +
          sessionStorage.getItem("token") +
          "&speId=" +
          this.all_id,
        //headers:{ "Content-Type": "application/x-www-form-urlencoded"}
      }).then((data) => {
        console.log(data.data.data);
        this.lesson = data.data.data;
      });
    },
    //修改所有信息,待修改，记得更改
    submitInfo: function () {
      let formdata = new FormData();
      formdata.append("className", this.className);
      formdata.append("curriId", this.lesson_id);
      formdata.append("speId", this.all_id);
      formdata.append("teaId", sessionStorage.getItem("userid"));
      formdata.append("token", sessionStorage.getItem("token"));
      this.axios({
        method: "post",
        url: "http://iwck.top:8081/student/editStudentById",
        data: formdata,
      }).then((data) => {
        console.log(data.data);
      });
    },
  },
};
</script>

<style>
</style>