import { Component, input } from '@angular/core';
import { CartItem } from '../../models/cart';
import { CurrencyPipe } from '@angular/common';
import { QtySelector } from "../../components/qty-selector/qty-selector";

@Component({
  selector: 'app-show-cart-item',
  imports: [CurrencyPipe, QtySelector],
  template: `
    <div class="grid grid-cols-[3fr_1fr_1fr]">
      <div class="flex items-center gap-4">
        <img [src]="item().product.imageUrl" class="w-24 h-24 rounded-lg object-cover"/>
        <div>
          <div class="text-gray-900 text-lg font-semibold">{{item().product.name}}</div>
          <div class="text-gray-600 font-semibold">{{item().product.price | currency}}</div>
        </div>
      </div>
      <app-qty-selector [quantity]="item().quantity"/>
    </div>
  `,
  styles: ``,
})
export class ShowCartItem {
  // Reçoit l'article du panier depuis le composant parent
  item = input.required<CartItem>();
}
