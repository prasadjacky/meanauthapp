import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { UserPOJO } from '../components/dto/user';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  userObject: UserPOJO.UserDTO;
  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers })
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    localStorage.clear();
    this.authToken = null;
    this.user = null;
  }

  //Qualifications
  addNewQualification(qualification) {
    console.log('Creating new qualification');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/qualifications/addnew', qualification, { headers: headers })
      .map(res => res.json());
  }

  getAllQualification() {
    this.userObject = JSON.parse(localStorage.getItem('user'));
    const userObject = {
      userName: this.userObject.username
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/qualifications/getallqualifications', userObject, { headers: headers })
      .map(res => res.json());
  }

  updateQualification(qualification) {
    console.log('Updating qualification');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/qualifications/updateQualification', qualification, { headers: headers })
      .map(res => res.json());
  }

  removeQualification(qualification) {
    console.log('Updating qualification');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/qualifications/removeQualification', qualification, { headers: headers })
      .map(res => res.json());
  }
}
