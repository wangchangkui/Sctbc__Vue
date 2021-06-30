<template>
  <aside class="right-side">
    <!--留言-->
    <section class="content-header" id="lam-header">
      <h1>
        留言
        <small>查看来自教师的留言信息</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <a href="#"><i class="fa fa-dashboard"></i> 主页</a>
        </li>
        <li class="active">留言</li>
        <li class="active">收到的留言信息</li>
      </ol>
    </section>
    <section class="content" id="lam-content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">我的留言</h3>
              <div class="box-tools">
                <div class="input-group">
                  <input
                    type="text"
                    name="table_search"
                    class="form-control input-sm pull-right"
                    style="width: 150px"
                    placeholder="Search"
                  />
                  <div class="input-group-btn">
                    <button class="btn btn-sm btn-default">
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
              <label v-if="NoAnyMessage()">暂未收到来自教师的留言</label>
              <table v-else
                class="table table-striped table-bordered table-hover text-center"
              >
                <tr>
                  <th>留言编号</th>
                  <th>留言来源</th>
                  <th>留言时间</th>
                  <th>留言内容</th>
                  <!-- <th>操作</th> -->
                </tr>
                <tr v-for="(lam,index) in LamData" :key="index">
                  <td>{{lam.id}}</td>
                  <td>{{lam.fromid}}</td>
                  <td>{{lam.lamtime}}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning btn-xs"
                      data-toggle="modal"
                      data-target="#lam-content-modal"
                    >
                      {{lam.content}}
                    </button>
                  </td>
                  <!-- <td>
                    <button type="button" class="btn btn-default btn-xs">
                      删除
                    </button>
                  </td> -->
                </tr>
              </table>
            </div>
            <!-- /.box-body -->
            <!--模态框1：-->
            <div
              class="modal fade"
              id="lam-content-modal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="myModalLabel"
            >
              <!-- <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">张三</h4>
                  </div>
                  <div class="modal-body">这里是具体的留言内容</div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-default"
                      data-dismiss="modal"
                    >
                     关闭
                    </button>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </aside>
</template>

<script>
export default {
  name: "lam",
  data() {
    return{
    //获取全部留言内容
    LamData :this.getLamList(),
    }
  },
  methods: {
    //判断
    NoAnyMessage:function(){

    },
    //通过token查询用户收到的留言内容
    getLamList: function () {
      this.axios({
        method: "get",
        url:
          "http://iwck.top:8081/lamtable/findGetLam?token=" +
          sessionStorage.getItem("token")+
          "&id="+
          sessionStorage.getItem("userid"),
      }).then((data) => {
        this.LamData = data.data.data;
      });
      
    },

  },
};

</script>

<style>
th {
  height: 60px;
  width: 100px;
  border: 1px solid black;
}
td {
  height: 60px;
  width: 100px;
  border: 1px solid black;
}
</style>
