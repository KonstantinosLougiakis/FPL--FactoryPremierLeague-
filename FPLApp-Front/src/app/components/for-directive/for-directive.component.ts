import { Component } from '@angular/core';
import { Person } from 'src/app/shared/interfaces/person';
import { PersonTableComponent } from "../person-table/person-table.component";

@Component({
    selector: 'app-for-directive',
    standalone: true,
    templateUrl: './for-directive.component.html',
    styleUrl: './for-directive.component.css',
    imports: [PersonTableComponent]
})
export class ForDirectiveComponent {
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
