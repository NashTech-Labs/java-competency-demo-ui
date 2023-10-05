import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItemCountSubject: BehaviorSubject<number>;
    cartItemCount$: Observable<number>;

    constructor() {
        const initialCount = parseInt(localStorage.getItem('cartCount') || '0', 10);
        this.cartItemCountSubject = new BehaviorSubject<number>(initialCount);
        this.cartItemCount$ = this.cartItemCountSubject.asObservable();
    }

    getCartItemCount(): number {
        return this.cartItemCountSubject.value;
    }

    incrementCartItemCount(): void {
        const currentCount = this.cartItemCountSubject.value;
        this.cartItemCountSubject.next(currentCount + 1);
        localStorage.setItem('cartCount', (currentCount + 1).toString());
    }
}