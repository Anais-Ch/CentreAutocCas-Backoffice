import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Listing } from 'src/app/models/listing';
import { ListingCollectionJsonld } from 'src/app/models/listing-collection';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.scss']
})
export class AdFormComponent implements OnInit {

  public listing: Listing = {
    title: '',
    description: '',
    releaseYear: '',
    km: 0,
    price:'',
    brand: '',
    model: '',
    fuel: undefined,
    garage: '',    
  };

  constructor(
    private httpClient: HttpClient,
  ) { }

  public submit(): void {
    this.httpClient.post<ListingCollectionJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings', this.listing).subscribe((listing) => {
      alert('Ad created');

    }) ;
  }

  ngOnInit(): void {
  }

}
