import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/home/services/user.service';

@Component({
  selector: 'app-profileadmin',
  templateUrl: './profileadmin.component.html',
  styleUrls: ['./profileadmin.component.css']
})
export class ProfileadminComponent {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  constructor(private router: Router, private userService : UserService ){}
  users: any[] = [];
  ngOnInit(): void {
    this.userconnect;
    this.getusers()
  }



  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }
  getusers() {
    this.userService.getUsers().subscribe(
      (users: any[]) => {
        console.log(users)
        this.users = users.filter(user => user.userRole.role !== "Admin" && user.userRole.role !== "Tuteur"); 
      }
    );
  }
  logout(){
    localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
    localStorage.removeItem(localStorage.getItem('Token')!);
    this.router.navigateByUrl('/login');
    
  }
}


