<template>
  <div>
    <!-- 学习态度表 -->
    <section class="content col-sm-12 col-lg-12">
      <attitude :lessonID="lessonid"></attitude>
      
    </section>
    <!-- 学习习惯表 -->
    <section class="content col-sm-12 col-lg-12">
      <habbit :lessonID="lessonid"></habbit>
    </section>
    <!-- 学习成绩表 -->
    <section class="content col-sm-12 col-lg-12">
      <grade :lessonID="lessonid"></grade>
    </section>
  </div>
</template>

<script>
import attitude from "../components/selfStudyInfo/StudyAttitude";
import grade from "../components/selfStudyInfo/StudyGrades";
import habbit from "../components/selfStudyInfo/StudyHabbits";
export default {
  components: { attitude, grade, habbit },
  name: "all_Info",
  props:{
      lessonid:{
          type:String,
          required:true
      },
  },
  mounted() {
    this.lessonid
  },
  data(){
    return{

    }
  },
  methods: {
  
  },
};
</script>

<style>
</style>