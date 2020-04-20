import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  template: `
    <div>
      user-detail works!

      Currently Selected is - {{userId}}

      <p>
        <button (click)="showPersonalInfo()">Personal Info</button>
        <button (click)="showContactInfo()">Contact Info</button>
      </p>

      <router-outlet></router-outlet>
      <p>
        <button (click)="goPrevious()">Previous User</button>
        <button (click)="goNext()">Next User</button>
        <button (click)="goToUsers()">Go Back</button>
      </p>
      
    </div>
  `,
  styles: [
  ]
})
export class UserDetailComponent implements OnInit {

  public userId;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // let id = parseInt(this.route.snapshot.paramMap.get('id'));
    // this.userId = id;

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = parseInt(params.get('id'));
      this.userId = id;
    });

  }

  goPrevious(){
    const previousId = this.userId - 1;

    // ---- Absolute Navigation
    this.router.navigate(['/users', previousId]);
  }

  goNext(){
    const nextId = this.userId + 1;

    // ---- Absolute Navigation
    this.router.navigate(['/users', nextId]);
  }

  goToUsers(){
    // Optional Route Parameters
    const selectedId = this.userId ? this.userId : null;

    // ---- Absolute Navigation
    // this.router.navigate(['/users', {id: selectedId}]);

    // ---- Relative Navigation
    this.router.navigate(['../', {id: selectedId}], {relativeTo: this.route});
  }

  showPersonalInfo(){
    this.router.navigate(['personal'], {relativeTo: this.route});
  }

  showContactInfo(){
    this.router.navigate(['contact'], {relativeTo: this.route});
  }

}
