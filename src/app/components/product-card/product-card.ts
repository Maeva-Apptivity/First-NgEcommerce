import { Component, computed, inject, input, output } from '@angular/core';
import { Product } from '../../models/products';
import { CurrencyPipe } from '@angular/common';
import { MatAnchor} from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, MatAnchor, MatIcon],
  template: `

  <!-- Section image -->
    <div class="relative bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
      <img [src]="product().imageUrl" class="w-full h-[300px] object-cover rounded-t-xl">

      <!-- Injection dynamique du bouton favoris  -->
      <ng-content/>

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
          </span>
            <button matButton="filled" class="flex items-center gap-2" (click)="store.addToCart(product())">
              <mat-icon>shopping_cart</mat-icon>
              Add to cart 
            </button>
        </div>

      </div>
    </div>
  `,
  styles: ``,
})
export class ProductCard {

  // Réception des produits
  product = input.required<Product>();
  store = inject(EcommerceStore);
}
