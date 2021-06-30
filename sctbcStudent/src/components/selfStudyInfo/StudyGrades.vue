<template>
  <div class="box" id="loading-example">
    <div class="box-header">
      <i class="fa fa-cloud"></i>

      <h3 class="box-title">个人学习成绩</h3>
    </div>
    <div class="box-body no-padding">
      <div class="row">
        <div class="col-sm-6 col-xs-12" v-if="isExist()"><label>教师未上传数据</label></div>
        <div class="col-sm-6 col-xs-12">
          <!-- 所有成绩的柱状图位置 -->
          <div id="AllGrades" style="height: 300px; width: auto"></div>
          <!--作业成绩折线图位置-->
        </div>
        <div class="col-xs-12 col-sm-6">
          <div id="homeworkGrades" style="height: 300px; width: auto"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "studyGrades",
  props: {
    lessonID: String,
  },
  mounted() {
    this.getHomeworkGrades();
  },
  data() {
    return {
      //获得所有的作业数据
      datas: "",
      //作业分数的横坐标数据
      xAxisIndex: "",
    };
  },
  methods: {
    isExist:function(){
      if(this.datas==null){
        return true;
      }else{
        return false;
      }
    },
    //获取所有分数平均值的函数
    getAllGrades: function () {
      this.axios({
        method: "get",
        url:
          "http://iwck.top:8081/outline/getGrade/queryGradeStudentByInfo?token=" +
          sessionStorage.getItem("token") +
          "&stuId=" +
          sessionStorage.getItem("userid") +
          "&curriId=" +
          this.lessonID,
      }).then((data) => {
        if (data.data.data == null) {
          //若全是空，则提示未上传数据
          this.echarts(null, null, null);
        } else {
          //就算是有的数据为空空也要传进去
          this.echarts(
            data.data.data.learn_dateGrade,
            data.data.data.ExampleGrade,
            data.data.data.WorkGrade
          );
        }
      });
    },
    //获取作业数据函数
    getHomeworkGrades: function () {
      this.axios({
        method: "get",
        url:
          "http://iwck.top:8081/outline/getGrade/queryHomeworkGradeStudentByInfo?token=" +
          sessionStorage.getItem("token") +
          "&stuId=" +
          sessionStorage.getItem("userid") +
          "&curriId=" +
          this.lessonID,
      }).then((data) => {
        //横坐标，作业名字储存进数组
        var works = new Array();
        for (let i in data.data.data) {
          works[i] = "第" + i + "次作业";
        }
        this.xAxisIndex = works;
        //成绩数组以绘图的折线
        var grade = new Array();
        for (let i in data.data.data) {
          grade[i] = data.data.data[i].workGrade;
        }
        this.datas = grade;
        //将数据传值给函数，开始绘图
        this.getAllGrades();
      });
    },
    //将数据带入，进行画图
    echarts: function (taskGrade, exam, AvgWorkGrade) {
      //带入的值判断是否存在，否则去掉x轴的的单位，柱状图则不出现这些单位
      let lastGrade = "期末成绩",
        homework = "家庭作业",
        task = "任务点完成成绩";
      if (exam == null) {
        lastGrade = "期末成绩（未上传数据）";
      }
      if (taskGrade == null) {
        task = "任务点完成成绩（未上传数据）";
      }
      if (AvgWorkGrade == null) {
        homework = "家庭作业（未上传数据）";
      }
      //防止意外情况(即便用了tofix方法和数据库的储存方法还有很多位小数的情况)，将获取到的成绩截取前五位
      taskGrade = taskGrade + "";
      exam = exam + "";
      AvgWorkGrade = AvgWorkGrade + "";
      taskGrade = parseFloat(taskGrade.substring(0, 5));
      exam = parseFloat(exam.substring(0, 5));
      AvgWorkGrade = parseFloat(AvgWorkGrade.substring(0, 5));
      //函数使用mounted进行预处理
      //进行初始化，获取dom对象
      //全部成绩的柱状图
      var AllGrade = this.$echarts.init(document.getElementById("AllGrades"));
      //全部作业成绩的折线图
      var homeWorkGrades = this.$echarts.init(
        document.getElementById("homeworkGrades")
      );
      //设置绘图
      //柱状图的设置
      var AllBar = {
        //折线图标题,写了容易和折线图的单位发生遮盖,可以使用top，botom进行位移
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: 0,
            show: true,
            zoomOnMouseWheel: "shift",
            moveOnMouseMove: true,
            xAxisIndex: 0,
          },
        ],
        //提示框组件,'axis'表示移动在坐标轴时候就会显示数据,饼图使用'item'
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        //grid是xy轴带线的格子
        // grid:{
        //     containLabel:true,
        // },
        //这里是折线图存放的单位数据，是在图形的上方进行显示的，进行单击会显示/隐藏
        legend: {
          data: ["个人数据"],
        },
        //这里是折线图的工具箱(保存，表格浏览功能，若不是添加其他功能还请不要更改，位置在图形的右上角)
        toolbox: {
          feature: {
            dataView: {
              lang: [" ", "关闭", " "],
              show: true,
              readOnly: true,
              optionToContent: function (opt) {
                var colName = "序号";
                var typeName = "课程次数";
                // var dataview = opt.toolbox[0].feature.dataView;  //获取dataview
                var table = "";
                table += getTable(opt, colName, typeName);
                return table;
              },
            },
            saveAsImage: { show: true },
          },
        },
        //x轴的设置，'type'有'category'和'value'两个,表示具体值的用'value'，表示被统计物用'category'
        //若有需要，还可以在顶部再设置一条x轴
        //'data'是要引用的x轴的数据
        xAxis: {
          type: "category",
          data: this.xAxisIndex,
          axisTick: {
            alignWithLabel: true,
          },
        },
        //若有需要，还可以在右侧设置一条y轴
        //min表示y轴最低时的值，max表示y轴最高时的值，默认min是0，max是下面series的最大数据
        yAxis: {
          min: 0,
          max: 100,
          type: "value",
        },

        //具体数据
        series: [
          {
            name: "个人数据",
            type: "line",
            itemStyle:{
              color:'#5470c6'
            },
            data: this.datas,
          },
        ],
      };
      var homeworkLine = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
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
            //在X轴的提示内容修改

            label: {
              formatter: function (params) {
                return (
                  params.value +
                  (params.seriesData.length
                    ? "：" + params.seriesData[0].data
                    : "")
                );
              },
            },
          },
          //这里lastgrade是指字符串“考试成绩”，根据是否上传参数以决定是否为空
          data: [homework, task, lastGrade],
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
            name: "平均分数",
            min: 0,
            max: 100,
            position: "left",
            offset: 0,
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: "{value} 分",
            },
          },
        ],
        animationDurationUpdate: 750,

        series: [
          {
            type: "bar",
            //柱状图数据
            itemStyle:{
              color:'#91cc75'
            },
            data: [AvgWorkGrade, taskGrade, exam],
          },
        ],
        barWidth: "50",
      };
      //折线图设置
      AllGrade.setOption(AllBar);
      homeWorkGrades.setOption(homeworkLine);
      //设置当窗口大小变化时表格大小也会跟着变
      window.addEventListener("resize", () => {
        AllGrade.resize();
        homeWorkGrades.resize();
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

<style>
</style>