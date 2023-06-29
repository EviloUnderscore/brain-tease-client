import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Brain Tease';
  loading = true;
  hasUser = false;

  constructor(public auth: AngularFireAuth){
  }

  ngOnInit(): void{
    this.auth.user.subscribe(user => {
      if(user){
        this.hasUser = true
      }
      this.loading = false;
    });
  }

}
