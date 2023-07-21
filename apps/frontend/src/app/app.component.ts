import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'fullstack-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    console.log(
      `App running in ${
        environment.production ? 'production' : 'development'
      } environment.`
    );
  }
}
