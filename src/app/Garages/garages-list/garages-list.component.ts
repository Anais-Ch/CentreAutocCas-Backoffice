import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GarageResourceJsonld } from 'src/app/models/garage-ressources';
import { GarageCollectionJsonld } from 'src/app/models/garage-collection';
import { GarageCollectionFilter } from 'src/app/models/garages-collection-filters';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';

@Component({
  selector: 'app-garages-list',
  templateUrl: './garages-list.component.html',
  styleUrls: ['./garages-list.component.scss']
})
export class GaragesListComponent implements OnInit {
  
  closeResult: string | undefined; //modal

  public listGarages: number = 0;//var to get hydra:totalItems

  public garages: Array<GarageResourceJsonld> = []; //empty tab for garages list
  
  //pagination
  public prevLink: string|null = null; // set prev Link on null by default, for balise display 
  public nextLink: string|null = null; // set next Link on null by default, for balise display 
  public lastPage: number|null= null;// set LastPage on null by default and on type number

  public violationList: ConstraintViolationList|null = null; //declare violationList var for Input correspondance

  //empty flters object to retrieve filter interface
  public filters: GarageCollectionFilter= {
    id: null,
    name: '',
    postalCode: '',
    owner: '/api/users/',
  }


  constructor(
    private httpClient: HttpClient, //bind httpclient to the component
    private modalService: NgbModal, //for Modals items
    private router: Router, //allow redirection to toher pages
  ) { }

  ngOnInit(): void {
   //retrieve page 1 from garages list on page loading
  this.loadPage('/api/garages?page=1');
   
  }
  
  //outside ngOnInit()


  //APPLY FILTERS

  public applyFilters(page:number =1): void { //if no number page is set to one 
    let url = '/api/garages?page=' + page; // set begining of the url

      // Object.keys(this.filters) => ['email', 'lastName', 'bsrasrui']
      // Object.keys get an array of all attribute's name from a given object.
      
      for (const key of Object.keys(this.filters)){ //filling filters with datat from page
        // access an object's attribute with that array syntax 
        if (key in this.filters) {
          const val= this.filters[key as keyof GarageCollectionFilter];
          
          if(val !== null && val !== '' && val !== '/api/users/' ) {
            url += '&' + key + '=' + val;
          }
        }
      }
      this.loadPage(url)
  }

  
  //Loading page methode on private since it's only called in ts
  
