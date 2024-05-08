import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClasseService } from '../classe.service';

@Component({
  selector: 'app-update-classe',
  templateUrl: './update-classe.component.html',
  styleUrls: ['./update-classe.component.css']
})
export class UpdateClasseComponent {
id:number =this.activatedRoute.snapshot.params["id"]
constructor(private activatedRoute: ActivatedRoute,private service:ClasseService) {}

ngOnInit(){
this.getClasseById();
}

getClasseById(){
  this.service.getClasseById(this.id).subscribe((res)=> {
    console.log(res);
  }   )
}

}