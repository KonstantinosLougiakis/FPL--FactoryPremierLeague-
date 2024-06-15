import { Component } from '@angular/core';
import { PersonTableComponent } from './components/person-table/person-table.component';
import { Person } from './shared/interfaces/person';

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

  users: Person[] = [
    {
      givenName: 'Konstantinos',
      surName: 'Lougiakis',
      age: 27,
      email: 'lougiokostas@gmail.com'
    },
    {
      givenName: 'Nikos',
      surName: 'Papadopoulos',
      age: 43,
      email: 'papanikos@gmail.com'
    },
    {
      givenName: 'Giannis',
      surName: 'Papagiannis',
      age: 31,
      email: 'papagiannis@gmail.com'
    },
    {
      givenName: 'Marios',
      surName: 'Kostakis',
      age: 19,
      email: 'kostakos@gmail.com'
    },
    {
      givenName: 'Georgia',
      surName: 'Botsi',
      age: 24,
      email: 'geobo@gmail.com'
    },
    {
      givenName: 'Michalis',
      surName: 'Stergiou',
      age: 45,
      email: 'stema@gmail.com'
    },
    {
      givenName: 'Eleni',
      surName: 'Katsouli',
      age: 26,
      email: 'katsou@gmail.com'
    },
    {
      givenName: 'Vasilis',
      surName: 'Dimitriou',
      age: 57,
      email: 'dimval@gmail.com'
    },
    {
      givenName: 'Kostas',
      surName: 'Papadogiannis',
      age: 26,
      email: 'papakostas@gmail.com'
    }
  ];
}