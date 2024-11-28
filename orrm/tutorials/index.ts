import 'reflect-metadata';

import {Student} from './entities/students'; //import Student entity
import {createConnections} from 'typeorm';

export var Erf = () => {
  createConnections()
    .then(async connection => {
      console.log('Inserting a new record into the student database...');

      const stud = new Student();

      stud.Name = "student1";
      stud.age = 12;

      //save student object in connection await connection.manager.save(stud); console.log("Saved a new user with id: " + stud.id);

      console.log('Loading users from the database...');

      //Display student saved records const students = await connection.manager.find(Student); console.log("Loaded users: ", students);

      console.log(
        'Here you can setup and run express/koa/any other framework.',
      );
    })
    .catch(error => console.log(error));
};
