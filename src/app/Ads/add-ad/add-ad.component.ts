import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { Listing } from 'src/app/models/listing';
import { ListingRessourceJsonLd } from 'src/app/models/listing-ressource';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})


export class AddAdComponent implements OnInit {

  constructor(

    private httpClient: HttpClient, //add http protocole to the component
    private router: Router, // add router angular service

  ) { }


  public violationList: ConstraintViolationList|null = null; //declare violationList var for Input correspondance

  //make all the datas available from the ad-user page, so we can use the form component for adding user/ and modifiyinf them
  public ad: Listing = { //create user var to stock info in the object user
    title: '',
    description: '',
    releaseYear: '',
    km: 0,
    price: '',
    brand: '',
    model: '',
    fuel: undefined,
    garage: '',
  };

  

  ngOnInit(): void {
  }

  // OUtside ngOnInit

  public submit(ad:Listing): void{
     //methode POST we use ad:listing argument to be able to add ad id later and specify to modify the ad data
    this.httpClient.post<ListingRessourceJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings', ad).subscribe({
     
    //use Html message(<div>) and ngIf to inform the user creation (to do)
      next: (createdAd) => { //function for OK results
        
        //alert('User' + createdUser[@id] + 'created.');
        //Redirect list /details after user creation 
        this.router.navigate(['/ads/ads-list']);
      },
      
      error : (err: HttpErrorResponse) => { //error message
        
        if (err.status === 422) {
          
          this.violationList = err.error; //retrieve error form api message
          //alert (violationList ['hydra:description']); // obosolete// print api message
        }
        else { // inform iuser that an error has occured (need to dispaly a better message (error unexpected))
          
          alert(err.status + '- An error as occured.');
        }
      },
    });
  }




}
