import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/products';
import { ProductCard } from "../../components/product-card/product-card";
import {MatSidenavContainer, MatSidenavContent, MatSidenav} from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-products-grid',
  imports: [
              ProductCard,
              MatSidenavContainer,
              MatSidenavContent,
              MatSidenav,
              MatNavList,
              MatListItem, 
              MatListItemTitle,
              RouterLink,
              TitleCasePipe,
          ],
  template: `

<!-- Section SideBar -->
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Catégories</h2>

          <!-- Section qui liste les différente catégories -->
          <mat-nav-list>
            @for (cat of categories(); track cat){
              <mat-list-item [activated]="cat === category()" class="my-2" [routerLink]="['/products', cat]">
                <span matListItemTitle class="font-medium" [class]="cat === category() ?  '!text-white': null">
                  {{cat| titlecase}}
                </span>
              </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>

      <!-- Section grille avec produit filtrée -->
      <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">{{category() | titlecase}}</h1>
        <p class="text-base text-gray-600 mb-6">
          {{ store.filteredProducts().length }} products found
        </p>
        <div class="responsive-grid ">
          @for (product of store.filteredProducts(); track product.id) {
            <app-product-card [product]="product"/>
          }
        </div>
      </mat-sidenav-content>

    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  // Input réactif sur la categorie sélectionné
  category = input<string>('all');

  // injection du store contenant l'état global les méthode liées au produits
  store = inject(EcommerceStore);

  // Liste des catégories disponibles
  categories = signal<string[]>(['all', 'layer cake','classiques', 'douceurs fondantes','coffrets gourmands']);

  // Synchronise la categorie locale avec l'état globale du store
  constructor(){
    this.store.setCategory(this.category);
  }
}
