<template>
  <div class="box" id="loading-example">
    <div class="box-header">
      <i class="fa fa-cloud"></i>

      <h3 class="box-title">个人学习态度</h3>
    </div>
    <div class="box-body no-padding">
      <div class="row" >
        <div class="col-sm-6 col-xs-12" v-if="isExist()"><label>教师未上传该数据</label></div>
        <div v-else>
        <div class="col-sm-6 col-xs-12">
          <!-- 雷达图位置 -->
          <!-- 显示学生学习态度的雷达图 -->
          <div id="mannerRadar" style="height: 300px; width: auto"></div>
        </div>
        <div class="col-xs-12 col-sm-6">
          <label v-if="judge >= 0.9">目前该学生学习态度非常优秀</label>
          <label v-else-if="judge >= 80">目前该学生学习态度较好</label>
          <label v-else-if="judge >= 70"
            >目前该学生学习态度较良，请及时提醒督促</label
          >
          <label v-else-if="judge >= 0.6"
            >目前该学生学习态度合格，请及时提醒督促</label
          >
          <label v-else>目前该学生学习态度非常糟糕，请注意及时提醒</label>
          <!-- 柱状图位置，显示学生的签到率，作业完成率，作业平均分 -->
          <div id="mannerLine" style="height: 300px; width: auto"></div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudyAttitude",
  props: {
    lessonID: String,
  },
  data() {
    return {
      lessonid: "123231",
      curriculinm: "",
      judge: 0,
    };
  },
  mounted() {
    this.getStudyAttitude();
  },
  methods: {
    isExist:function(){
      // if(this.curriculinm.sign_point===null||this.curriculinm.sign_point===undefined){
      //   return true;
      // }else{
      //   return false;
      // }
    },
    //请求数据的函数,封装结果以进行处理

    getStudyAttitude: function () {
      var lesson;
      if (this.lessonID == undefined) {
        lesson = this.lessonid;
      } else {
        lesson = this.lessonID;
      }
      this.axios({
        method: "get",
        url:
          "http://iwck.top:8081/outline/getAttribute/queryStudyAttribute?token=" +
          sessionStorage.getItem("token") +
          "&stuId=" +
          sessionStorage.getItem("userid") +
          "&curriId=" +
          lesson,
      }).then((data) => {
        if(data.data.data==undefined)
        {
          return null;
        }
        this.curriculinm = data.data.data;
        //计算平均值开始判断学习态度
        this.judge = this.curriculinm.Grend;
        //得到数据后调值绘图
        this.SignTable();
      });
    },
    //对数据进行基本的处理传给绘图函数
    //绘图的函数(还没有data进行设置，当data出现后)
    SignTable: function () {
      var radarchart = this.$echarts.init(
        document.getElementById("mannerRadar")
      );
      var lineChart = this.$echarts.init(document.getElementById("mannerLine"));
      //这里是个人的学习态度的雷达图
          //对数据内容进行判断，如果是NAN则赋值0
      if (isNaN(parseFloat(this.curriculinm.task_point).toFixed(2))) {
        this.curriculinm.task_point = 0;
      }
      if (isNaN(parseFloat(this.curriculinm.hoemwork_point).toFixed(2) * 100)) {
        this.curriculinm.hoemwork_point = 0;
      }

      if (isNaN(parseFloat(this.curriculinm.sign_point).toFixed(2) * 100)) {
        this.curriculinm.sign_point = 0;
      }

      if (isNaN(parseFloat(this.curriculinm.homework_averge).toFixed(2))) {
        this.curriculinm.homework_averge = 0;
      }

      if (isNaN(parseFloat(this.curriculinm.Grend).toFixed(2))) {
        this.curriculinm.Grend = 0;
      }
      var mannerRadar = {

        toolbox: {
          feature: {
            saveAsImage: { show: true },
          },
        },
        //高度300的盒子的选择数据可能挡住雷达图正上方的字，这里进行了调整
        legend: {
          x: "left",
          data: ["个人学习态度雷达图总结"],
        },
        tooltip: {
          trigger: "item",
        },
        radar: {
          indicator: [
            { name: "任务完成情况/%", max: 100 },
            { name: "作业完成情况/%", max: 100 },
            { name: "签到情况/%", max: 100 },
            { name: "作业平均分数", max: 100 },
            { name: "学习态度整体评分", max: 100 },
          ],
        },
        series: {
          type: "radar",
          
              color:'#5470c6',
          
          data: [
            {
              value: [
                parseFloat(this.curriculinm.task_point).toFixed(2),
                parseFloat(this.curriculinm.hoemwork_point).toFixed(2) * 100,
                parseFloat(this.curriculinm.sign_point).toFixed(2) * 100,
                //待修改，作业平均分数
                parseFloat(this.curriculinm.homework_averge).toFixed(2),
                //待修改，学习态度整体评分
                parseFloat(this.curriculinm.Grend).toFixed(2),
              ],
              name: "个人学习态度雷达图总结",
            },
          ],
        },
      };
      //实例化数组对象，使用append往数组添加作业分数等元素，在下方绘图时使用
      var ArrayData = new Array();
  
      var length = ArrayData.push(
        //添加任务分数
        parseFloat(this.curriculinm.task_point).toFixed(2),
        //添加作业提交百分比
        parseFloat(this.curriculinm.hoemwork_point).toFixed(2) * 100,
        //添加签到分数
        parseFloat(this.curriculinm.sign_point).toFixed(2) * 100,
        //添加作业平均分数（待修改）
        parseFloat(this.curriculinm.homework_averge).toFixed(2),
        //待修改，学习态度整体评分
        parseFloat(this.curriculinm.Grend).toFixed(2)
      );

      //这里是个人的学习态度柱状图
      var mannerLine = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        //鼠标滑轮可以缩放
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: 0,
            show: true,
            zoomOnMouseWheel: "shift",
            moveOnMouseMove: true,
          },
        ],
        legend: {
          x: "left",
          data: ["个人学习态度柱状图总结"],
        },
        toolbox: {
          feature: {
            dataView: {
              lang: [" ", "关闭", " "],
              show: true,
              readOnly: true,

              optionToContent: function (opt) {
                var colName = "序号";
                var typeName = "时间";
                // var dataview = opt.toolbox[0].feature.dataView;  //获取dataview
                var table = "";
                table += getTable(opt, colName, typeName);
                return table;
              },
            },
            saveAsImage: { show: true },
          },
        },
        xAxis: {
          axisTick: {
            alignWithLabel: true,
          },
          axisPointer: {
            show: true,
          },
          data: [
            "任务完成情况/%",
            "作业完成情况/%",
            "签到情况/%",
            "作业平均分数",
            "学习态度整体评分",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: [
          {
            type: "value",
            name: "比率/分数",
            min: 0,
            max: 100,
            position: "left",
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        animationDurationUpdate: 750,
        // ["出勤率/%", "作业提交率/%", "回答问题次数/次", "观看视频比率/%", "平均作业完成情况/分", "整体成绩打分/分"]
        series: [
          {
            name: "个人学习态度柱状图总结",
            type: "bar",
            itemStyle:{
              color:'#5470c6'
            },

            data: ArrayData,
          },
        ],
        barWidth: "50",
      };

      lineChart.setOption(mannerLine);
      radarchart.setOption(mannerRadar);
      //当窗口宽度变更时更改图像的宽度
      window.addEventListener("resize", () => {
        radarchart.resize();
        lineChart.resize();
      });
      //默认表格没有样式，这里做了个简单的表格样式
      function getTable(opt, colName, typeName) {
        //从上往下写的x的数据
        var axisData = opt.xAxis[0].data; //获取图形的data数组
        //从左往右的y的数据
        var series = opt.series; //获取series

        var num = 0; //记录序号
        var sum = new Array(); //获取合计数组（根据对应的系数生成相应数量的sum）
        for (var i = 0; i < series.length; i++) {
          sum[i] = 0;
        }
        var table =
          '<table class="bordered"><thead><tr>' +
          "<th>" +
          colName +
          "</th>" +
          "<th>" +
          typeName +
          "</th>";
        for (var i = 0; i < series.length; i++) {
          table += "<th>" + series[i].name + "</th>";
        }
        table += "</tr></thead><tbody>";
        for (var i = 0, l = axisData.length; i < l; i++) {
          num += 1;
          for (var n = 0; n < series.length; n++) {
            if (series[n].data[i]) {
              sum[n] += Number(series[n].data[i]);
            } else {
              sum[n] += Number(0);
            }
          }
          table +=
            "<tr>" + "<td>" + num + "</td>" + "<td>" + axisData[i] + "</td>";
          for (var j = 0; j < series.length; j++) {
            if (series[j].data[i]) {
              table += "<td>" + series[j].data[i] + "</td>";
            } else {
              table += "<td>" + 0 + "</td>";
            }
          }
          table += "</tr>";
        }
        //最后一行加上一条合计
        table += "<tr>" + "<td>" + (num + 1) + "</td>" + "<td>合计</td>";
        for (var n = 0; n < series.length; n++) {
          if (String(sum[n]).indexOf(".") > -1)
            table += "<td>" + Number(sum[n]).toFixed(2) + "</td>";
          else table += "<td>" + Number(sum[n]) + "</td>";
        }
        table += "</tr></tbody></table>";
        return table;
      }
    },
  },
};
</script>

