import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.createForm()
  }

  conductoresForm = new FormGroup({
    nombre: new FormControl(),
    apellido: new FormControl(),
    dpi: new FormControl(),
    direccion: new FormControl(),
    telefono: new FormControl(),
    correo: new FormControl(),
    licenciaNo: new FormControl(),
    fechaVencimiento: new FormControl(),
  });

  createForm() {
    this.conductoresForm = this.formBuilder.group({
      nombre: '',
      apellido: '',
      dpi: '',
      direccion: '',
      telefono: '',
      correo: '',
      licenciaNo: '',
      fechaVencimiento: new Date(),
    });
  }

  ngOnInit(): void {
  }

  

  

}
