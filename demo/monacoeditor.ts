import { CTAFComponent, ViewChild, ElementRef, Input, ComponentBase } from '@ctaf/framework';

import * as _ from 'underscore';

declare const monaco: any;
declare const require: any;

@CTAFComponent({
    selector: 'monacoeditor',
    template: `
    <div id='editor' #editor class=’monaco-editor‘ [style.height.px]='height' style='margin: 5px 0'>
        <pre #code style='display: none'>
            <ng-content></ng-content>
        </pre>
    </div>
  `,
})
export class MonacoEditor extends ComponentBase {
    static loaded: number = -1;

    @ViewChild('editor') editorContent: ElementRef;

    @ViewChild('code', { read: ElementRef }) codeEle: ElementRef;

    @Input() language: string = 'html';
    @Input() height: string = '200';

    ngAfterViewInit() {
        let onGotAmdLoader = () => {
            (<any>window).require.config({ paths: { 'vs': '/node_modules/monaco-editor/min/vs' } });
            // Load monaco
            (<any>window).require(['vs/editor/editor.main'], () => {
                this.initMonaco();
                MonacoEditor.loaded = 1;
            });
        };

        // Load AMD loader if necessary
        // if (!(<any>window).require) { 
        if (MonacoEditor.loaded === -1) {
            let loaderScript = document.createElement('script');
            loaderScript.type = 'text/javascript';
            loaderScript.src = '/node_modules/monaco-editor/min/vs/loader.js';
            loaderScript.addEventListener('load', onGotAmdLoader);
            document.body.appendChild(loaderScript);

            MonacoEditor.loaded = 0;
        } else if (MonacoEditor.loaded === 0) {
            setTimeout(function() {
                onGotAmdLoader();
            }, 500);
        } else {
            onGotAmdLoader();
        }
    }

    // Will be called once monaco library is available
    initMonaco() {
        let myDiv: HTMLDivElement = this.editorContent.nativeElement;
        let editor = monaco.editor.create(myDiv, {
            value: this.codeEle.nativeElement.innerText.trim(),
            language: this.language,
            lineNumbers: true,
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: true,
            theme: 'vs-dark',
            contextmenu: false,
            // automaticLayout: true
        });
    }
}
