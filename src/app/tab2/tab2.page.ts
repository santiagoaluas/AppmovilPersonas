import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicesService } from '../services.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  fechaactual: Date = new Date() 
  fechastring :string = new Date().toUTCString()
  urlPhoto: string = "https://cultura-sorda.org/wp-content/uploads/2015/02/Usuario-Vacio.png"
  usuario:any ={
    username:"",
    nombre:"",
    apellido:"",
    password:"",
    foto:this.urlPhoto,
    fechNacimiento: new Date(this.fechastring)
  }
  
  constructor(private ServicesService: ServicesService,
              public alertController: AlertController,
              public photoService: PhotoService,
              private router:Router) {}
  ngOnInit(): void {
  }

  public Grabar_Usuario(){
    if (!this.usuario.username.trim() && !this.usuario.nombre.trim() ){
      this.presentAlert('Alerta','Error','Los campos no pueden estar Vacios')
    }else{
      this.usuario.foto = this.urlPhoto
      console.log(JSON.stringify(this.usuario))
      
      const respuesta = this.ServicesService.Post_Usuarios(this.usuario)
        .subscribe(respuesta => {
          var resp: any = respuesta;
          
          if (resp.exito){
            const nu = this.presentAlert('Mensaje','EXITO','Se grabo con exito')
            this.vaciar ()
            console.log("-----------------------------> " + nu)
            //
          }
        },(error) => {
          console.log(error.message);
          this.presentAlert('Alerta','Error',error.message)
          this.vaciar();
         })
    }
  }

  vaciar (){
    this.usuario.username = ''
    this.usuario.nombre = ''
    this.usuario.apellido = ''
    this.usuario.password = ''
    this.urlPhoto = "https://cultura-sorda.org/wp-content/uploads/2015/02/Usuario-Vacio.png"
  }

  async presentAlert(cabecera : string, tipo: string, mensaje:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: cabecera,
      subHeader: tipo,
      message:mensaje,
      buttons: ['OK'],
      animated: true
      
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
   // window.location.assign('/tabs/tab2');
   this.router.navigate(['/tabs/tab1']);
    console.log('onDidDismiss resolved with role', role);
  }

  addPhotoToGallery= async () => {
    await this.photoService.addNewToGallery();
    // console.log("---------------")
    this.urlPhoto = this.photoService.photos[0].webviewPath
    // console.log(this.urlPhoto)

    this.photoService.photos = []
    //console.log(this.photoService.photo[0].webviewPath)
  };
}
