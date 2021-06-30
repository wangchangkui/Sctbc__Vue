<template>
  <div class="box" id="loading-example">
    <div class="box-header">
      <i class="fa fa-cloud"></i>

      <h3 class="box-title">个人学习习惯</h3>
    </div>
    <div class="box-body no-padding">
      <div class="row">
        <div class="col-xs-12" v-if="isExist()">
          <label>教师尚未上传该数据</label>
        </div>
        <!-- 这里用来放文本总结（学习习惯的总结） -->
        <div v-else>
          <div class="col-xs-12">
            <!-- 总结话语，有bug -->
            <!-- <label v-if="judge() == -1"></label>
            <label v-else-if="judge() < 60"
              >该学生总体学习习惯较差，请注意及时提醒</label
            >
            <label v-else-if="judge() < 70"
              >该学生总体学习习惯及格，需要及时督促</label
            >
            <label v-else-if="judge() < 80"
              >该学生出勤情况一般,需要及时督促</label
            >
            <label v-else-if="judge() < 90">该学生本门课程学习习惯良好</label>
            <label v-else>该学生本门课程学习习惯非常好</label>
            <label>提交作业情况，大于100为未交</label> -->
          </div>

          <div class="col-sm-6 col-xs-12">
            <!-- 签到情况的折线图位置 -->

            <div id="signLine" style="height: 300px; width: auto"></div>
          </div>
          <div class="col-sm-6 col-xs-12">
            <!-- 作业提交情况的折线图位置 -->
            <div id="homeworkLine" style="height: 300px; width: auto"></div>
          </div>
          <!-- 最后统计总次数的柱状图位置-->
          <div class="col-xs-12 col-sm-6">
            <div id="signBar" style="height: 300px; width: auto"></div>
          </div>
          <div class="col-xs-12 col-sm-6">
            <div id="homeworkBar" style="height: 300px; width: auto"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "studyHabbits",
  props: {
    lessonID: String,
  },
  data() {
    return {
      //获取到的数据对象
      time: 0,
      datas: "",
      //签到次数
      allTimes: 0,
      Signtimes: 0,
      //横坐标数据
      xAxisHomework: "",
      xAxisSign: "",
      //平均签到百分比（在百分之60以内都算良好，60-80算一般，80-100算及时）
      signRate: 0,

      homeworkrate: 0,
    };
  },
  mounted() {
    this.homeworkHabbits();
    this.signHabbits();
  },
  methods: {
    isExist: function () {
      // if (this.AxisHomework == null) {
      //   return true;
      // } else {
      //   return false;
      // }
    },
    homeworkHabbits: function () {
      this.axios({
        method: "get",
        url:
          "http://iwck.top:8081/outline/getHabits/getStudentWorkStat?token=" +
          sessionStorage.getItem("token") +
          "&stuId=" +
          sessionStorage.getItem("userid") +
          "&curriId=" +
          this.lessonID,
      }).then((data) => {
        this.datas = data.data.data;
        let works = new Array();
        let allTimes = 0,
          Signtimes = 0;
        for (let i in data.data.data) {
          works[i] = data.data.data[i].name;
          if (data.data.data[i].flag == "1") {
            //计算已签到次数
            Signtimes += 1;
          }
        }

        this.xAxisSign = works;
        allTimes = data.data.data.length;
        //扔到计算时间的算法中
        let result = new Array();
        result = this.LineData(data.data.data);
        this.EchartLine(allTimes, Signtimes, result);
      });
    },

    //将计算的值传递到函数中
    //allTimes 总的应签到次数
    //signtimes 实签到次数
    EchartLine: function (allTimes, Signtimes, done) {
      var lineChart = this.$echarts.init(document.getElementById("signLine"));
      var barChart = this.$echarts.init(document.getElementById("signBar"));
      /*
      
      
      
      //签到表的折线图




      */

      var attendenceLine = {
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
          //对提示的格式进行修改，将小数改成日期
          formatter:function(P){
            //计算小时后小数点
            let h =P[0].data-Math.floor(P[0].data);
            //计算分钟
            let min = h*60;
            //若小时分钟不是两位数在开头加个0
            let FinalHour=Math.floor(P[0].data);
            let FinalMin=Math.floor(min);
            if(FinalHour>100)return "本次作业未提交"
            if(FinalHour<10)
            {
              FinalHour = "0"+FinalHour
            }
            if(FinalMin<10){
              FinalMin="0"+FinalMin
            }
          
            //使用正则表达式查找小数点，通过返回的值从小数点后截取两位数字
            return FinalHour+":"+FinalMin;
          }
        },
        //grid是xy轴带线的格子
        // grid:{
        //     containLabel:true,
        // },
        //这里是折线图存放的单位数据，是在图形的上方进行显示的，进行单击会显示/隐藏
        legend: {
          data: ["个人具体提交作业习惯数据"],
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
          data: this.xAxisSign,
          axisTick: {
            alignWithLabel: true,
          },
        },
        //若有需要，还可以在右侧设置一条y轴
        //min表示y轴最低时的值，max表示y轴最高时的值，默认min是0，max是下面series的最大数据
        yAxis: {
          min: 0,
          max: 24,
          type: "value",
           axisLabel: {
            formatter: "{value}:00",
          },
        },

        //具体数据
        series: [
          {
            name: "个人具体提交作业习惯数据",
            type: "line",
            itemStyle: {
              color: "#5470c6",
            },
            data: done,
          },
        ],
      };
      /*




      //柱状图位置
      
      
      
      
      */

      var attendenceBar = {
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
          data: ["应提交作业总次数", "实提交作业总次数"],
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
            name: "次數",
            min: 0,
            max: allTimes,
            position: "left",
            offset: 0,
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: "{value} 次",
            },
          },
        ],
        animationDurationUpdate: 750,

        series: [
          {
            type: "bar",
            data: [allTimes, Signtimes],
            itemStyle: {
              color: "#91cc75",
            },
          },
        ],
        barWidth: "50",
      };
      lineChart.setOption(attendenceLine);
      barChart.setOption(attendenceBar);
      window.addEventListener("resize", () => {
        lineChart.resize();
        barChart.resize();
      });
    },

    //刚开始把签到和作业弄反了，所以变量有点乱
    signHabbits: function () {
      this.axios({
        method: "get",
        url:
          "http://iwck.top:8081/outline/getHabits/queryStudyHabits?token=" +
          sessionStorage.getItem("token") +
          "&stuId=" +
          sessionStorage.getItem("userid") +
          "&curriId=" +
          this.lessonID,
      }).then((data) => {
        this.datas = data.data.data;
        let works = new Array();
        let allTimes = 0,
          Signtimes = 0;
        for (let i in data.data.data) {
          works[i] = data.data.data[i].name;
          if (data.data.data[i].flag == "出勤") {
            //计算已签到次数
            Signtimes += 1;
          }
        }

        this.xAxisHomework = works;
        allTimes = data.data.data.length;

        //扔到计算时间的算法中
        let result = new Array();
        result = this.LineData(data.data.data);
        this.signchart(allTimes, Signtimes, result);
      });
    },
    signchart: function (allTimes, homeworktimes, result) {
      let signlineChart = this.$echarts.init(
        document.getElementById("homeworkLine")
      );
      let signbarChart = this.$echarts.init(
        document.getElementById("homeworkBar")
      );
      /*




      作业提交情况的折线图




      */

      //设置时间
      var uploadHomeworkLine = {
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
          formatter:function(P){
            //计算小时后小数点
            let h =P[0].data-Math.floor(P[0].data);
            //计算分钟
            let min = h*60;
            //若小时分钟不是两位数在开头加个0
            let FinalHour=Math.floor(P[0].data);
            let FinalMin=Math.floor(min);
            if(FinalHour>100)return "本次未进行签到"
            if(FinalHour<10)
            {
              FinalHour = "0"+FinalHour
            }
            if(FinalMin<10){
              FinalMin="0"+FinalMin
            }
          
            //使用正则表达式查找小数点，通过返回的值从小数点后截取两位数字
            return FinalHour+":"+FinalMin;
          }
        },
        //grid是xy轴带线的格子
        // grid:{
        //     containLabel:true,
        // },
        //这里是折线图存放的单位数据，是在图形的上方进行显示的，进行单击会显示/隐藏
        legend: {
          data: ["个人具体签到习惯数据"],
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
          data: this.xAxisHomework,
          axisTick: {
            alignWithLabel: true,
          },
        },
        //若有需要，还可以在右侧设置一条y轴
        //min表示y轴最低时的值，max表示y轴最高时的值，默认min是0，max是下面series的最大数据
        yAxis: {
          min: 0,
          max: 24,
          type: "value",
          axisLabel: {
            formatter: "{value}:00",
          },
        },

        //具体数据
        series: [
          {
            name: "个人具体签到习惯数据",
            type: "line",
            itemStyle: {
              color: "#5470c6",
            },
            data: result,
          },
        ],
      };
      /*


  

     作业按时，迟交，未交，总次数柱状图




     */
      var uploadHomeworkBar = {
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
          data: ["应签到总次数", "实签到总次数"],
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
            name: "签到次數",
            min: 0,
            max: allTimes,
            position: "left",
            offset: 0,
            axisLine: {
              show: true,
            },
            axisLabel: {
              formatter: "{value} 次",
            },
          },
        ],
        animationDurationUpdate: 750,

        series: [
          {
            type: "bar",
            itemStyle: {
              color: "#91cc75",
            },
            data: [allTimes, homeworktimes],
          },
        ],
        barWidth: "50",
      };
      signlineChart.setOption(uploadHomeworkLine);
      signbarChart.setOption(uploadHomeworkBar);
      window.addEventListener("resize", () => {
        signlineChart.resize();
        signbarChart.resize();
      });
    },
    judge: function () {
      // console.log(this.homeworkRate)
      if (this.signRate == undefined || this.homeworkRate == undefined) {
        return -1;
      }
      this.signRate;
      return this.Signtimes / this.allTimes;
    },
    //设计签到时间和提交作业时间的算法(待修改)
    LineData: function (data) {
      //与最早提交作业时间和最迟提交作业时间的进行比较
      //用nowData代替学习习惯中获取到的提交作业时间数组，data带起从上面函数获取的时间对象
      let rate = new Array();
      //计算未出勤/签到次数,将未出勤/签到的值设置为110，会影响平均值
    
      for (let i in data) {
        if (data[i].time == null) {
          rate.push(110);
        } else {
          //将获得的日期转化为字符串格式
          let pure = new Date(data[i].time);

          //将时间转化成小时为单位
          let h = parseFloat(pure.toString().slice(16, 18));
          let m = parseFloat(pure.toString().slice(19, 21));

          let s = parseFloat(pure.toString().slice(22, 24));
          h += s / 60 / 60 + m / 60;

          rate.push(h.toFixed(2));
        }
      }
      //使用ES6的特性，计算平均值
      // this.signRate = rate.reduce((num, item, index) => {
      //   if (index != rate.length - 1) {
      //     return num + item;
      //   } else {
      //     return (num + item) / rate.length;
      //   }
      // });
      //返回数组，将数组数据拿去绘图

      return rate;
    },
  },
};
</script>

<style>
</style>