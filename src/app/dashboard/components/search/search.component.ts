import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @ViewChild('dropdownButton') dropdownButton!: ElementRef;
  @ViewChild('dropdownContent') dropdownContent!: ElementRef;

  items: string[] = ['All', 'Brand', 'Price','Mileage'];
  filteredItems: string[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'All';

  ngOnInit() {

    this.filteredItems = this.items.filter(item => item !== this.selectedCategory);

  }
  filterItems() {
    this.filteredItems = this.items.filter(item =>
        item.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  menuItemClicked(item: string) {
    console.log('Clicked:', item);
    this.selectedCategory = item;
    this.filteredItems = this.items.filter(item => item !== this.selectedCategory);
  }
}
