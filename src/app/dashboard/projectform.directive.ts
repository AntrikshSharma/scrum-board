import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[createForm]'
})
export class ProjectFormDirective {
    constructor(
        public ViewContainerRef: ViewContainerRef) {}
}