import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  pizzaForm!: FormGroup;
  actionBtn = 'Salvar';

  ngOnInit(): void {
    this.pizzaForm = this.formBuilder.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', Validators.required],
      ingredients: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Atualizar';
      this.pizzaForm.controls['name'].setValue(this.editData.name);
      this.pizzaForm.controls['imageUrl'].setValue(this.editData.imageUrl);
      this.pizzaForm.controls['ingredients'].setValue(
        this.editData.ingredients
      );
      this.pizzaForm.controls['price'].setValue(this.editData.price);
    }
  }

  addPizza() {
    if (this.pizzaForm.valid) {
      this.api.create(this.pizzaForm.value).subscribe({
        next: (res) => {
          alert('Pizza adicionada!');
          this.pizzaForm.reset();
          this.dialogRef.close('save');
        },
        error: () => alert('Houve um erro ao adicionar pizza :('),
      });
    }
  }

  updatePizza() {
    this.api.update(this.pizzaForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Pizza atualizada!');
        this.pizzaForm.reset();
        this.dialogRef.close('update');
      },
      error: () => alert('Erro ao atualizar pizza :('),
    });
  }
}
