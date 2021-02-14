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

  // var set to false to determine which btn delete was clicked
  public btnUser: boolean = false;


  //empty array to retrieve garage id
  public idGarage: Array<number> = [];


  //retrieve current id
  public currentGarageId: number|null = null;


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
          
        
          this.currentUser = currentUser;
          
          //retrieve garage id only  and push  oit in array idGarage
          for (let garage of currentUser.garages){
            
            //parseINT >> turninto an int , substring >> get part of the string defined between 13, garage.length ( 13th character to teh end of the string)

            this.idGarage.push(parseInt((garage.substring(13,(garage.length)))));

          };
          
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

      if(this.btnUser === true) {
        
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
        else {
          
          
          this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/'+ id).subscribe({
            next : () => {

              //redirection on self
              this.router.navigate(['/users/user', this.currentUser.id]);
            },
            
            error : (err: HttpErrorResponse) => { //error message

              if (err.status === 404) {

                this.violationList = err.error; //retrieve error form api message
                alert (err.error['hydra:description']); 
              
              }
              else { // inform iuser that an error has occured (need to dispaly a better message (error unexpected))

                alert(err.status + '- An error as occured.');
              };
            }
          });
        }
    };


    // set btn user to true
    public setDeleteUser(): void {
      
      this.btnUser= true;

    };

    public setDeleteGarage(i:number):void {
      this.btnUser =false;
      this.currentGarageId = this.idGarage[i]; //get the current id for delete from current 
      
    }

    //track by for refresh in


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
