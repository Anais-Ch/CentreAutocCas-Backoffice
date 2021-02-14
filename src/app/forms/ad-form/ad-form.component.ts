import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { Listing } from 'src/app/models/listing';
import { ListingCollectionJsonld } from 'src/app/models/listing-collection';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.scss']
})


export class AdFormComponent implements OnInit {


  @Input()
  public ad: Listing|null= null; //variable for ngIf on form

  @Input()
  public violationList: ConstraintViolationList|null = null;

  @Output()
  public formSubmit = new EventEmitter<Listing>(); //send info from form


  //Var to comapre urls

  public createUserUrl: boolean = false;
  public CurrentUrl:string = (window.location.href).toString();
  public addUserUrl:string = 'http://localhost:4200/ads/add-ad';




  //retrieveErrors methode return an array 'arr'
  public retrieveErrors(fieldName:string): Array<string> {
    
    const arr: Array<string> = [];

    if (this.violationList !== null) {
      
      for (const err of this.violationList.violations) { //get array violaton from constraintViolationlist interface
        
        if(err.propertyPath === fieldName) { //check if API message is one of the API KNown error
          
          arr.push(err.message); //if error is known push message from API in arrauy 'arrr' 
        }
      } 
    }

    return arr; // and print it in html
  }



  constructor(
  ) { }


  ngOnInit(): void {

    //check on url to determine which side of the form we are using
    if (this.CurrentUrl ===  this.addUserUrl){

      this.createUserUrl =true;  
  }

  }

  //Outside ngOnInit

  public submit(){ 
    if (this.ad !== null) {
      this.formSubmit.emit(this.ad);
    }
  }

}
