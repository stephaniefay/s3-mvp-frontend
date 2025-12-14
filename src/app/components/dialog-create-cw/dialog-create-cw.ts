import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputGroup} from 'primeng/inputgroup';
import {FloatLabel} from 'primeng/floatlabel';
import {Textarea} from 'primeng/textarea';
import { ToggleButton } from 'primeng/togglebutton';
import {UserService} from '../../services/user/user-service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-dialog-create-cw',
  imports: [
    ButtonDirective,
    ButtonLabel,
    InputText,
    ReactiveFormsModule,
    FormsModule,
    InputGroupAddon,
    InputGroup,
    FloatLabel,
    Textarea,
    ToggleButton
  ],
  templateUrl: './dialog-create-cw.html',
  styleUrl: './dialog-create-cw.css',
})
export class DialogCreateCw implements OnInit {

  name: string | undefined;
  description: string | undefined;
  cover: string | undefined;
  isPrivate: boolean = false;
  type: 'collection' | 'wishlist' = 'collection';

  constructor(private config: DynamicDialogConfig,
              private ref: DynamicDialogRef,
              private service: UserService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    if (this.config.data) {
      console.log(this.config.data);
      if(this.config.data['type'] == 'wishlist')
        this.type = 'wishlist';
    }
  }

  save() {
    if (this.name) {
      if (this.type == 'collection') {
        this.service.createUserCollection(this.name, this.description, this.isPrivate, this.cover).subscribe({
          next: value => {
            this.messageService.add({
              severity: 'success',
              summary: 'Collection ' + this.name + ' created successfully.'
            });
            this.dismiss();
          },
          error: error => {
            console.log(error);
            this.messageService.add({severity: 'error', summary: 'Something went wrong, please try again.'});
          }
        });
      } else if (this.type == 'wishlist') {
        this.service.createUserWishlist(this.name, this.description, this.isPrivate, this.cover).subscribe({
          next: value => {
            this.messageService.add({severity: 'success', summary: 'Wishlist ' + this.name + ' created successfully.'});
            this.dismiss();
          },
          error: error => {
            console.log(error);
            this.messageService.add({severity: 'error', summary: 'Something went wrong, please try again.'});
          }
        });
      }
    }
  }

  dismiss() {
    this.ref.close();
  }
}
