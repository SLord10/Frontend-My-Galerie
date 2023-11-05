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

  ratio: number=50;
  quality: number = 50;

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
      if (this.inZoomMode =true) 
        this.inZoomMode = !this.inZoomMode;
      if (this.inCompressMode =true) 
        this.inCompressMode = !this.inCompressMode;
    }

    toggleZoomMode() {  
      this.inZoomMode = !this.inZoomMode;
      if (this.inCropMode =true)
        this.inCropMode = !this.inCropMode;
        
      if (this.inCompressMode=true) 
        this.inCompressMode = !this.inCompressMode;
    }
    compressFile() {
      
          this.imageCompress
              .compressFile(this.imageUrl, 1, this.ratio, this.quality) // 50% ratio, 50% quality
              .then(compressedImage => {
                  this.imgResultAfterCompression = compressedImage;
                  console.log('Size in bytes after compression is now:', this.imageCompress.byteCount(compressedImage));
              });    
  }

  toggleCompressMode(){
    this.inCompressMode = !this.inCompressMode;
    if (this.inZoomMode) 
      this.inZoomMode = !this.inZoomMode;
    if (this.inCropMode) 
      this.inCropMode = !this.inCropMode;
  }

  }
