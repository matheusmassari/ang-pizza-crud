import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pizzaArray: any = [];

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

  openDialog(): void {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllPizzas();
        }
      });
  }

  editPizza(info: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: info,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllPizzas();
        }
      });
  }

  deletePizza(id: number) {
    this.api.delete(id).subscribe({
      next: () => {
        alert('Pizza deletada com sucesso.');
        this.getAllPizzas();
      },
      error: () => alert('Houve algum erro ao deletar pizzas.'),
    });
  }
}
