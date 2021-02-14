import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Type} from '@angular/core';

import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { UserCollection } from 'src/app/models/user-collection';
import { UserJsonld } from 'src/app/models/user-jsonld';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'; //Modal
import { Router } from '@angular/router';
import { UserCollectionFilter } from 'src/app/forms/user-collection-filter';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  
  closeResult: string | undefined; //modal
  public listUser: number = 0; //var to get hydra:totalItems

  public users: Array<UserJsonld> = []; //empty array to retrieve the data from our get request
 
  //pagination
  public prevLink: string|null = null; //met la valeur de balises à null
  public nextLink: string|null = null;//met la valeur des balise à null pour els cacher
  public lastPage: number|null =null; //set last page valuie at null

  public violationList: ConstraintViolationList|null = null; //declare violationList var for Input correspondance

  //filters USERS
  public filters: UserCollectionFilter= { //object to fill when retriveing onfo for a filters
    email: '', 
    lastName:'',
    phone: '',
    siret: '',
    id: null,
  }

  

  constructor(
    private httpClient: HttpClient, //bind httpclient to the component*
    private modalService: NgbModal, //for pop up 
    private router: Router, //allow redirction to other pages
    
  ) { }

  ngOnInit(): void {
    //retrieve page 1 from garages list on page loading
    this.loadPage('/api/users?page=1'); //added this.filterEmail to have allows queries on emails
    
  
    }

    //outside ngOnInit()
    
    
    ///Methode to retrieve number of users from ['hydra:totalItems']
    
    public countUser():number {
      this.httpClient.get<UserCollection>('https:/hb-bc-dwwm-2020.deploy.this-serv.com/api/users').subscribe((data)=>{
      this.listUser = data['hydra:totalItems'];
      });
      return this.listUser;
    }
      
    
    

    //APPLY FILTERS

    public applyFilters(page: number = 1): void {//if no number then page = 1 put everyhting on page 1
      let url = '/api/users?page=' + page;

      // Object.keys(this.filters) => ['email', 'lastName', 'bsrasrui']
      // Object.keys get an array of all attribute's name from a given object.
      for (const key of Object.keys(this.filters)){ //filling filters with datat from page
        // access an object's attribute with that array syntax 
        if (key in this.filters) {
          const val= this.filters[key as keyof UserCollectionFilter];

          if(val !== null && val !== '') {
            url += '&' + key + '=' + val;
          }
        }
      }
      this.loadPage(url);
    }
  



    //LADING page methode on private since it's only called in ts
    private loadPage(page:string): void{

      //bind the get to the API URL (without garage or users etc specifiaction) + page for pagination
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
        //BTNS DISPLAY ALL PAGES
        if(data['hydra:view']['hydra:last'] === undefined){  // if no pages (no datas)
          this.lastPage = null; //LastPage is set on null no btn dispplay
        
        }

        else { 
          //'/api/users?pages=1'
          const regex = /\.*page=([0-9]+)/;// définit le type de résultat attendu ?page=chiffreentre 1et 9
          const str = data['hydra:view']['hydra:last'];

          //an array
          //first element  => the full regex
          //second element => only the content inside first parentheses
          const matches = str.match(regex); 

          if (matches === null) {
            this.lastPage = null;
          }

          else{
            this.lastPage = parseInt(matches[1]);
          }
          
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
    //methode to get all pages
    public get getPageNumbers(): Array<number>{ //tab that conatines pag 1 to last number og pages 
      const arr: Array<number> = [];
      if(this.lastPage !== null){
        for (let i = 1;
          i <= this.lastPage;
          i++) {
            arr.push(i);
          }
      }
      return arr;  
    }

    // loadPageByNumber

    public loadPageByNumber(pageNumber: number): void {
      this.applyFilters(pageNumber);
            
    }
    

    //Method DeleteUSer
    //retrieve user id in html call of the function
    public deleteUser(id: number): void {

      this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/'+ id).subscribe({
        next : () => {

          this.loadPage('/api/users?page=1');// reload list
          this.countUser();// refresh count users
        },
        error : (err: HttpErrorResponse) => { //error message
         
          if (err.status === 404) {
            this.violationList = err.error; //retrieve error form api message
            alert (err.error['hydra:description']); 
           
          }
          else { // inform iuser that an error has occured (need to dispaly a better message (error unexpected))
           
            alert(err.status + '- An error as occured.');
          }
        },
      });
    }
    
    //var to get nb users 
    public nbUser:number = this.countUser();
     

    /////// FUNCTION FOR MODAL
    open(content: any) {

      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  
        this.closeResult = `Closed with: ${result}`;
  
      }, (reason) => {
  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  
      });
  
    }
  
    
  
    private getDismissReason(reason: any): string {
  
      if (reason === ModalDismissReasons.ESC) {
  
        return 'by pressing ESC';
  
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  
        return 'by clicking on a backdrop';
  
      } else {
  
        return  `with: ${reason}`;
  
      }
  
    }
   



}
