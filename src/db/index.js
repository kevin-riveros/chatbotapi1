/*

Create Student:

sequelize model:create --name Student --attributes  name:string,dni:string,lastname:string,phone:string,birthday:date

Create Teacher:

sequelize model:create --name Teacher --attributes  name:string,dni:string,lastname:string,email:string,password:string

Create Meeting:

sequelize model:create --name Meeting --attributes  meeting_date:date,start_date:string,end_date:string,reason:string,idTeacher:integer

Create Attendance:

sequelize model:create --name Attendance --attributes  attendance_date:date,attended:boolean,idStudent:integer

Create Classroom:

sequelize model:create --name Classroom --attributes  name:string,idStudentCourse:integer,idTeacher:integer

Create StudentCourse:

sequelize model:create --name StudentCourse --attributes  idCourse:integer,idStudent:integer

Create Grade:

sequelize model:create --name Grade --attributes  mark:integer,idStudentCourse:integer

Create Course:

sequelize model:create --name Course --attributes  name:string

Create Homework:

sequelize model:create --name Homework --attributes  start_date:date,end_date:date,task:text,image:string,alert:text,title:string,idCourse:integer

Create CourseClassroom:

sequelize model:create --name CourseClassroom --attributes  idCourse:integer,idTeacher:integer,idClassroom:integer



*/
