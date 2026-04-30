import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../models/products';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon} from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button'

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [ MatIconButton, MatIcon,],
  template: `
    <!-- Bouton ajouté a la liste de souhaits -->
    <button class="!bg-white shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg"
    [class]= "isInWishlist() ? '!text-red-500' : '!text-gray-400'"
    matIconButton 
    (click)="toggleWishlist(product())"
    >
      <mat-icon>{{isInWishlist () ? 'favorite' : 'favorite_border'}}</mat-icon>
    </button>
  `,
  styles: ``,
})
export class ToggleWishlistButton {

  // Réception des produits
  product = input.required<Product>();

  // Injection du store dans le composant
  store = inject(EcommerceStore);

  // Vérifie si le produit est déja présent dans la liste de souhaits
  isInWishlist = computed(()=> this.store.wishlistItems().find(p => p.id === this.product().id))

  // Alterne l'ajout ou la suppression du produit dans la liste de souhaits
  toggleWishlist(product: Product){
    if (this.isInWishlist()){
      this.store.removeFromWishlist(product);
    } else {
      this.store.addToWishlist(product);
    }
  }
}
