import { NgModule } from '@angular/core';
import { PhotoDetailComponent } from './photo-detail.component';
import { CommonModule } from '@angular/common';
import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentsComponent } from './photo-commments/photo-comments.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { PhotoOwnerOnlyDirective } from './photo-owner-only/photo-owner-only.directive';

@NgModule({
  declarations: [PhotoDetailComponent, PhotoCommentsComponent, PhotoOwnerOnlyDirective],
  exports: [PhotoDetailComponent, PhotoCommentsComponent],
  imports: [CommonModule, PhotoModule, RouterModule, ReactiveFormsModule, VMessageModule],
})
export class PhotoDetailModule {}
