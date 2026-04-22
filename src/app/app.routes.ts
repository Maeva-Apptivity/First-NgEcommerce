import { Routes } from '@angular/router';

export const routes: Routes = [

    // route par defaut menant a la liste de produit
    {
        path: '',
        pathMatch:'full',
        redirectTo:'products'
    },

    // route vers la liste de produits
    {
        path : 'products',
        loadComponent: () => import('./pages/products-grid/products-grid'),
    },
    // route vers la wishlist
    {
        path : 'wishlist',
        loadComponent: () => import('./pages/my-wishlist/my-wishlist'),
    }
];
