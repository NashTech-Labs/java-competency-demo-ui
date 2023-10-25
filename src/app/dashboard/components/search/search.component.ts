import {Component, ElementRef, ViewChild} from '@angular/core';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild('dropdownButton') dropdownButton!: ElementRef;

  @ViewChild('dropdownContent') dropdownContent!: ElementRef;



  items: string[] = ['CarId', 'Mileage', 'Price', 'Colour'];

  filteredItems: string[] = [];

  searchTerm: string = '';



  ngOnInit() {

    this.filteredItems = this.items;

  }



  filterItems() {

    this.filteredItems = this.items.filter(item =>

        item.toLowerCase().includes(this.searchTerm.toLowerCase())

    );

  }



  menuItemClicked(item: string) {

    console.log('Clicked:', item);

  }


}
