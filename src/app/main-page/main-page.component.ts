import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images: Image[] = [];

  addImage(image: Image): void {
    this.images.push(image);
  }

  deleteImage(image: Image): void {
    this.images = this.images.filter(i => i !== image);
  }

  // Add more methods as needed
}












interface Image {
  src: string;
  alt: string;
  selected: boolean;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  constructor(private router: Router) { }

  images: Image[] = [];
  selectedImage: Image | null = null;
  isEditing: boolean = false;
  croppedImage: string | null = null;
  sidebarVisible1: boolean = true;
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.images.push({ src: reader.result as string, alt: 'New Image', selected: false });
      };
      reader.readAsDataURL(file);
    }
  }

  deleteSelectedImages(): void {
    this.images = this.images.filter(image => !image.selected);
  }
  toggleImageSelection(image: Image): void {
    image.selected = !image.selected;
  }
  downloadImage(image: Image): void {
    const link = document.createElement('a');
    link.href = image.src; // Set the image URL as the download link
    link.download = 'image.png'; // Set the default download filename (you can customize this if needed)
    link.click(); // Programmatically trigger the download
  }
  editImage(imageSrc: string): void {
    this.router.navigate(['/custom', { src: imageSrc }]);
  }







}
