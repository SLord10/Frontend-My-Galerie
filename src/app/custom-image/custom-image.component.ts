import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-custom-image',
  templateUrl: './custom-image.component.html',
  styleUrls: ['./custom-image.component.css']
})
export class CustomImageComponent implements OnInit {
  
  imageUrl: string = '';
  galleryImageUrl: string = ''; 
  imgChangeEvt: any ='';
  cropImgPreview: any ='';
  inCropMode: boolean = false;
  myThumbnail=this.imageUrl;
  inZoomMode: boolean = false;
  imgResultBeforeCompression: string = this.imageUrl;
  imgResultAfterCompression: string = '';
  inCompressMode: boolean = false;
  constructor(private route: ActivatedRoute,private imageCompress: NgxImageCompressService)  { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.imageUrl = params['src'];
      this.galleryImageUrl = this.imageUrl;
    });
  }

  onFileChange(event: any): void {
    this.imgChangeEvt = event;
  }
  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.objectUrl; 
    }
    imgLoad (){}

    initCropper() {}

    imgFailed () {}
    toggleCropMode() {
      this.inCropMode = !this.inCropMode;
      if (this.inZoomMode=true) {
        this.inZoomMode = !this.inZoomMode;
      }
      

    }
    toggleZoomMode() {
      
      this.inZoomMode = !this.inZoomMode;
      if (this.inCropMode=true) {
        this.inCropMode = !this.inCropMode;
      }
      
    }
    compressFile() {
      
          this.imageCompress
              .compressFile(this.imageUrl, 1, 50, 50) // 50% ratio, 50% quality
              .then(compressedImage => {
                  this.imgResultAfterCompression = compressedImage;
                  console.log('Size in bytes after compression is now:', this.imageCompress.byteCount(compressedImage));
              });
      
  }
  }
