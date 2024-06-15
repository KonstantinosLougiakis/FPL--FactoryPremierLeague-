import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/player.service';
import { Person } from 'src/app/shared/interfaces/person';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css'
})
export class PlayerListComponent {
  persons: Person[] = [];

  constructor(private personService: PersonService) {}
    

  ngOnInit(): void {
    this.personService.getPersons().subscribe((persons) => {
      this.persons = persons;
    });
  }
}