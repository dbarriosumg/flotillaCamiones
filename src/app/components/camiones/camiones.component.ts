import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/apis.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as _moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';

interface Estados {
value: string,
name: string
}

@Component({
  selector: 'app-camiones',
  templateUrl: './camiones.component.html',
  styleUrls: ['./camiones.component.css']
})
export class CamionesComponent implements OnInit {
 
displayedColumns: string[] = [ 'Marca','Año De Fabricación',  'Capacidad', 
'Fecha De Compra', 'Estado'];
isSearch: boolean = true;
loadingData: boolean = false;
estados: Estados[]= [
  {value: 'A', name : 'Activo'},
  {value: 'N', name : 'Inactivo'},
  {value: 'R', name : 'Arrendado'},
]
dataSource = new MatTableDataSource();
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
  ) {
    this.createForm()
  }

  camionesForm = new FormGroup({
    modelo: new FormControl([Validators.required]),
    anioFabricacion: new FormControl([Validators.required]),
    capacidad: new FormControl([Validators.required]),
    fechaCompra: new FormControl([Validators.required]),
    estado: new FormControl([Validators.required]),
    // NoplacaSearch: new FormControl(),
  });

  createForm() {
    this.camionesForm = this.formBuilder.group({
      // NoplacaSearch: '',
      // Noplaca: '',
      // marca: '',
      modelo: '',
      // numMotor: '',
      // numChasis: '',
      anioFabricacion: '',
      capacidad: '',
      fechaCompra: new Date(),
      // precio: '',
      estado: '',
    });
  }

  ngOnInit(): void {
    this.defaultValues()
  }

  saveConductores(){
    if(this.camionesForm.valid){
      let data = this.camionesForm.value
      const departureDate = _moment(data.fechaCompra).format('YYYY-MM-DD');
      let obj ={
        "id_Camion": 0,
        "marca_Modelo": data.modelo,
        "anio_Fabricacion": data.anioFabricacion,
        "capacidad_Carga": data.capacidad,
        "fecha_Compra": departureDate,
        "estado": data.estado
      }
      this.api.post('/api/Camion/InsertUser', obj).subscribe((res:any) => {
        if(res == 201){
          this.saveNotification()
          this.camionesForm.reset()
        }
      }, (error: HttpErrorResponse) => {
        this.saveNotificationError()
    })
    }else{
      this.camionesForm.markAllAsTouched()
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    if(event.tab.textLabel == 'Inventario')
    this.getCamiones()
  }

  getCamiones(){
    this.loadingData = true;
    this.api.get('/api/Camion/GetCamiones').subscribe((res: any)=>{
      if(res){
        this.dataSource.data = res
      }
        this.loadingData = false;
    },(error: HttpErrorResponse) => {
      this.saveNotificationError()
      this.loadingData = false;

  })
  }

  clearForm(){
    this.camionesForm.reset()
    this.camionesForm.get('fechaCompra')?.setValue(new Date())
  }

  saveNotification(){
    Swal.fire({
      title: '',
      text: '¡Información Ingresada Con Exito!',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }

  saveNotificationError(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: '¡Error al guardar, contacte al administrador!',
      confirmButtonText: 'Ok'
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  defaultValues(){
    this.camionesForm.get('estado')?.setValue('A')
  }

}
