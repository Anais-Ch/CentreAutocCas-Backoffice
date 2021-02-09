import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';
import { UserJsonld } from 'src/app/models/user-jsonld';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(
    private httpClient: HttpClient, //add http protocole to the component
    private router: Router, // add router angular service
    ) { }

    //make all the datas available from the ad-user page, so we can use the form component for adding user/ and modifiyinf them
  public user: User = { //create user var to stock info in the object user
    email: '',
    firstName: '',
    lastName: '',
    phone: undefined,
    siret: undefined,
    garages: [],
  }

  public violationList: ConstraintViolationList|null = null; //declare violationList var for Input correspondance

  ngOnInit(): void {
  }

  public submit(user:User){ //methode POST we use user:User argument to be able to adduser id later and specify to modify the users data
    this.httpClient.post<UserJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users', user).subscribe((user) => {
      //use Html message(<div>) and ngIf to inform the user creation (to do)
      next: (createdUser) => { //function for OK results
        //alert('User' + createdUser[@id] + 'created.');
        //Redirect list /details after user creation 
        this.router.navigate(['/users/users-list']);
      }
      //redirect list/details
      error : (err: HttpErrorResponse) => { //error message
        if (err.status === 422) {
          this.violationList = err.error; //retrieve error form api message
          //alert (violationList ['hydra:description']); // obosolete// print api message
        }
        else { // inform iuser that an error has occured (need to dispaly a better message (error unexpected))
        alert(err.status + '- An error as occured.');
      }
      }
      

      
    });
  }

}
