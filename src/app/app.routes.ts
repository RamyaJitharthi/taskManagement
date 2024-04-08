import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';

export const routes: Routes = [
    {path:'', component: TasksComponent},
    {path:'task-form', component: TaskFormComponent, data: { kind: 'add' }},
    {path:'task-form/:id', component: TaskFormComponent, data: { kind: 'edit' }}
];
