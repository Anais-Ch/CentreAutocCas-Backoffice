import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Garage } from 'src/app/models/garage';
import { GarageResourceJsonld } from 'src/app/models/garage-ressources';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';

@Component({
  selector: 'app-garage-form',
  templateUrl: './garage-form.component.html',
  styleUrls: ['./garage-form.component.scss']
})


export class GarageFormComponent implements OnInit {

  @Input()
  public garage: Garage|null = null;// var for ngIf on the form

  @Input()
  public violationList: ConstraintViolationList|null = null;

  @Output()
  public formSubmit = new EventEmitter<Garage>(); // to retrieve element  from $event custom in garage adminsitration


  // var to compare URLs
  public createUserUrl: boolean = false;
  public CurrentUrl:string = (window.location.href).toString();
  public addUserUrl:string = 'http://localhost:4200/garages/add-garage';


  
  //retrieveErrors methode return an array 'arr'
  public retrieveErrors(fieldName:string): Array<string> {
    const arr: Array<string> = [];

     if (this.violationList !== null) {

      for ( const err of this.violationList.violations) { //get array violaton from constraintViolationlist interface
 
        if (err.propertyPath === fieldName) { //check if API message is one of the API KNown error

          arr.push(err.message); //if error is known push message from API in arrauy 'arr' 
        }    
      }
    }

    return arr; //and print in html
  }

  constructor() { }


  ngOnInit(): void {
    //check on url to determine which side of the form we are using
    if (this.CurrentUrl ===  this.addUserUrl){

      this.createUserUrl =true;  
    }
  }

  public submit() {

    if(this.garage !== null) {
      this.formSubmit.emit(this.garage);
    }
  }


}
