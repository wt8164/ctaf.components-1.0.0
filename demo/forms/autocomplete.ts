import { CTAFComponent, ViewChild, AfterViewInit, AfterViewChecked, OnInit, ComponentBase } from '@ctaf/framework';
import { AutoCompleteComponent } from '../../src/entry';

@CTAFComponent({
    templateUrl: 'autocomplete.html'
})
export class DemoAutoCompleteComponent extends ComponentBase {
    private value1: string = 'abcd2';
    private results: string[] = [];
    private mockDate: string[] = [];
    private mockDate2: string[] = [];
    private mockI: number[] = [];
    @ViewChild('acp') acp: AutoCompleteComponent;
    ngOnInit() {
        // for (let i: number = 1; i < 1000; i++) {
        //     this.mockDate.push('abcd' + i);
        // }
        this.mockDate = ['a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z'];
    }

    search(event) {
        this.mockDate2 = [];
        for (let i: number = 0; i < 10; i++) {
            // let _i = Math.floor(Math.random() * 10000);
            // let _j = Math.floor(Math.random() * 27);
            // this.mockDate2.push('ab' + this.mockDate[_j] + _i);
            this.mockDate2.push('abcd' + i);
        }


        let query: string = event.query;
        this.results = [];    // 搜索结果清空
        for (let i = 0; i < this.mockDate2.length; i++) {
            if (query !== '' && this.mockDate2[i].indexOf(query) !== -1) {
                this.results.push(this.mockDate2[i]);
                // if (this.results.length > this._datalength - 1) {
                //     return;
                // }
            }
        }
        this.acp.completeMethodSuccess(this.results);
    }


    clickHandler() {
        this.value1 = 'abcd2';
        // this.forceChange();
    }

    // handleDropdown(event) {
    //     //event.query = current value in input field
    // }



    // private results: string[] = [];
    // constructor(protected cdr: ChangeDetectorRef) {
    //     super();
    // }
}



