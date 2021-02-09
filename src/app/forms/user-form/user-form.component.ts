
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';


import { User } from 'src/app/models/users';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  

})
export class UserFormComponent implements OnInit {


  @Input()
  public user: User|null= null; //variable for ngIf on form

  @Input()
  public violationList: ConstraintViolationList|null = null;
  @Output()
  public formSubmit = new EventEmitter<User>(); //send info from form

  //retrieveErrors methode return an array 'arr'
  public retrieveErrors(fieldName:string): Array<string> {
    const arr: Array<string> = [];

    if (this.violationList !== null) {
      for (const err of this.violationList.violations) { //get array viilaton from constraintViolationlist interface
        if(err.propertyPath === fieldName) { //check if API message is one of the API KNown error
        arr.push(err.message); //if error is known push message from API in arrauy 'arrr' 
        }
      } 
    }

    return arr; //and print it in html
  }

  constructor() { }

  

  ngOnInit(): void {
  }

  public submit(){ 
    if (this.user !== null) {
      this.formSubmit.emit(this.user);
    }
    

  }

}
