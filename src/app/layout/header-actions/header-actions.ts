import { Component, inject } from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon'
import { RouterLink } from '@angular/router';
import {MatBadge} from '@angular/material/badge';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-header-actions',
  imports: [MatIcon, MatButton,MatIconButton, RouterLink, MatBadge],
  template: `

  <!--Bouton action du header  -->
    <div class="flex items-center gap-2">

      <!-- Bouton de navigation vers la liste de souhaits avec affichage du nombre d'articles -->
      <button matIconButton routerLink="/wishlist" 
      [matBadge]="store.wishlistCount()" 
      [matBadgeHidden]="store.wishlistCount() === 0"
      > 
        <mat-icon>favorite</mat-icon>
      </button>

      <button matIconButton>
        <mat-icon>shopping_cart</mat-icon>
      </button>

      <button matButton>Sign In</button>
      <button matButton="filled">Sign Up</button>
    </div>
  `,
  styles: ``,
})
export class HeaderActions {
  
  // Injection du store dans le composant
  store = inject(EcommerceStore);
}
