import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UserJsonld } from 'src/app/models/user-jsonld';
import { User } from 'src/app/models/users';

import { ConstraintViolationList } from 'src/app/models/constraint-violation-list';



@Component({
  selector: 'app-users-administration',
  templateUrl: './users-administration.component.html',
  styleUrls: ['./users-administration.component.scss']
})

export class UsersAdministrationComponent implements OnInit {

  public user: UserJsonld|null = null; //get user object

  public violationList: ConstraintViolationList|null = null; //get constraint violation list object
   
  //set objet id
   public currentUserId: number = 0;


  /////// 
  public idGarage: Array<number> = [];

  constructor(
    
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute, //add activatedRoute angular service
    private router: Router,
    
    ) { }
    

    //get URL
  public createUserUrl: boolean = false;
  public CurrentUrl:string = (window.location.href).toString();
  public addUserUrl:string = 'http://localhost:4200/users/add-user';

  ngOnInit(): void {

      
    /// COMPARE CURENT URL TO ADD-USER URL
    if (this.CurrentUrl ===  this.addUserUrl){

      this.createUserUrl =true;  
  }


    //retrieve params from URL (defined in app-routing.module.ts).
    this.activatedRoute.params.subscribe((params) => {
      //params.Yourvar
      this.currentUserId = params.id;

      this.httpClient.get<UserJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/' + params.id).subscribe({
       
        next: (user: UserJsonld) => {
        this.user = user;
        
          //GET Actual id from /api/garage/id  and push it in ifGarage Array
        for (let garage of this.user.garages) {
          this.idGarage.push(parseInt((garage.substring(13,(garage.length)))));

        }

      },
      error : (err: HttpErrorResponse) => { //error message
        if (err.status === 400) {
          alert(err.status + ' - ' + err.statusText)
          this.violationList = err.error; //retrieve error form api message
          //alert (violationList ['hydra:description']); // obosolete// print api message
        
        }
        else if (err.status === 301) { //  ( unexpected error)

          alert(err.status + '- Page déplacée de manière permanente');
        }
        else if ((((err.status).toString()).substring(0)) === '3'){

          alert(err.status + '-Redirection')
        }
        else if (err.status === 403){

          alert(err.status + '-Authorisation insuffisante pour la requète courante. -Accés interdit');

        }
        else if (err.status === 404) {

          alert(err.status + '- Page non trouvée');

        }
        
        else if (err.status === 406) {

          alert(err.status + '-Requète non acceptable, format non pris en compte');

        }
        else if (err.status === 410) {

            alert(err.status + '-La ressource n\' est plus disponible et aucune redirection n\'est connue');
        }
        else if (err.status === 444) {

          alert(err.status + '-Absence de réponse serveur');
        }
        else if (err.status === 456) {

          alert(err.status + '-Erreur irrécupérable');
        }
        else if ((((err.status).toString()).substring(0)) === '4'){

          alert(err.status + '-Erreur Client')

        }
        else if (err.status === 500) {

          alert(err.status + 'Erreur interne du serveur');
        }

        else if (err.status === 502) {
          
          alert(err.status + '- mauvaise passerelle');
        }

        else if (err.status === 503) {

          alert(err.status + '- Service Indisponible- Le serveur est en cours de maintenance veuillez réessayer plsu tard');

        }

        else if (err.status === 504) {

          alert(err.status + '-Le portail a éxpiré');
        }

        else if (err.status === 508){

          alert(err.status + '- Limite de ressource atteinte');
        }
        else {
          alert(err.status +'- Erreur Serveur')
        }
      },
      });
    });

  }

  

  //create new user and error status 

  public submit(user: User): void {
    this.httpClient.put<UserJsonld>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/' + this.user?.id, user).subscribe({
     
      next: (createdUser) => {

          this.router.navigate(['/users/users-list']);
            
        
      },
      error : (err: HttpErrorResponse) => { //error message
        if (err.status === 400) {
          alert(err.status + ' - ' + err.statusText)
          this.violationList = err.error; //retrieve error form api message
          //alert (violationList ['hydra:description']); // obosolete// print api message
        
        }
        else if (err.status === 422) {
          alert(err.status + ' - ' + err.statusText)
          this.violationList = err.error; //retrieve error form api message
          //alert (violationList ['hydra:description']); // obosolete// print api message
        
        }
        else if (err.status === 301) { //  ( unexpected error)

          alert(err.status + '- Page déplacée de manière permanente');
        }
        else if ((((err.status).toString()).substring(0)) === '3'){

          alert(err.status + '-Redirection')
        }
        else if (err.status === 404) {

          alert(err.status + '- Page non trouvée');

        }
        else if (err.status === 403){

          alert(err.status + '-Authorisation insuffisante pour la requète courante. -Accés interdit');

        }
        else if (err.status === 406) {

          alert(err.status + '-Requète non acceptable, format non pris en compte');

        }
        else if (err.status === 410) {

            alert(err.status + '-La ressource n\' est plus disponible et aucune redirection n\'est connue');
        }
        else if (err.status === 444) {

          alert(err.status + '-Absence de réponse serveur');
        }
        else if (err.status === 456) {

          alert(err.status + '-Erreur irrécupérable');
        }
        else if ((((err.status).toString()).substring(0)) === '4'){

          alert(err.status + '-Erreur Client')

        }
        else if (err.status === 500) {

          alert(err.status + 'Erreur interne du serveur');
        }

        else if (err.status === 502) {
          
          alert(err.status + '- mauvaise passerelle');
        }

        else if (err.status === 503) {

          alert(err.status + '- Service Indisponible- Le serveur est en cours de maintenance veuillez réessayer plsu tard');

        }

        else if (err.status === 504) {

          alert(err.status + '-Le portail a éxpiré');
        }

        else if (err.status === 508){

          alert(err.status + '- Limite de ressource atteinte');
        }
        else {
          alert(err.status +'- Erreur Serveur')
        }
      },
    });
  }


}
