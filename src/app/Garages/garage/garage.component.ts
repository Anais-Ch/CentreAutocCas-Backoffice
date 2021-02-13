import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { GarageResourceJsonld } from 'src/app/models/garage-ressources';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})


export class GarageComponent implements OnInit {

  public violationList: ConstraintViolationList|null = null; //declare violationList var for Input correspondance
  
  closeResult: string|undefined; //for modal

  public currentGarage: GarageResourceJsonld = {
    '@id': '',
    '@context':  '', 
    '@type': '',
    id:  0,
    name: undefined,
    street: undefined,
    streetComplement: undefined,
    postalCode: undefined, 
    city: undefined, 
    owner: '',
  }

  constructor(

    private httpClient: HttpClient, //add httpclient protocole to component
    public activatedRoute: ActivatedRoute,     
    public router: Router,
    private modalService: NgbModal, //for pop up  

  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( (params) => {
      this.httpClient.get<GarageResourceJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/' + params.id).subscribe( {
        next: (currentGarage: GarageResourceJsonld) => {
          //console.log(user);
          this.currentGarage = currentGarage;
        },
        error: (err: HttpErrorResponse) => {
         alert(err.status + ' - ' + err.statusText)
        }
      })
    });

  }


  ///Outside ngOnInit

  //Method DeleteUSer

    //retrieve user id in html call of the function
    public deletegarage(id: number): void {
      
      this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/'+ id).subscribe({
        next : () => {

          //redirection on users list
          this.router.navigate(['/garages/garages-list']);
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
