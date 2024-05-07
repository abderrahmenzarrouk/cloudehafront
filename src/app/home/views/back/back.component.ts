import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.css']
})
export class BackComponent {
  userconnect = JSON.parse(localStorage.getItem("userconnect")!);
  constructor(private router: Router){}
  logout(){
    localStorage.removeItem(JSON.parse(localStorage.getItem("userconnect")!));
    localStorage.removeItem(localStorage.getItem('Token')!);
    this.router.navigateByUrl('/login');
    
  }
  ngOnInit(): void {
    this.userconnect;
  }
  
  decodeBase64Image(base64Data: string): string {
    return 'data:image/png;base64,' + base64Data;
  }

}
