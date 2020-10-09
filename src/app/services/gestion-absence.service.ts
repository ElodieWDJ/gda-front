import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Absence } from '../entities/absence.model';

const table: string[] = [];

@Injectable({
  providedIn: 'root'
})
export class GestionAbsenceService implements OnInit {
  
  private idUtilisateur: string;
  
  constructor(private http : HttpClient) { 
    this.idUtilisateur = localStorage.getItem("idUtilisateur");
      
  }

  ngOnInit() : void {
  }


  afficherListeAbsence(idUtilisateur: string) : void {
    this.http.get<string[]>(`${environment.baseUrl}${environment.apiListeAbsence}${idUtilisateur}`, {withCredentials: true})
    
  }
i
  creerAbsence(absence : Absence) : Observable<Object>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
      return this.http.post(`${environment.baseUrl}${environment.apiCreerAbsence}`,
      { 
        idUtilisateur: this.idUtilisateur,
        dateDebut: absence.dateDebut,
        dateFin: absence.dateFin,
        typeConge: absence.typeConge,
        motif: absence.motif,
  
      },
      httpOptions);
  }


  // Controle si le jour de debut d'absence est à J +2
  checkDay(dateDebut: number) : boolean {
    const dateNow = new Date();
    if((dateNow.getDate() + 1) < dateDebut) {
      return true;
    } else {
      return false;
    }
  }


  
}
