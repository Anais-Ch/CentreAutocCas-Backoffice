import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UserJsonld } from 'src/app/models/user-jsonld';
import { User } from 'src/app/models/users';

import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';



@Component({
  selector: 'app-users-administration',
  templateUrl: './users-administration.component.html',
  styleUrls: ['./users-administration.component.scss']
})

export class UsersAdministrationComponent implements OnInit {

  public user: UserJsonld|null = null; //get user object

  public violationList: ConstraintViolationList|null = null; //get constraint violation list object


  /////// 
  public idGarage: Array<number> = [];

  constructor(
    
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute, //add activatedRoute angular service
    private router: Router,
    
    ) { }
    

    //get URL
  public createUserUrl: boolean = false;
  public CurrentUrl:string = (window.location.href).toString();
  public addUserUrl:string = 'http://localhost:4200/users/add-user';

  ngOnInit(): void {


    /// COMPARE CURENT URL TO ADD-USER URL
    if (this.CurrentUrl ===  this.addUserUrl){

      this.createUserUrl =true;  
  }


    //retrieve params from URL (defined in app-routing.module.ts).
    this.activatedRoute.params.subscribe((params) => {
      //params.Yourvar
      this.httpClient.get<UserJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/' + params.id).subscribe({
        
        next: (user: UserJsonld) => {
        this.user = user;
        
          //GET Actuel id from /api/garage/id  and push it in ifGarage Array
        for (let garage of this.user.garages) {
          this.idGarage.push(parseInt((garage.substring(13,(garage.length)))));

        }

      },
      error: (err: HttpErrorResponse) => {
        ///need to handle error better than this
        alert(err.status + ' - ' + err.statusText);
      },
      });
    });

  }

  

  //create new user and error status 

  public submit(user: User): void {
    this.httpClient.put<UserJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/' + this.user?.id, user).subscribe({
     
      next: (createdUser) => {
        
        if (this.createUserUrl === true) {

          this.router.navigate(['/users/users-list']);
        
        }       
        
      },
      error: (err: HttpErrorResponse) => {
        
        if(err.status === 422) {
          
          this.violationList = err.error;
        }
        else {
          
          alert(err.status + ' - An error occured.');
        }
      },
    });
  }


}
