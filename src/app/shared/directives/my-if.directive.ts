import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appMyIf]"
})
export class MyIfDirective {
  condition: boolean;
  elseTemplate: TemplateRef<any>;

  @Input() set appMyIf(value: boolean) {
    console.log("if", value);
    this.condition = value;

    if (value) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  @Input() set appMyIfElse(value: any) {
    console.log("else", value);
    this.elseTemplate = value;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnChanges() {
    console.log("changes", this.condition);
    if (!this.condition) {
      this.viewContainerRef.createEmbeddedView(this.elseTemplate);
    } else {
      this.viewContainerRef.remove(0);
    }
  }
}
