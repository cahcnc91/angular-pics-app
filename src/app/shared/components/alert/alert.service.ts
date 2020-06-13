import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert';
import { Router, NavigationStart } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AlertService {
    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepafterRoutechange = false;

    constructor(private router: Router){
        this.router.events.subscribe(event => {
            if(event instanceof NavigationStart){
                if(this.keepafterRoutechange){
                    this.keepafterRoutechange = false;
                } else {
                    this.clear();
                }
            }
        })
    }

    succcess(message: string, keepafterRoutechange: boolean = false){
        this.alert(AlertType.SUCCESS, message, keepafterRoutechange);
    }

    warning(message: string, keepafterRoutechange: boolean = false){
        this.alert(AlertType.WARNING, message, keepafterRoutechange);
    }

    danger(message: string, keepafterRoutechange: boolean = false){
        this.alert(AlertType.DANGER, message, keepafterRoutechange);
    }

    info(message: string, keepafterRoutechange: boolean = false){
        this.alert(AlertType.INFO, message, keepafterRoutechange);
    }

    private alert(alertType: AlertType, message: string, keepafterRoutechange: boolean){
        this.keepafterRoutechange = keepafterRoutechange
        this.alertSubject.next(new Alert(alertType, message))
    }

    getAlert(){
        return this.alertSubject.asObservable();
    }

    clear(){
        this.alertSubject.next(null)
    }
}