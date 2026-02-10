import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly flowbiteService = inject(FlowbiteService);

  isDropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.profile-dropdown');

    if (!clickedInside) {
      this.closeDropdown();
    }
  }
}
