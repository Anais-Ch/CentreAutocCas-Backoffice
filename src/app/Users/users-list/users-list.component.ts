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
  public prevLink: string|null = null; //met la valeur de balises à null
  public nextLink: string|null = null;//met la valeur des balise à null pour els cacher
  
  constructor(
    private httpClient: HttpClient, //bind httpclient to the component
  ) { }

  ngOnInit(): void {
    //retrieve page 1 from garages list on page loading
    this.loadPage('/api/users?page=1');
    }

    //outside ngOnInit()
  
    //Loading page methode on private since it's only called in ts
    private loadPage(page:string): void{
      //bind the get to the API URL (without garage or users etx specifiaction) + page for pagination
      this.httpClient.get<UserCollection>('https:/hb-bc-dwwm-2020.deploy.this-serv.com' + page).subscribe((data)=>{
        this.users = data['hydra:member'];//fill the array garages with data from the API

        //BTN NEXT conditions
        if (data['hydra:view']['hydra:next'] === undefined) {  //if no next page
          this.nextLink = null;// retrieve hydra:next into hydra:view /nextLink is set on null the btn disappear
        }
        else { //else next link var is set to data from hydra:next and is displayed
          this.nextLink = data['hydra:view']['hydra:next'];
        }

        //BTN PREVIOUS conditions
        if(data['hydra:view']['hydra:previous'] === undefined){  // if no previous page
          this.prevLink = null; //prevLink is set on null the btn disappear
        
        }
        else { //else prevlink var is set to data from hydra:previous and is displayed
          this.prevLink= data['hydra:view']['hydra:previous'];
        }
      });
    }

    //methode for loading next page
    public loadNextPage(): void { //called on click
      if(this.nextLink !==null){ //if nextLink is set on hydra:next data
        this.loadPage(this.nextLink);//methode loadPage for number set in nextLink
      }
      
    }
 
    //methode for loading Previous page
    public loadLastpage(): void { //called on click
      if(this.prevLink !==null){ //if prevLink is set on hydra:previous data
        this.loadPage(this.prevLink); //methode loadPage for number set in prevLink
      }
    }


   
}
