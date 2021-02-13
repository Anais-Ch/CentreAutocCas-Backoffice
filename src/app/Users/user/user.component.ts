import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UserJsonld } from 'src/app/models/user-jsonld';
import { User } from 'src/app/models/users';
import {ActivatedRoute, Router} from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public violationList: ConstraintViolationList|null = null; //declare violationList var for Input correspondance
  
  closeResult: string|undefined; //for modal
    

  public currentUser: UserJsonld = {
    '@id': '',
    '@context':  '', 
    '@type': '',
    id:  0,
    lastName: '',
    firstName: '',
    email: '',
    phone: undefined, 
    siret: undefined, 
    garages: [],


  }

  constructor(

    private httpClient: HttpClient, //add httpclient protocole to component
    public activatedRoute: ActivatedRoute,     
    public router: Router,
    private modalService: NgbModal, //for pop up   
    
  ) { }
    

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params) => {
      this.httpClient.get<UserJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/' + params.id).subscribe( {
        next: (currentUser: UserJsonld) => {
          //console.log(user);
          this.currentUser = currentUser;
        },
        error: (err: HttpErrorResponse) => {
         alert(err.status + ' - ' + err.statusText)
        }
      })

    });

       
  }

  //Method DeleteUSer
    //retrieve user id in html call of the function
    public deleteUser(id: number): void {
      this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/'+ id).subscribe({
        next : () => {

          //redirection on users list
          this.router.navigate(['/users/users-list']);
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
