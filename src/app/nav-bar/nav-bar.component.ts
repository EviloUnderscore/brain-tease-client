import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  public userName: string | null = null;
  public isLargeScreen$: Observable<boolean>;
  private userId: string | null = null;

  constructor(
    public auth: AngularFireAuth,
    private breakpointObserver: BreakpointObserver){
      this.isLargeScreen$ = this.breakpointObserver
        .observe(Breakpoints.Medium)
        .pipe(map((result: { matches: any; }) => result.matches)
      );
  }
  

  ngOnInit(): void{
    this.auth.user.subscribe(user => {
      if (user) {
        this.userName = user.displayName;
        this.userId = user.uid;
      }
    });
  }

  signOutClicked(): void{
    this.auth.signOut();
  }
}
