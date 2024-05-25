import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Subject } from 'rxjs';
import { Task } from '../models/task';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  readonly userUrl = 'https://localhost:7213/api/UserInfoes';
  readonly taskUrl = 'https://localhost:7213/api/TaskInfoes';

  authchange = new Subject<boolean>();
  logedUserId: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);
  Tasks = new Subject<Task[]>();
  users = new Subject<User[]>();
  taskPosted = new EventEmitter<void>();
  taskDeleted = new EventEmitter<void>();
  taskUpdated = new EventEmitter<void>();
  userPost = new EventEmitter<void>();


  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  getUser() {
    return this.http.get<User[]>(this.userUrl).subscribe({
      next: (res) => {
        this.users.next(res);
      },
      error: (err: any) => {
        this.openSnackBar(err.message, 'بستن', 'error');
      },
    });
  }

  postUser(user: User) {
    return this.http.post<User>(this.userUrl, user).subscribe({
      next: () => {
        this.openSnackBar('کاربر ثبت نام شد،لطفا وارد شوید', 'بستن', 'success');
        this.userPost.emit();
      },
      error: (err: any) => {
        this.openSnackBar(err.message, 'بستن', 'error');
      },
    });
  }

  getTask() {
    return this.http.get<Task[]>(this.taskUrl).subscribe({
      next: (res) => {
        this.Tasks.next(res);
      },
      error: (err: any) => {
        this.openSnackBar(err.message, 'بستن', 'error');
      },
    });
  }

  postTask(task: Task) {
    return this.http.post<Task[]>(this.taskUrl, task).subscribe({
      next: () => {
        this.openSnackBar('با موفقیت ثبت شد', 'بستن', 'success');
        this.taskPosted.emit();
      },
      error: (err: any) => {
        this.openSnackBar(err.message, 'بستن', 'error');
      },
    });
  }

  deleteTask(id: number) {
    return this.http.delete<number>(this.taskUrl + '/' + id).subscribe({
      next: () => {
        this.openSnackBar('با موفقیت حذف شد', 'بستن', 'success');
        this.taskDeleted.emit();
      },
      error: (err: any) => {
        this.openSnackBar(err.message, 'بستن', 'error');
      },
    });
  }

  updateTask(id: number, task: Task) {
    return this.http.put<Task>(this.taskUrl + '/' + id, task).subscribe({
      next: () => {
        this.openSnackBar('با موفقیت به روزرسانی شد', 'بستن', 'success');
        this.taskUpdated.emit();
      },
      error: (err: any) => {
        this.openSnackBar(err.message, 'بستن', 'error');
      },
    });
  }

  getFromStorage() {
    //access to local storage and see if user is loged in
    if (localStorage.getItem('authchange')) {
      this.authchange.next(true);

      this.logedUserId.next(Number(localStorage.getItem('logedUserId')));
      this.router.navigate(['/task']);
    } else {
      this.authchange.next(false);
    }
  }

  openSnackBar(
    message: string,
    action: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message, action, type },
      duration: 6000,
      panelClass: ['custom-snack-bar-container'],
    });
  }


}
