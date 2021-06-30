<template>
  <div class="mylogin">
    <div class="form-box" id="login-box">
      <div class="header">学生端登录</div>
      <form>
        <div class="body bg-gray">
          <div class="form-group">
            <input
              type="text"
              name="username"
              v-model="username"
              :class="style"
              @blur="usernamecheck()"
              placeholder="请输入账号"
            />
            <p style="color: red">{{ userinfo }}</p>
          </div>
          <div class="form-group">
            <input
              type="password"
              name="password"
              v-model="password"
              @blur="passwordcheck()"
              class="form-control"
              placeholder="请输入密码"
            />
            <p style="color: red">{{ passinfo }}</p>
          </div>
          <div class="form-group">
            <yzm status="status" @changeyzm="yzmsucess()" />
          </div>
        </div>
        <div class="footer">
          <button
            type="button"
            class="btn bg-olive btn-block"
            @click="logincheck()"
            :disabled="disabled"
          >
            登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import yzm from "../components/yzm";
export default {
  name: "Login",
  components: {
    yzm,
  },
  data() {
    return {
      status: false,
      disabled: true,
      username: "2020030382",
      password: "2020030382",
      userinfo: "",
      passinfo: "",
      style: "form-control",
    };
  },
  methods: {
    usernamecheck: function () {
      if (this.username.length < 5) {
        this.userinfo = "账号长度不正确";
      } else {
        this.userinfo = "";
      }
    },
    passwordcheck: function () {
      if (this.password.length < 5) {
        this.passinfo = "密码长度不对";
      } else {
        this.passinfo = "";
      }
    },
    yzmsucess: function () {
      this.disabled = false;
    },
    logincheck: function () {
      let pamars=new URLSearchParams();
      pamars.append("loginid",this.username),
      pamars.append("password",this.password)
      //学生端登录验证
      this.axios({
        method: "post",
        url: "http://iwck.top:8081/studentlogin/logincheck",
        data:pamars,
        headers:{ "Content-Type": "application/x-www-form-urlencoded"}
      }).then((data) => {
        sessionStorage.setItem("classid",data.data.data.classid)
        if(data.data.code==400){
          alert(data.data.message);
        }
        else{
          sessionStorage.setItem("name",data.data.data.name)
          sessionStorage.setItem("token",data.data.data.token);
          //返回查询的token对应的用户id
          let parmas=new URLSearchParams();
          parmas.append("token",data.data.data.token);
           this.axios({
             method:"get",
             url:"http://iwck.top:8081/studentlogin/tokenselect?token="+data.data.data.token,
           }).then((data)=>{
            sessionStorage.setItem("userid",data.data.data)
            
            location.href = "/";
           })
        }
      });
    },
  },
};
</script>

<style>
.mylogin {
  margin: 200px auto;
}

.bordercolor {
  border-color: #f56954;
}
</style>
