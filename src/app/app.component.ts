import { Formulario } from '../app/interfas/formulario';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /* la variable para el formulario y poder utilizarlo en html */
  form!:FormGroup;
  /* la variable para llamr la interfas y poder editar*/
  interfaces?: Formulario;
  /* la variable como boliano para poer editar */
  isEdit: boolean = false;

  /* esta variable es para utilizarla en el html */
  isState=true
  persona:any[] =[]

constructor(
  private formBuilder: FormBuilder
)
/* para el ingreso de los formulario y las validaciones */
{
  this.form=formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido:['', [Validators.required, Validators.maxLength(50)]],
    cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]],
    direccion: ['', [Validators.required, Validators.maxLength(50)]],
  })
}



 /* este es el metodo guardar */
storeGuardar(){
  if (!this.form.valid) {
    this.form.markAllAsTouched();
    return;
  }
  
  if(this.form.valid){
    let newdata: Formulario = {
      id: -1,
      nombre:this.form.value.nombre,
      apellido:this.form.value.apellido,
      cedula:this.form.value.cedula,
      email:this.form.value.email,
      password:this.form.value.password,
      telefono:this.form.value.telefono,
      direccion:this.form.value.direccion,
    };

    if (!this.interfaces) {
      newdata.id = (this.persona.at(-1)?.id ?? this.persona.length) + 1;
      this.persona.push(newdata);
    } else {
      newdata.id = this.interfaces.id;
      let oldUserIndex = this.persona.indexOf(this.interfaces);
      this.persona.splice(oldUserIndex, 1, newdata);

      this.isEdit = false;
      this.interfaces = undefined;
    }

    this.form.reset();
  }
}

/* este es el metodo de eliminar */
deleteEliminar(id: number) {
  const index = this.persona.findIndex(p => p.id === id);
  if (index >= 0) {
      this.persona.splice(index, 1);
    }
}
 



/* este es el metodo de editar */
editEditar(id: number) {
  if (this.interfaces?.id === id) {
    this.isEdit = false;
    this.interfaces = undefined;
/*     this.Form.reset(); */
this.form.reset();
    return;
  }

  this.isEdit = true;
  this.interfaces = this.persona.find((u) => u.id === id);
  if (!this.interfaces) return;

  this.form.setValue({
    nombre:this.interfaces.nombre,
    apellido:this.interfaces.apellido,
    cedula:this.interfaces.cedula,
    email:this.interfaces.email,
    password:this.interfaces.password,
    telefono:this.interfaces.telefono,
    direccion:this.interfaces.direccion,
  });
}
 
}


