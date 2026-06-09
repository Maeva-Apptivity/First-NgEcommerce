import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';
import { ShowCartItem } from "../show-cart-item/show-cart-item";
import { ViewPanel } from "../../directives/view-panel";

@Component({
  selector: 'app-list-cart-items',
  imports: [ShowCartItem, ViewPanel],
  template: `
 
    <div appViewPanel>  <!-- Application de la directive de mise en page ViewPanel -->
      <h2 class="text-2xl font-bold mb-4 ">Cart Items ({{store.cartCount()}})</h2>
      <div class="flex flex-col gap-6">
        @for (item of store.cartItems(); track item.product.id){
          <app-show-cart-item [item]="item"/>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class ListCartItems {
  // injection du store dans le composant
  store = inject(EcommerceStore)
}
