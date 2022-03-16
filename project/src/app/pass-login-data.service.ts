import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassLoginDataService {
  pass_data : any = [];
  
  constructor() { 
    this.pass_data = [];
  }

  getData(){
    return this.pass_data;
  }

   setData(pass_data: []){
    this.pass_data = pass_data;
   }
}
