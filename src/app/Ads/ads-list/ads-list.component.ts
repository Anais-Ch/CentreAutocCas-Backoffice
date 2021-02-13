import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';//import of HTTPCLIENT MODULE
import { ListingRessourceJsonLd } from 'src/app/models/listing-ressource';
import { ListingCollectionJsonld } from 'src/app/models/listing-collection';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { ListingCollectionFilters } from 'src/app/models/listing-collection-filters';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss']
})


export class AdsListComponent implements OnInit {

  closeResult: string | undefined; //modal

  public listAds: number = 0; //var to get hydra:totalItems

  public ads: Array<ListingRessourceJsonLd> = []; //empty Array to retrieve data from ListinRessourdsJsonld object

  public violationList: ConstraintViolationList|null = null; //declare violationList var for Input correspondance


  ///pagination
  public prevLink: string|null = null;  // set  prevLink on null by default, for balise display 
  public nextLink: string|null = null; // set nextLink on null by default, for balise display 

  //FILTERS ads

  public filters: ListingCollectionFilters = {
    id: null,
    title: '',
    garage: '/api/garages/',

  }
  



  constructor(
    private httpClient: HttpClient, //bind httpClient to this component
    private modalService: NgbModal, //for modals
    private router: Router, //allow redirection to other pages

  ) { }

  ngOnInit(): void {

    //retrieve page 1 from listing list on page loading
  this.loadPage('/api/listings?page=1');

  }

  //outside ngOnInit()

   ///Methode to retrieve number of users from ['hydra:totalItems']
    
   public countAds():number {
    this.httpClient.get<ListingCollectionJsonld>('https:/hb-bc-dwwm-2020.deploy.this-serv.com/api/listings').subscribe((data)=>{
    this.listAds = data['hydra:totalItems'];
    });
    return this.listAds;
  }

  //var to get nb ads
    public nbAds:number = this.countAds();


  /// APPLY FILTERS

  public applyFilters(page: number = 1): void {
    
    //if no number then page = 1 put everyhting on page 1
    let url = '/api/listings?page=' + page;

    // Object.keys(this.filters) => ['email', 'lastName', 'bsrasrui']
    // Object.keys get an array of all attribute's name from a given object.
    for (const key of Object.keys(this.filters)){ //filling filters with datat from page
      
      // access an object's attribute with that array syntax 
      if (key in this.filters) {

        const val= this.filters[key as keyof ListingCollectionFilters];

        if(val !== null && val !== '' && val !== '/api/garages/') {
          url += '&' + key + '=' + val;
        }
      }
    }

    this.loadPage(url);
  }
  

  //Loading page methode on private since it's only called in ts

  private loadPage(page:string):void {

    //bind the get to the API URL (without garage or users etx specifiaction) + page for pagination
    this.httpClient.get<ListingCollectionJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com' + page).subscribe((data) =>{
     
      this.ads =data ['hydra:member']; //fill the array ads with data from the API

     //BTN NEXT conditions
     if (data['hydra:view']['hydra:next'] === undefined) {
       
      //if no next page
      this.nextLink =null; //nextLink is set on null the btn disappear
     }
     else{
       
      //else next link var is set to data from hydra:next and is displayed
      this.nextLink= data['hydra:view']['hydra:next'];
     }
     //BTN PREVIOUS conditions
     if (data ['hydra:view']['hydra:previous'] === undefined) {// if no previous page
       
      this.prevLink = null;//prevLink is set on null the btn disappear
     }
     else { 
       
      //else prevlink var is set to data from hydra:previous and is displayed
      this.prevLink = data['hydra:view']['hydra:previous'];
     }

    });
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



   //Method Delete AD

    //retrieve user id in html call of the function
    public deleteAd(id: number): void {

      this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings/'+ id).subscribe({
        next : () => {

          this.loadPage('/api/listings?page=1');// reload list
          this.countAds();// refresh count users
        },
        error : (err: HttpErrorResponse) => { //error message
         
          if (err.status === 404) {
            this.violationList = err.error; //retrieve error form api message
            alert (err.error['hydra:description']); 
           
          }
          else if (err.status === 401) {

            this.violationList = err.error; //retrieve error form api message
            alert (err.status +'- Veuillez vous authentifier');
          }
          else { // inform iuser that an error has occured (need to dispaly a better message (error unexpected))
           
            alert(err.status + '- An error as occured.');
          }
        },
      });
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

