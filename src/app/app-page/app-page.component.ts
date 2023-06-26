import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.css']
})
export class AppPageComponent {
  public isLargeScreen$: Observable<boolean>;


  constructor(private breakpointObserver: BreakpointObserver){
    this.isLargeScreen$ = this.breakpointObserver
      .observe('(min-width: 850px)')
      .pipe(map((result: { matches: any; }) => result.matches)
    );
  }
}
