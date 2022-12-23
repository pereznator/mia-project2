import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];
	
  showSuccess(textOrTpl: string | TemplateRef<any>) {
		this.toasts.push({ textOrTpl,  classname: "bg-success text-light", delay: 3000 });
	}
  
  showError(textOrTpl: string | TemplateRef<any>) {
		this.toasts.push({ textOrTpl,  classname: 'bg-danger text-light', delay: 3000 });
	}

	remove(toast) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}
