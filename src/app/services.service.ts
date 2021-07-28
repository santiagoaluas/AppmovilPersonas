import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,  } from 'rxjs/operators';
import {  throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  public Get_Usuarios(url:string){
    return this.http.get(url).pipe(catchError(this.handleError));; 
  }

  public Delete_Usuarios(id:string){
    return this.http.delete(`https://protected-woodland-45407.herokuapp.com/Usuarios/${id}`).pipe(catchError(this.handleError));; 
  }

  public Post_Usuarios(usuario : any){
    return this.http.post('https://protected-woodland-45407.herokuapp.com/Usuarios', usuario).pipe(catchError(this.handleError));; 
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
