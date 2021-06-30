<template>
  <div class="bg-black">
    <div class="form-box" id="login-box">
      <div class="header">登录</div>
      <form action="../../index.html" method="post">
        <div class="body bg-gray">
          <div class="form-group">
            <input type="text" name="userid" class="form-control" placeholder="请输入账号" />
          </div>
          <div class="form-group">
            <input type="password" name="password" class="form-control" placeholder="请输入密码" />
          </div>
          <div class="form-group">
            <input type="checkbox" name="remember_me" /> 记住密码
          </div>
        </div>
        <div class="footer">
          <button type="submit" class="btn bg-olive btn-block">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login"
  }
</script>

<style>
</style>
