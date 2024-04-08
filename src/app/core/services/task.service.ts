import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

import { ITask } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private dbPath = "/tasks";
  tasksRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.tasksRef = db.list(this.dbPath);
  }

  getAllTasks() {
    return this.tasksRef;
  }

  getTask(key: string) {
    return this.db.object(`${this.dbPath}/${key}`);
  } 

  addTask(task: ITask) {
    this.tasksRef.push(task);
  }

  updateTask(key: string, task: ITask) {
    this.tasksRef.update(key, task);
  }

  deleteTask(key: string) {
    return this.tasksRef.remove(key);
  }
}
