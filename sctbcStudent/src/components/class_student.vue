<template>
  <div class="box">
    <div class="box-header">
      <h3 class="box-title">学习情况</h3>
      <div class="box-tools">
        <div class="input-group">
          <input type="text" name="table_search" class="form-control input-sm pull-right" style="width: 150px;"
            placeholder="搜索姓名或者学号" />
          <div class="input-group-btn">
            <button class="btn btn-sm btn-default"><i class="fa fa-search"></i></button>
          </div>
        </div>
      </div>
    </div><!-- /.box-header -->
    <div class="box-body table-responsive no-padding col-lg-12">
      <table class="table table-bordered table-hover text-center">
        <thead>
          <tr>
            <th>学号</th>
            <th>姓名</th>
            <th>任务完成数量</th>
            <th>任务总数量</th>
            <th>视频完成数量</th>
            <th>视频总数量</th>
            <th>视频观看时长</th>
            <th>章节测试完成数量</th>
            <th>章节测试总数量</th>
            <th>章节测试平均分</th>
            <th>作业完成数量</th>
            <th>作业总数量</th>
            <th>签到次数</th>
  
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2019030001</td>
            <td>张三</td>
            <td>01</td>
            <td>02</td>
            <td>03</td>
            <td>01</td>
            <td>02</td>
            <td>03</td>
            <td>01</td>
            <td>02</td>
            <td>03</td>
            <td>01</td>
            <td>02</td>
  
          </tr>
        </tbody>
      </table>
    </div><!-- /.box-body -->
  </div>
</template>

<script>
  export default {
    name: "class_student"
  }
</script>

<style>
</style>
