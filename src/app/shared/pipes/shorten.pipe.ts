import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: "shorten"
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number, appendEllipses: boolean) {
    return value && value.length > limit
      ? value.substring(0, limit) + (appendEllipses ? "..." : "")
      : value;
  }
}
