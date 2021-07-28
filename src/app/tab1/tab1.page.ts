import { Component, Injectable, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicesService } from '../services.service';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  public listaUsuarios: any =[]
  constructor(private ServicesService: ServicesService,public alertController: AlertController) {}
  ngOnInit(): void {
    this.Get_User()
  }

  ionViewDidEnter(){
    this.Get_User()
  }
  public Get_User(){
    const respuesta = this.ServicesService.Get_Usuarios(`https://protected-woodland-45407.herokuapp.com/Usuarios`)
    .subscribe(respuesta => {
      var resp: any = respuesta;
      if (resp.exito){
        this.listaUsuarios = resp.data
      }
    },(error) => {
      console.log("----------")
      console.log(error.message);
      this.presentAlert('Alerta','Error',error.message)
     })
  }

  public Eliminar_Usuario(id : string){
    const respuesta = this.ServicesService.Delete_Usuarios(id)
    .subscribe(respuesta => {
      var resp: any = respuesta;
      if (resp.exito){
        this.listaUsuarios = resp.data
        this.Get_User()
        this.presentAlert('Mensaje','EXITO',`!Se elimino el usuario ${id}!`)

      }
    },(error) => {
      console.log()
      console.log(error.message);
      this.presentAlert('Alerta','Error',error.error)
     })
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
    console.log('onDidDismiss resolved with role', role);
  }

}
