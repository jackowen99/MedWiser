import {Component, OnInit} from '@angular/core';
import {StoreService} from '../services/store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    public storeService: StoreService,
    private router: Router
  ) {
      // this.storeService.getNotesForUser();

  }

  ngOnInit() {
    if (!sessionStorage.getItem("username")) {
      return this.router.navigate(['/'])
    } else {
      this.storeService.getNotesForUser();
    }

  }

  logOut() {
    sessionStorage.removeItem('username');
    this.router.navigate(['login']);
  }

}
