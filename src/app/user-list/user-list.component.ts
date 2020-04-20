import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-list',
  template: `
    <h2>Welcome to User List</h2>

    <div>
      <ul>
        <li (click)="onSelect(user)" *ngFor="let user of users" [class.selected]="isSelected(user)" style="cursor: pointer;">
          {{user.id}} -> {{user.name}}
        </li>

  `,
  styles: [`
    .selected {
      color: blue;
    }
  `]
})
export class UserListComponent implements OnInit {

  public selectedId;
  users = [
    {id: 1, name: 'User ABC'},
    {id: 2, name: 'User DEF'},
    {id: 3, name: 'User GHI'},
    {id: 4, name: 'User JKL'},
    {id: 5, name: 'User MNO'}
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.selectedId = id;
    })

  }

  onSelect(user){
    
    // ----- Absolute Navigation
    this.router.navigate(['/users', user.id]);

    // ----- Relative Navigation
    this.router.navigate([user.id], {relativeTo: this.route});

  }

  isSelected(user){
    return user.id === this.selectedId;
  }

}
