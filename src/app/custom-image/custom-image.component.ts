import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent, ImageTransform, base64ToFile } from 'ngx-image-cropper';
import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-custom-image',
  templateUrl: './custom-image.component.html',
  styleUrls: ['./custom-image.component.css']
})
export class CustomImageComponent implements OnInit {
  rotation = 0;
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
  img:string="";
  canvasRotation = 0;
  ratio: number=50;
  quality: number = 50;
  transform: ImageTransform = {};
  scale=1;


  constructor(private route: ActivatedRoute,private imageCompress: NgxImageCompressService)  { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.imageUrl = params['src'];
      this.galleryImageUrl = this.imageUrl;
    });
  }

  //crop
  toggleCropMode() {
    this.inCropMode = !this.inCropMode;
    if (this.inZoomMode =true) 
      this.inZoomMode = !this.inZoomMode;
    if (this.inCompressMode =true) 
      this.inCompressMode = !this.inCompressMode;
  }

  onFileChange(event: any): void {
    this.imgChangeEvt = event;
  }
  
  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;     
    }

    rotateLeft() {
      this.canvasRotation--;
      this.flipAfterRotate();
    }
  
    rotateRight() {
      this.canvasRotation++;
      this.flipAfterRotate();
    }

    private flipAfterRotate() {
      const flippedH = this.transform.flipH;
      const flippedV = this.transform.flipV;
      this.transform = {
        ...this.transform,
        flipH: flippedV,
        flipV: flippedH,
      };
    }
  
    flipHorizontal() {
      this.transform = {
        ...this.transform,
        flipH: !this.transform.flipH,
      };
    }
  
    flipVertical() {
      this.transform = {
        ...this.transform,
        flipV: !this.transform.flipV,
      };
    }
  
    resetImage() {
      this.scale = 1;
      this.rotation = 0;
      this.canvasRotation = 0;
      this.transform = {};
    }

    updateRotation() {
      this.transform = {
        ...this.transform,
        rotate: this.rotation,
      };
    }
  

    imgLoad (){}

    initCropper() {}

    imgFailed () {}
   

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
