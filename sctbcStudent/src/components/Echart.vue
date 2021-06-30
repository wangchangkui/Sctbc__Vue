<template>
    <div class="Echarts">
      <div id="c1" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
  export default {
    name: 'Echart',
    methods: {
      myEcharts() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('c1'));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '部分数据'
          },
          tooltip: {},
          legend: {
            data: ['总数']
          },
          xAxis: {
            data: ["软件19332", "软件19333", "软件19332"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

      }
    },
    mounted() {
      this.myEcharts();
    }
  }
</script>

<style scoped="scoped">

</style>
