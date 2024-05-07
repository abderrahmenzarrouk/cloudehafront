import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { ClasseServiceService } from 'src/app/home/services/classe-service.service';

@Component({
  selector: 'app-reservationcalender',
  templateUrl: './reservationcalender.component.html',
  styleUrls: ['./reservationcalender.component.css']
})
export class ReservationcalenderComponent {
  constructor(private router: Router, private http: HttpClient,private classeService: ClasseServiceService){

  }
  classes: any[] = []; 
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
   
  ngOnInit(): void {
    this.getreservations()
    this.getinvitation()
    

   


  }
  logout(){
    localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
    localStorage.removeItem(localStorage.getItem('Token')!);
    this.router.navigateByUrl('/login');
    
  }

  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
   

  nombreinvi : number = 0;
  invitations: any[] = [];
  getinvitation(){

    const url = 'http://localhost:8083/Invitation/listInvitationByUserId/'+this.userconnect.id;
    const token = localStorage.getItem('Token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        this.invitations=response
        this.nombreinvi = this.invitations.length
        })
  }

  viewDate:Date= new Date();
  view : CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  events :  CalendarEvent[]=[];
  activeDayIsOpen = false;
    
 refresh = new Subject<void>()


  setView(view:CalendarView){
    this.view=view;
  }

  dayClicked ({date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth (date, this.viewDate)) {
      if(
        (isSameDay (this.viewDate, date) && this.activeDayIsOpen == true) ||
         events.length ===0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;

      }
      this. viewDate = date;
    }
  }

  eventClicked(event :any){
    console.log(event);
  }

 eventTimesChanged(event:any){
  event.event.start=event.newStart;
  event.event.end= event.newEnd;
  this.refresh.next();
 }
 addEvent(): void {
  const newEvent: CalendarEvent = {
    title: 'Nouvelle réservation',
    start: new Date(),
    end: new Date(),
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    }
  };
  this.events.push(newEvent);
}
reservations: any[] = [];

getreservations(){

  const url = 'http://localhost:8083/reservations/getAllReservation';
  const token = localStorage.getItem('Token');
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  this.http.get(url, { headers }).subscribe(
    (response: any) => {
      this.reservations=response
      console.log(this.reservations)
      this.reservations.forEach(reservation => {
        // Create an object for each reservation
        let reservs = {
          title: "reservation",
          start: new Date(reservation.debutReservation),
          end: new Date(reservation.finReservation),
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        };
     
        // Push the reservs object into the reservsArray
        this.events.push(reservs);
      });
      console.log(this.events)
      
      })
}

}
