import { Component } from '@angular/core';
import { PersonTableComponent } from './components/person-table/person-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FPL-App';
  name = 'Konstantinos';

  person0 = {
    givenName: 'Konstantinos',
    surName: 'Lougiakis',
    age: 27,
    email: 'lougiokostas@gmail.com'
  };

  person1 = {
    givenName: 'Nikos',
    surName: 'Papadopoulos',
    age: 34,
    email: 'papanikos@gmail.com'
  };
}