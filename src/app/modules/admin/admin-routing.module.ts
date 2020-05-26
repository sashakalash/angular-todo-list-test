import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'admin',
    component: TodoListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
