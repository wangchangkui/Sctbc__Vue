import Router from "vue-router"
import Vue from 'vue'

import Index from '../view/Index'
// import email from '../view/student/Email'
// import teacher from '../view/student/Teacher_info'
// import teacher_change from '../view/student/Teacher_change'
import lam from "../view/student/Lam"
// import FileUpload from "../view/student/Upload_file"
// import FileList from "../view/student/File_list"
// import class_add from "../view/student/Class_add"
// import Class_list from "../view/student/Class_list"
import lessonList from "../view/student/students_lessons"
// import curriculinm_add from "../view/student/curriculum_add"
// import curriculinm_info from "../view/student/curriculum_info"
// import class_info from "../view/student/class_info"
import home from "../view/student/home"
import login from "../view/Login"
import student_info from "../view/student/student_info"
import account_info from "../view/student/student_account_info"
//import studyProgress from "../components/selfStudyInfo/studyProgress"
import studyInfo from "../view/student/student_study_info"

Vue.use(Router)
Vue.use(login)

const router=new Router({
  mode: 'history',
  routes: [
    {
      path:"/",
      redirect:"/index"
    },
    {
      path: "/index",
      component: Index,
      meta:{
        requireAuth:true
      },
      children:[
        {
         path: "/",
         component: home,
         meta:{
           requireAuth:true
         },
        //  children:[
        //    {
        //      path:"/",
        //      component: studyProgress,
        //    }
        //  ]
        },
        {
          path:"/lessonList",
          component:lessonList,
          meta:{
            requireAuth:true
          },
        },
        {
          path:"/lam",
          component:lam,
          meta:{
            requireAuth:true
          },
        },
        {
          path:"/studyInfo/:lessonId",
          name:"student_study_info",
          component:studyInfo,
          meta:{
            requireAuth:true
          }
        },
        {
          path:"/student_info",
          name:"self_info",
          component:student_info,
          meta:{
            requireAuth:true
          }
        },
        {
          path:"/student_account_info",
          component:account_info,
          meta:{
            requireAuth:true
          },
        },
      ]
    },
    {
      path: "/login",
      component: login
    }
  ]
});


export default router;
