
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { UserJsonld } from 'src/app/models/user-jsonld';


import { User } from 'src/app/models/users';



@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  

})


export class UserFormComponent implements OnInit {
 
  //check state of form
  public editInit:  boolean = false;

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

    return arr; // and print it in html
  }

  constructor() { }

  

  ngOnInit(): void { 
   
    
    //check on url to determine which side of the form we are using
    if (this.CurrentUrl ===  this.addUserUrl){

        this.createUserUrl =true;
       
    }
  

  
  }

  public createUserUrl: boolean = false;

  public CurrentUrl:string = (window.location.href).toString();

  public addUserUrl:string = 'http://localhost:4200/users/add-user';

  public submit(){ 
    if (this.user !== null) {
      this.formSubmit.emit(this.user);
    }
  }



}
