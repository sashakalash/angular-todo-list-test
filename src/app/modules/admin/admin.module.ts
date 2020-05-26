import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AdminComponent } from './admin.component';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    TodoListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    VirtualScrollerModule,
    FormsModule
  ],
  exports: [
  ],
})
export class AdminModule { }
