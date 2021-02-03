import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserCollection } from 'src/app/models/user-collection';
import { UserJsonld } from 'src/app/models/user-jsonld';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {


  public users: Array<UserJsonld> = []; //empty array to retrieve the data from our get request

  constructor(
    private httpClient: HttpClient, //lie le client au component
  ) { }

  ngOnInit(): void {
    //url requète
    this.httpClient.get</*précise à methode get l'objet quis uit interface UserCollection*/UserCollection>(/*url request*/'https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users?page=1').subscribe(/*fonction anonyme*/(data) => {
      console.log(data);
      for(const user of data['hydra:member']) {
        console.log(user.firstName);// on peut utiliser tout nos users
        this.users = data ['hydra:member'];
      }
      
    } );
  }

}
