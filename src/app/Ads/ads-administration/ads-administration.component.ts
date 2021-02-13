import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { Listing } from 'src/app/models/listing';
import { ListingRessourceJsonLd } from 'src/app/models/listing-ressource';

@Component({
  selector: 'app-ads-administration',
  templateUrl: './ads-administration.component.html',
  styleUrls: ['./ads-administration.component.scss']
})
export class AdsAdministrationComponent implements OnInit {

  public ad: ListingRessourceJsonLd|null = null; //get ad opbject

  public violationList: ConstraintViolationList|null = null; //get constraint violation list object


  constructor(
    

    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute, //add activatedRoute angular service
    private router: Router,



    
  ) { }

  ngOnInit(): void {

    //retrieve params from URL (defined in app-routing.module.ts).
    this.activatedRoute.params.subscribe((params) => {
      //params.Yourvar
      this.httpClient.get<ListingRessourceJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings/' + params.id).subscribe({
        
        next: (ad: ListingRessourceJsonLd) => {
        this.ad = ad;
      },
      error: (err: HttpErrorResponse) => {
        ///need to handle error better than this
        alert(err.status + ' - ' + err.statusText);
      },
      });
    });
  }


  //outside ngOnInit function

  //create new ad and error status 

  public submit(ad: Listing): void {
    this.httpClient.put<ListingRessourceJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings/' + this.ad?.id, ad).subscribe({
     
      next: (createdUser) => {
        
        this.router.navigate(['/ads/ads-list']);
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