<style >
table {
  /* cellspacing:0 ;
    *border-collapse: collapse; IE7 and lower */
  border-spacing: 0;
  width: 100%;
}
.bordered tr:hover {
  background: #fbf8e9;
}

.bordered th {
  padding: 7px;
  text-align: center;
  /* cellspacing:0; */
}

.bordered td {
  padding: 7px;
  text-align: center;
  /* cellspacing:0; */
}

.bordered th {
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#ebf3fc),
    to(#dce9f9)
  );
  background-image: -webkit-linear-gradient(top, #ebf3fc, #dce9f9);
  background-image: -moz-linear-gradient(top, #ebf3fc, #dce9f9);
  background-image: -ms-linear-gradient(top, #ebf3fc, #dce9f9);
  background-image: -o-linear-gradient(top, #ebf3fc, #dce9f9);
  background-image: linear-gradient(top, #ebf3fc, #dce9f9);
}
.bordered td:first-child,
.bordered th:first-child {
  border-left: none;
}

.bordered tr:nth-of-type(2n) {
  background: #ffffff;
  cursor: pointer;
}
.bordered tr:nth-of-type(2n + 1) {
  background: #f7fafc;
  cursor: pointer;
}

.bordered tbody tr:hover {
  background: #fbf8e9;
  -o-transition: all 0.1s ease-in-out;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}
</style>