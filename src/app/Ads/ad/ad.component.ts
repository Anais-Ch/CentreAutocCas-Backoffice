import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { ListingRessourceJsonLd } from 'src/app/models/listing-ressource';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})


export class AdComponent implements OnInit {

  public violationList: ConstraintViolationList|null = null; //declare violationList var for Input correspondance
  
  closeResult: string|undefined; //for modal


  public currentAd: ListingRessourceJsonLd = {
    '@id': '',
    '@context':  '', 
    '@type': '',
    id:  0,
    title: '',
    description: '',
    releaseYear: '',
    km: 0, 
    price: '', 
    brand: '',
    model: '',
    fuel: undefined,
    garage:'',


  }


  constructor(

    private httpClient: HttpClient, //add httpclient protocole to component
    public activatedRoute: ActivatedRoute,     
    public router: Router,
    private modalService: NgbModal, //for pop up  

  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( (params) => {

      this.httpClient.get<ListingRessourceJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings/' + params.id).subscribe( {
        
      next: (currentAd: ListingRessourceJsonLd) => {
          
        //console.log(user);
          this.currentAd = currentAd;
        },

        error: (err: HttpErrorResponse) => {
         
          alert(err.status + ' - ' + err.statusText)
        }
      })

    });

  }


  // OUTISIDE NGONINIT

  //Method DeleteAd

    //retrieve user id in html call of the function
    public deleteAd(id: number): void {

      this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings/'+ id).subscribe({
        next : () => {

          //redirection on users list
          this.router.navigate(['/ads/ads-list']);
        },
        error : (err: HttpErrorResponse) => { //error message
          if (err.status === 404) {
            this.violationList = err.error; //retrieve error form api message
            alert (err.error['hydra:description']); 
           
          }
          else if (err.status === 401) {

            alert(err.status + '- Veuillez vous authentifier pour effecteur cette action');

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

  
  ////MODALS
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
