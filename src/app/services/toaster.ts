import { inject, Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class Toaster {

  // Injection du service de HotToast pour la gestion des notifications
  toaster = inject(HotToastService);

  // Affichage d'une notification de succès ou d'érreur
  success(message: string){
    this.toaster.success(message)
  }
  error(message: string){
    this.toaster.error(message)
  }
}
