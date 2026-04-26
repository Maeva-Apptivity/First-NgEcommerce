import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../models/products';
import { ProductCard } from "../../components/product-card/product-card";
import {MatSidenavContainer, MatSidenavContent, MatSidenav} from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

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
          {{ filteredProducts().length }} products found
        </p>
        <div class="responsive-grid ">
          @for (product of filteredProducts(); track product.id) {
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
  // Signal contenant la liste des produits
  products = signal<Product[]>([
    {
    "id": "lc-001",
    "name": "Layer Cake Tropical",
    "description": "Multi-couches mangue et passion avec fleurs comestibles en décoration.",
    "price": 62.0,
    "imageUrl": "https://images.unsplash.com/photo-1464347744102-11db6282f854?auto=format&fit=crop&q=80&w=800",
    "rating": 4.8,
    "reviewCount": 15,
    "inStock": false,
    "category": "layer cake"
    },
    {
    "id": "LC-002",
    "name": "Le Royal Chocolat Gold",
    "description": "Génoise cacao intense, ganache montée chocolat noir 70% et éclats de noisettes caramélisées.",
    "price": 75,
    "imageUrl": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    "rating": 4.8,
    "reviewCount": 31,
    "inStock": true,
    "category": "layer cake"
    },
    {
    "id": "CP-001",
    "name": "Le Fraisier d'Antan",
    "description": "Le grand classique : crème diplomate onctueuse, biscuit génoise et fraises gariguettes.",
    "price": 28,
    "imageUrl": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800",
    "rating": 4.7,
    "reviewCount": 56,
    "inStock": true,
    "category": "classiques"
    },
    {
    "id": "CP-002",
    "name": "Le Mont-Blanc Ardéchois",
    "description": "Cœur meringue craquant, chantilly légère et vermicelles de crème de marrons de l'Ardèche.",
    "price": 38,
    "imageUrl": "https://images.unsplash.com/photo-1505976378723-9726b54e9bb9?w=800",
    "rating": 4.6,
    "reviewCount": 18,
    "inStock": true,
    "category": "classiques"
    },
    {
    "id": "DF-001",
    "name": "Cheesecake New York Style",
    "description": "Texture crémeuse incomparable sur un sablé croustillant au beurre, servi avec un coulis de fruits rouges.",
    "price": 32,
    "imageUrl": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800",
    "rating": 4.9,
    "reviewCount": 89,
    "inStock": true,
    "category": "douceurs fondantes"
    },
    {
    "id": "DF-002",
    "name": "Tiramisu Nuage Café",
    "description": "Biscuits imbibés au café Arabica, mascarpone aérien et cacao amer.",
    "price": 7,
    "imageUrl": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800",
    "rating": 4.8,
    "reviewCount": 64,
    "inStock": false,
    "category": "douceurs fondantes"
    },
    {
    "id": "CG-001",
    "name": "L'Écrin de Cupcakes",
    "description": "Un assortiment de nos meilleurs parfums : Vanille, Chocolat, Framboise et Caramel beurre salé.",
    "price": 24,
    "imageUrl": "https://images.unsplash.com/photo-1519869325930-281384150729?w=800",
    "rating": 4.9,
    "reviewCount": 120,
    "inStock": true,
    "category": "coffrets gourmands"
    },
    {
    "id": "CG-002",
    "name": "Muffins Cœur Coulant",
    "description": "Muffins généreux avec un cœur fondant au chocolat ou à la pistache.",
    "price": 14,
    "imageUrl": "https://images.unsplash.com/photo-1558303420-f814d8a590f5?w=800",
    "rating": 4.5,
    "reviewCount": 45,
    "inStock": true,
    "category": "coffrets gourmands"
    }
  ]);

  // Liste des produits filtrés selon la catégorie
  filteredProducts = computed(() => {

    if (this.category() === 'all') return this.products();
    
    return this.products().filter((p) => p.category === this.category().toLowerCase());

  });

  // Liste des catégories disponibles
  categories = signal<string[]>(['all', 'layer cake','classiques', 'douceurs fondantes','coffrets gourmands']);
}
