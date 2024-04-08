import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { ITask } from '../../core/models/common.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{  
  taskForm!: FormGroup;
  taskId = '';
  kind = '';
  minDate : any;
  constructor(
    private fb: FormBuilder, 
    private taskService: TaskService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.taskForm = this.fb.group({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      duedate: new FormControl("", Validators.required),
      status: new FormControl("", Validators.required)
    })
  }

  ngOnInit(): void {    

    const datePipe = new DatePipe('en-Us');
    this.minDate = datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.kind = this.activatedRoute.snapshot.data['kind'];

    if(this.kind === 'edit') {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        
        this.taskId = params['id'];        
        this.getTask(this.taskId);
    
      }
    })
  }
  }
  
  onSubmit() {
    if(this.taskForm.valid){
      if(this.taskId == '') {
        this.taskService.addTask(this.taskForm.value);        
      }
      else {
        console.log(this.taskForm.value);
        this.taskService.updateTask(this.taskId, this.taskForm.value);
      }      
      this.router.navigate(['/']);
    }
    else
    this.taskForm.markAllAsTouched();
  }

  getTask(key: string) {
    this.taskService.getTask(key).snapshotChanges().subscribe({
      next: (data) => {
      let task = data.payload.toJSON() as ITask;
      this.taskForm.setValue(task);
      },
    });
  }
}
