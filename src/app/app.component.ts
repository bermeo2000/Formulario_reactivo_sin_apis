
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Formulario } from '../app/interfaces/formulario';
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
  /* array */
  persona:any[] =[]

constructor(
  private formBuilder: FormBuilder
)
/* para el mostrar  los formulario y las validaciones */
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
  /*es  para verificar si un formulario es válido o no es*/
  if (!this.form.valid) {
    /* "markAllAsTouched()" se utiliza para marcar todos los campos del formulario  */
    this.form.markAllAsTouched();
    return;
  }
  
   /*es  para verificar si un formulario es válido o no es*/
  if(this.form.valid){
    /* El objeto "newdata" se declara de tipo "Formulario definida en la interfaz */
    let newdata: Formulario = {
      /* significa que cada propiedad del objeto es lo que  enviando al formulario. */
      id: -1,
      nombre:this.form.value.nombre,
      apellido:this.form.value.apellido,
      cedula:this.form.value.cedula,
      email:this.form.value.email,
      password:this.form.value.password,
      telefono:this.form.value.telefono,
      direccion:this.form.value.direccion,
    };
/* Se utiliza para verificar si la variable "interfaces" es falsa */
    if (!this.interfaces) {
      /*se utiliza para obtener el número total de elementos en la lista de personas. */
      newdata.id = (this.persona.at(-1)?.id ?? this.persona.length) + 1;
      /* para agregar un nuevo objeto a la lista "persona". */
      this.persona.push(newdata);
    } else {
      /* 
      se utiliza para asignar el valor de la propiedad "id"
       del objeto de cuando se esta editando */
      newdata.id = this.interfaces.id;
      /* para buscar el índice de ese objeto persona y almacenarlo en la variable "oldUserIndex". */
      let oldUserIndex = this.persona.indexOf(this.interfaces);
      /* se utiliza para eliminar el objeto existente en "persona" y agregar el nuevo objeto "oldUserIndex" */
      this.persona.splice(oldUserIndex, 1, newdata);

      this.isEdit = false;
      this.interfaces = undefined;
    }
   /* para vaciar */
    this.form.reset();
  }
}

/* este es el metodo de eliminar */
deleteEliminar(id: number) {
  /* se utiliza para encontrar el índice en la lista "persona" */
  const index = this.persona.findIndex(p => p.id === id);
  /* si tiene un valor mayor o igual a cero. */
  if (index >= 0) {
    /* se utiliza para eliminar un elemento del array "persona" en la posición "index". */
      this.persona.splice(index, 1);
    }
}
 



/* este es el metodo de editar */
editEditar(id: number) {
  /* se verificar si la propiedad "id" del objeto "interfaces" es igual a la variable "id". */
  if (this.interfaces?.id === id) {
    this.isEdit = false;
    this.interfaces = undefined;
/*     this.Form.reset(); */
this.form.reset();
    return;
  }

  this.isEdit = true;
    /* se utiliza para encontrar el índice en la lista "persona" */
  this.interfaces = this.persona.find((q) => q.id === id);
  /* Se utiliza para verificar si la variable "interfaces" es falsa */
  if (!this.interfaces)
   return;
/* se utiliza para establecer los valores de un formulario */
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


