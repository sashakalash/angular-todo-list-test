import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/core/services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { forEach, map } from 'lodash';
import { Router, UrlSerializer, ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/core/models/todoElem';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  loading: boolean;
  todos;
  showModal: boolean;
  modalState: string;
  currentTask = new Todo();
  title: string;

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService,
  ) {
  }

  get editedTaskName() {
    return this.currentTask.title;
  }

  set editedTaskName(value: string) {
    this.currentTask.title = value;
  }

  ngOnInit(): void {
    this.getTodosList();
  }

  getTodosList() {
    this.todoService.getTodos().subscribe(res => this.todos = res);
  }

  toggleModalView() {
    this.showModal = !this.showModal;
  }

  openTask(task: Todo): void {
    if (this.loading) {
      return;
    }
    this.currentTask = task;
    this.title = this.currentTask.title;
    this.modalState = 'editing';
    this.toggleModalView();
  }

  makeTask(event, task: Todo): void {
    event.stopPropagation();
    this.currentTask = task;
    this.activateTask();
  }

  removeTask(event, task: Todo): void {
    event.stopPropagation();
    this.currentTask = task;
    this.title = this.currentTask.title;
    this.modalState = 'removing';
    this.toggleModalView();
  }

  addtask(): void {
    this.modalState = 'adding';
    this.toggleModalView();
  }

  getModalTitle(flag: string) {
    switch (flag) {
      case 'adding':
        return 'Добавление';
      case 'editing':
        return 'Редактирование';
      case 'removing':
        return 'Удаление';
    }
  }

  closeModal(): void {
    this.currentTask = new Todo();
    this.title = '';
    this.toggleModalView();
  }

  actionTask(): void {
    switch (this.modalState) {
      case 'adding':
        this.currentTask.title = this.editedTaskName;
        this.addingTask();
        break;
      case 'editing':
        this.currentTask.title = this.editedTaskName;
        this.editingTask();
        break;
      case 'removing':
        this.removingTask();
        break;
    }
  }

  refreshList(): void {
    this.loading = false;
    this.getTodosList();
  }

  showErrorsMessage(): void {
    this.loading = false;
    this.toastr.error('Что-то пошло не так!', 'Неудача!');
  }

  addingTask() {
    this.toggleModalView();
    this.loading = true;
    this.todoService.createTodo(this.currentTask).subscribe(
      res => {
        this.toastr.success('Успешно создано!', 'Успех!');
        this.refreshList();
      },
      err => { this.showErrorsMessage(); });
  }

  editingTask() {
    this.toggleModalView();
    this.loading = true;
    this.todoService.editTodo(this.currentTask).subscribe(
      res => {
        this.toastr.success('Успешно отредактировано!', 'Успех!');
        this.refreshList();
      },
      err => { this.showErrorsMessage(); });
  }

  activateTask() {
    this.loading = true;
    this.currentTask.completed = !this.currentTask.completed;
    this.todoService.editTodo(this.currentTask).subscribe(
      res => {
        this.toastr.success('Успешно изменен статус!', 'Успех!');
        this.refreshList();
      },
      err => { this.showErrorsMessage(); });
  }

  removingTask() {
    this.toggleModalView();
    this.loading = true;
    this.todoService.removeTodo(this.currentTask.id).subscribe(
      res => {
        this.toastr.success('Успешно удалено!', 'Успех!');
        this.refreshList();
      },
      err => { this.showErrorsMessage(); });
  }
}