  private loadPage(page:string): void {

    //bind the get to the API URL (without garage or users etx specifiaction) + page for pagination
    this.httpClient.get<GarageCollectionJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com' + page).subscribe((data) =>{
      this.garages = data ['hydra:member'];//fill the array garages with data from the API

      //BTN NEXT conditions
      if (data['hydra:view']['hydra:next'] === undefined){ //if no next page
        this.nextLink = null; //nextLink is set on null the btn disappear
      }

      else{//else next link var is set to data from hydra:next and is displayed
        this.nextLink = data['hydra:view']['hydra:next']; 
      }
      //BTN PREVIOUS conditions
      if (data ['hydra:view']['hydra:previous'] === undefined){  // if no previous page
        this.prevLink = null;//prevLink is set on null the btn disappear
      }

      else {//else prevlink var is set to data from hydra:previous and is displayed
        this.prevLink = data['hydra:view']['hydra:previous'];
      }
      
      //BTNS DISPLAY ALL PAGES
      if(data['hydra:view']['hydra:last'] === undefined){ // if no pages (no datas)
        this.lastPage = null; //LastPage is set on null no btn dispplay
      }

      else {
        //'/api/users?pages=1'
        const regex = /\.*page=([0-9]+)/;//set type for results on '\.page=Numberbetween0 and 9 and more characters;
        const str = data['hydra:view']['hydra:last']; //set str on hydra:last value ( link+ number of the last page)
      
        //an array
        //first element => the full regex
        //second element => only the contenbt inside first parentheses
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

  //methode to retrieve  all pages in an array
  public get getPageNumbers(): Array<number>{

    const arr: Array<number> = [];

    if(this.lastPage !== null){//if theres is pages (so some datas)
      
      for (let i = 1;
        i <= this.lastPage;
        i++) {
          arr.push(i); //retrieve number of pages in one array
        }
    }
    return arr;
  }

  //methode to load Pages by number

  public loadPagebyNumber(pageNumber: number): void { // change the url form load page to with  each button to het the url pf each page
    
    this.loadPage('/api/garages?page=' + pageNumber);
    this.applyFilters(pageNumber); //load request on page loading
  }

  
  //methode for loading next page
    public loadNextpage():void {//called on click
     
      if(this.nextLink !==null){ //if nextLink is set on hydra:next data
        this.loadPage(this.nextLink); //methode loadPage for number set in nextLink
      }
    }

    //methode for loading Previous page
    public loadLastpage():void { //called on click
      
      if(this.prevLink !==null){ //if prevLink is set on hydra:previous data
        this.loadPage(this.prevLink); //methode loadPage for number set in prevLink
      }
    }


    // Mehode DELETE GARAGE

    //retrieve user id in html call of the function
    public deleteGarage(id: number): void {

      this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/'+ id).subscribe({
        next : () => {

          this.loadPage('/api/garages?page=1');// reload list
          this.countGarages();// refresh count users
        },
        error : (err: HttpErrorResponse) => { //error message
          if (err.status === 404) {
            alert(err.status + ' - ' + err.statusText)
            this.violationList = err.error; //retrieve error form api message
            //alert (violationList ['hydra:description']); // obosolete// print api message
          
          }
          else if (err.status === 301) { //  ( unexpected error)
  
            alert(err.status + '- Page déplacée de manière permanente');
          }
          else if ((((err.status).toString()).substring(0)) === '3'){
  
            alert(err.status + '-Redirection')
          }
          else if (err.status === 400) {
  
            alert(err.status + '- Mauvaise requète, veuillez entrer des valeurs valides');
  
          }
          else if (err.status === 403){
  
            alert(err.status + '-Authorisation insuffisante pour la requète courante. -Accés interdit');
  
          }
          else if (err.status === 406) {
  
            alert(err.status + '-Requète non acceptable, format non pris en compte');
  
          }
          else if (err.status === 410) {
  
              alert(err.status + '-La ressource n\' est plus disponible et aucune redirection n\'est connue');
          }
          else if (err.status === 444) {
  
            alert(err.status + '-Absence de réponse serveur');
          }
          else if (err.status === 456) {
  
            alert(err.status + '-Erreur irrécupérable');
          }
          else if ((((err.status).toString()).substring(0)) === '4'){
  
            alert(err.status + '-Erreur Client')
  
          }
          else if (err.status === 500) {
  
            alert(err.status + 'Erreur interne du serveur');
          }
  
          else if (err.status === 502) {
            
            alert(err.status + '- mauvaise passerelle');
          }
  
          else if (err.status === 503) {
  
            alert(err.status + '- Service Indisponible- Le serveur est en cours de maintenance veuillez réessayer plsu tard');
  
          }
  
          else if (err.status === 504) {
  
            alert(err.status + '-Le portail a éxpiré');
          }
  
          else if (err.status === 508){
  
            alert(err.status + '- Limite de ressource atteinte');
          }
          else {
            alert(err.status +'- Erreur Serveur')
          }
        },
      });
    }

    //retrive nb Garages in this var 
    public nbGarages:number = this.countGarages();

    ///Methode ot retrive number of garages from ['hydra:totalItems']
    
    public countGarages():number {

      this.httpClient.get<GarageCollectionJsonld>('https:/hb-bc-dwwm-2020.deploy.this-serv.com/api/garages').subscribe((data)=>{
      
        this.listGarages = data['hydra:totalItems'];
      });

      return this.listGarages;
    }

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
