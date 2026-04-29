import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/products';
import { CurrencyPipe } from '@angular/common';
import { MatAnchor, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../ecommerce-store';


@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, MatAnchor, MatIcon, MatIconButton],
  template: `

  <!-- Section image -->
    <div class="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
      <img [src]="product().imageUrl" class="w-full h-[300px] object-cover rounded-t-xl">
    
      <!-- Bouton favoris -->
      <button class="!absolute z-10 top-3 right-3 w-10 h-10 rounded-full !bg-white border-0 shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg"
      [class]= "isInWishlist() ? '!text-red-500' : '!text-gray-400'"
      matIconButton 
      (click)="toggleWishlist(product())">
        <mat-icon>{{isInWishlist () ? 'favorite' : 'favorite_border'}}</mat-icon>
      </button>

      <!-- Section information du produit -->
      <div class="p-5 flex flex-col flex-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
          {{ product().name }}
        </h3>
        <p class="text-sm text-gray-600 mb-4 flex-1 leading-relaxed">
          {{ product().description }}
        </p>

        <!-- add rating component -->

        <!-- Section inventaire  -->
        <div class="text-sm font-medium mb-4">
          {{ product().inStock ? 'In Stock' : 'Out of Stock'}}
        </div>

        <!-- Section prix et ajout panier -->
        <div class="flex items-center justify-between mt-auto">
          <span class="text-2xl font-bold text-gray-900">
            {{ product().price | currency }}
            <button matButton="filled" class="flex items-center gap-2" (click)="addToCartClicked.emit(product())">
              <mat-icon>shopping_cart</mat-icon>
              Add to cart 
            </button>
          </span>
        </div>

      </div>
    </div>
  `,
  styles: ``,
})
export class ProductCard {

  // Réception du tableau product
  product = input.required<Product>();

  // Emet un 'événement pour l'ajout du produit dans le panier
  addToCartClicked = output<Product>();

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
