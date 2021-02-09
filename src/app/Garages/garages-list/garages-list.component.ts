import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GarageResourceJsonld } from 'src/app/models/garage-ressources';
import { GarageCollectionJsonld } from 'src/app/models/garage-collection';

@Component({
  selector: 'app-garages-list',
  templateUrl: './garages-list.component.html',
  styleUrls: ['./garages-list.component.scss']
})
export class GaragesListComponent implements OnInit {
  public garages: Array<GarageResourceJsonld> = []; //empty tab for garages list
  public prevLink: string|null = null; // set prev Link on null by default, for balise display 
  public nextLink: string|null = null; // set next Link on null by default, for balise display 
  
  public lastPage: number|null= null;// set LastPage on null by default and on type number

  //filters GARAGES
    public filterName =''; // var to stock name searched
    public filterOwner =''; //var to stock owners ref

  constructor(
    private httpClient: HttpClient, //bind httpclient to the component
  ) { }

  ngOnInit(): void {
   //retrieve page 1 from garages list on page loading
  this.loadPage('/api/garages?page=1');
   
  }
  
  //outside ngOnInit()


  //APPLY FILTERS

  public applyFilters(page:number =1): void { //if no number page is set to one 
    let url = '/api/garages?page=' + page; // set begining of the url

    //filter for Name
    if(this.filterName !== '') {
      url += '&name=' + this.filterName; // concatène '&name=number' to request url
    }
    if(this.filterOwner !== '') {
      url += '&owner=' + this.filterOwner;// concatène '&owner=number' to request url
    }
    this.loadPage(url);//loadpage
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



   
    
  
  
  

}
