import { Component, Inject, Injectable, Input } from '@angular/core';
import { Subject, delay, take, timer } from 'rxjs';

@Component({
  selector: 'alert-success',
  template: `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1000">
  <div
    id="liveToast"
    class="toast show"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-header bg-success text-white">
      <strong class="me-auto">Success</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close text-white"
      ></button>
    </div>
    <div class="toast-body"  style="opacity:0.8;">{{message}}.</div>
  </div>
</div>`,
  styleUrl: './alerts.sass',
})
class AlertSuccessComponent {
  @Input() message = '';
  constructor() {
    delay(1000);
  }
}

@Component({
  selector: 'alert-error',
  template: `
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1000">
      <div
        id="liveToast"
        class="toast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header bg-danger text-white">
          <strong class="me-auto">Error</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close text-white"
          ></button>
        </div>
        <div class="toast-body " style="opacity:0.8;">{{message}}.</div>
      </div>
    </div>
  `,
  styleUrl: './alerts.sass',
})
class AlertErrorComponent {
  @Input() message = '';

  constructor() {
    delay(1000);
  }
}

@Component({
  selector: 'alert-warning',
  template: `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1000">
  <div
    id="liveToast"
    class="toast show"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-header bg-info text-white">
      <strong class="me-auto">Info</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close text-white"
      ></button>
    </div>
    <div class="toast-body" style="opacity:0.8;">{{message}}.</div>
  </div>
</div>`,
  styleUrl: './alerts.sass',
})
class AlertWarningComponent {
  @Input() message = '';
  constructor() {
    delay(500);
  }
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  alertSubject = new Subject<any>();

  success(alert: string) {
    this.alertSubject.next({
      component: AlertSuccessComponent,
      message: { message: alert },
    });
    this.scheduleAlertDispose();
  }
  warn(alert: string) {
    this.alertSubject.next({
      component: AlertWarningComponent,
      message: { message: alert },
    });
    this.scheduleAlertDispose();
  }
  error(alert: string) {
    this.alertSubject.next({
      component: AlertErrorComponent,
      message: { message: alert },
    });
    this.scheduleAlertDispose();
  }
  private scheduleAlertDispose() {
    timer(2000).pipe(take(1)).subscribe(() => {
      this.clearAlert();
    });
  }

  clearAlert() {
    this.alertSubject.next(null); // Emit null or a special value to clear the alert
  }
}
