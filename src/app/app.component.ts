import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pizzaArray = [];

  constructor(private dialog: MatDialog, private api: ApiService) {}
  ngOnInit(): void {
    this.getAllPizzas();
  }

  getAllPizzas() {
    this.api.getAll().subscribe({
      next: (res) => {
        this.pizzaArray = res;        
      },
      error: () => alert('Erro ao buscar lista de pizzas'),
    });
  }
}
