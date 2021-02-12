import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UserJsonld } from 'src/app/models/user-jsonld';
import { User } from 'src/app/models/users';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    
    
 // @Input()
  //public user: User|null= null; //get User data in user var

  public currentUser: UserJsonld = {
    '@id': '',
    '@context':  '', 
    '@type': '',
    id:  0,
    lastName: '',
    firstName: '',
    email: '',
    phone: undefined, 
    siret: undefined, 
    garages: [],


  }

  constructor(
    private httpClient: HttpClient, //add httpclient protocole to component
    public activatedRoute: ActivatedRoute,     
    public router: Router,    
  ) { }
    

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
      this.httpClient.get<UserJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/' + params.id).subscribe( {
        next: (currentUser: UserJsonld) => {
          //console.log(user);
          this.currentUser = currentUser;
        },
        error: (err: HttpErrorResponse) => {
         alert(err.status + ' - ' + err.statusText)
        }
      })

    });


    
  }

  


}
