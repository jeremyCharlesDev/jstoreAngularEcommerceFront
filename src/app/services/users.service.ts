import { Result } from './../model/result';
import { environment } from './../../environments/environment';
import { Users } from './../model/users';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: Users;
  isAuth = false;
  userSubject = new Subject<Users>();

  constructor(private http: HttpClient) { }

  emitUser(): void {
    this.userSubject.next(this.user);
  }

  // tslint:disable-next-line: typedef
  authentifier(newUser: Users) {
    return new Promise(
      (resolve, reject) => {
        // tslint:disable-next-line: max-line-length
        const url = environment.API + 'authentifier.php?' + environment.API_KEY + '&email=' + newUser.email + '&password=' + newUser.password;
        this.http.get(url).subscribe(
          (data: Result) => {
            if (data.status === 200){
              this.user = data.result;
              this.isAuth = true;
              this.emitUser();
              resolve(data.result);
            } else {
              console.log(data.result);
              reject(data.message);
            }
          }, (error) => {
              console.log('error :' + error);
              reject(false);
          }
        );
      }
    );
  }

  // tslint:disable-next-line: typedef
  createUser(newUser: Users) {
    return new Promise(
      (resolve, reject) => {
        const url = `${environment.API + 'createUsers.php?' + environment.API_KEY}` +
        '&email=' + newUser.email + '&password=' + newUser.password + '&sexe=' + newUser.sexe +
        '&firstname=' + newUser.firstname + '&lastname=' + newUser.lastname + '&dateBirth=' +
        newUser.dateBirth + '&pseudo=' + newUser.pseudo;

        this.http.get<Result>(url).subscribe(
          (data: Result) => {
            if (data.status === 200){
              this.user = data.args;
              this.isAuth = true;
              this.emitUser();
              resolve(data.result);
            } else {
              reject(data.message);
            }
          },
          (error) => {
              reject(error);
          }
        );
      }
    );
  }

  logout(): void {
    this.user = null;
    this.isAuth = false;
    this.userSubject = new Subject<Users>();
  }




}
