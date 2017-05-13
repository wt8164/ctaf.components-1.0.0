import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ctafKeyHighLight' })
export class HighLightPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {
    }

    transform(source: string, args: string[]): SafeHtml {
        if (args.length === 0) {
            return source;
        }
        let reg = new RegExp(args[0].toString(), 'gi');
        return this.sanitized.bypassSecurityTrustHtml(source.replace(reg, '<span style="color:red;">$&</span>'));
    }
}
