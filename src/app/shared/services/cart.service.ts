import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CartItem } from "../module/cart-item.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient) {}
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>("../../../assets/data/cartItemData.json");
  }
}
