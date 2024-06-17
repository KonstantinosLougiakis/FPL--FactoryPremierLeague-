import { Component } from '@angular/core';
import { Person } from 'src/app/shared/interfaces/person';
import { PersonTableComponent } from "../person-table/person-table.component";

@Component({
    selector: 'app-component-input',
    standalone: true,
    templateUrl: './component-input.component.html',
    styleUrl: './component-input.component.css',
    imports: [PersonTableComponent]
})
export class ComponentInputComponent {
  person0: Person = {
    givenName: 'Konstantinos',
    surName: 'Lougiakis',
    age: 27,
    email: 'lougiokostas@gmail.com'
  };

  person1: Person = {
    givenName: 'Nikos',
    surName: 'Papadopoulos',
    age: 34,
    email: 'papanikos@gmail.com'
  };
}
