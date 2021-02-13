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
  }

  public submit() {

    if(this.garage !== null) {
      this.formSubmit.emit(this.garage);
    }
  }


}
