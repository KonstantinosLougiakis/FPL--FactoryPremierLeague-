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
      givenName: 'Michalis',
      surName: 'Anastasakis',
      age: 43,
      email: 'mike@mail.com'
    },
    {
      givenName: 'Christodoulos',
      surName: 'Fragkoudakis',
      age: 50,
      email: 'fragkou@mail.com'
    },
    {
      givenName: 'Fotis',
      surName: 'Lougiakis',
      age: 56,
      email: 'fotisf1@hotmail.com'
    },
    {
      givenName: 'Kkkk',
      surName: 'Kkkk',
      age: 24,
      email: 'kkkk@mail.com'
    },
    {
      givenName: 'Nikoleta',
      surName: 'Nikolaou',
      age: 26,
      email: 'nicole@mail.com'
    },
    {
      givenName: 'Nikos',
      surName: 'Nikolaou',
      age: 26,
      email: 'nikos09@mail.com'
    },
    {
      givenName: 'Oooo',
      surName: 'Oooo',
      age: 29,
      email: 'oooo@mail.com'
    },
    {
      givenName: 'Vaggelis',
      surName: 'Tsougiannis',
      age: 45,
      email: 'tsoug@mail.com'
    }
  ];
}