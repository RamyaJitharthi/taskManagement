import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { ITask } from '../../core/models/common.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})

export class TasksComponent implements OnInit{
  tasks: ITask[] = [];
  task!: ITask;
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {

    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().snapshotChanges().subscribe({
      next: (data) => {
        this.tasks = [];

        

        data.forEach((item) => {
          let task = item.payload.toJSON() as ITask;
          console.log(task);
        

          this.tasks.push({
            key: item.key || '',
            title: task.title,
            description: task.description,
            duedate: task.duedate,
            status: task.status
          })
        })
      }
    })
  }

  editTask(key: string) {
    this.router.navigate(['/task-form/' + key]);
  }

  taskDone(key: string) {
    console.log('hi');
    this.taskService.getTask(key).snapshotChanges().subscribe({
      next: (data) => { 
        this.task = data.payload.toJSON() as ITask;
        this.task.status = "compleated";
        this.taskService.updateTask(key, this.task);
        this.getAllTasks();
      },
    });
  }

  deleteTask(key: string) {
    if(window.confirm('Are You Sure?')) {
      this.taskService.deleteTask(key);
    }    
  }
}
