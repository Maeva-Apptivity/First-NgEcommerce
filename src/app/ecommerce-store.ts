import { computed, inject } from "@angular/core";
import { Product } from "./models/products"
import { 
    patchState,
    signalMethod,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import {produce} from "immer";
import { Toaster } from "./services/toaster";

export type EcommerceState = {
    products : Product[];
    category : string;
    wishlistItems : Product[];
}

export const EcommerceStore = signalStore(

    // Rend le store accessible dans l'ensemble de l'application
    {
        providedIn : 'root'
    },

    withState({
        products : [
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
        ],
        category : 'all',
        wishlistItems : [],
    } as EcommerceState),

    withComputed(({category, products, wishlistItems}) => ({

        // Liste les produits filtrés en fonction de la catégorie sélectionnée
        filteredProducts : computed(() => {
            if (category() === 'all') return products();
            return products().filter((p) => p.category === category().toLowerCase());
        }),
        wishlistCount: computed(()=> wishlistItems().length),
    })),

    // Action réactive pour mettre à jour l'état de la catégorie
    withMethods((store, toaster = inject(Toaster))=>({
        setCategory : signalMethod<string>((category: string) => {
            patchState(store,{category});
        }),

        // Ajoute un produit a la liste de souhaits 
        addToWishlist : (product : Product) => {
            const updatedWishlistItems = produce(store.wishlistItems(),(draft)=>{
                if (!draft.find(p => p.id === product.id)){
                    draft.push(product);
                }
            });
            // Met a jour l'état de la liste de souhaits dans le store
            patchState(store,{ wishlistItems : updatedWishlistItems })
            // Affiche la notification de succès
            toaster.success("Product added to wishlist");
        },
        // Retrait du produit de la liste de souhaits et  met a jour l'état
        removeFromWishlist: (product : Product)=> {
            patchState(store,{
                wishlistItems: store.wishlistItems().filter((p)=> p.id !== product.id),
            });
            toaster.success('Product removed from wishlist');
        },
        clearWishlist: () => {
            patchState(store, {wishlistItems: []});
        }
    }))

);