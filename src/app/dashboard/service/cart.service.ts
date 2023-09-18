import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    cartItemCount$: Observable<number> = this.cartItemCountSubject.asObservable();

    getCartItemCount(): number {
        return this.cartItemCountSubject.value;
    }

    incrementCartItemCount(): void {
        const currentCount = this.cartItemCountSubject.value;
        this.cartItemCountSubject.next(currentCount + 1);
    }
}