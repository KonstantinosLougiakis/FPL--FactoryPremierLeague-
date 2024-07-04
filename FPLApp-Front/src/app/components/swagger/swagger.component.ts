import { Component, OnInit } from '@angular/core';
import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'app-swagger',
  standalone: true,
  imports: [],
  templateUrl: './swagger.component.html',
  styleUrl: './swagger.component.css'
})
export class SwaggerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      SwaggerUI({
        dom_id: '#swagger-ui',
        url: 'http://127.0.0.1:8000/swagger/',
      });
  }
}