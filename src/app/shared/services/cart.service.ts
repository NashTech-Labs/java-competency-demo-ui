import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CartItem } from "../module/cart-item.model";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItemCountSubject: BehaviorSubject<number>;
  cartItemCount$: Observable<number>;
  private getCartItemUrl: string = "http://localhost:9094/cart/get";

  constructor(private httpClient: HttpClient) {
    const initialCount = parseInt(localStorage.getItem("cartCount") || "0", 10);
    this.cartItemCountSubject = new BehaviorSubject<number>(initialCount);
    this.cartItemCount$ = this.cartItemCountSubject.asObservable();
  }
  getCartItems(): Observable<CartItem[]> {
    const url = `${this.getCartItemUrl}?userId=1652`;
    return this.httpClient.get<any[]>(url).pipe(
      map((response) => {
        if (response != null) {
          return response;
        } else {
          console.error("Failed to get cart items");
          return [];
        }
      }),
    );
  }

  incrementCartItemCount(): void {
    const currentCount = this.cartItemCountSubject.value;
    this.cartItemCountSubject.next(currentCount + 1);
    localStorage.setItem("cartCount", (currentCount + 1).toString());
  }
}
