import { Component, inject } from '@angular/core';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-list-cart-items',
  imports: [],
  template: `
    <div class="border border-gray-200 rounded-xl p-6 bg-white">
      {{store.cartItems()}}
    </div>
  `,
  styles: ``,
})
export class ListCartItems {

  store = inject(EcommerceStore)
}
