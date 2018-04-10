import React, {Component} from 'react';
import Url from 'library/tools/url';
import style from './search.box.scope.scss';
import addScriptElement from 'library/tools/addScriptElement';
import Count from 'library/number/Count';
/**
 * search bar
 */
class SearchBox extends Component {
    inputFlag=false;//是否输入中
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.onCompositionStart = this.onCompositionStart.bind(this);
        this.onCompositionEnd = this.onCompositionEnd.bind(this);
        this.count=new Count(0,-1);
        this.clearList = this.clearList.bind(this);
        this.cb = 'addWordList_' + Math.floor(Math.random() * 10000);
        this.wordUrl = new Url('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su').setParams({
            csor: 1,
            josn: 1,
            req: 2,
            p: 3,
            cb: this.cb
        });

        this.state = {
            list: [],
            show: false,
            selectedIndex:-1
        };
    }

    search() {
        let content = this.refs.input.value;
        if (content.replace(/\s/g, '')) {
            window.open(new Url('https://www.baidu.com/s').setParameter('wd', content).url, wbp.target);
        }
    }

    componentDidMount() {
        window[this.cb] = (data) => {
            let val = this.refs.input.value;
            // console.log(data);
            // noinspection JSCheckFunctionSignatures
            if (val.startsWith(data['q'])) {
                this.setState({list: data['s'],selectedIndex:-1});
                this.count.setMax(data['s'].length-1).setValue(-1)
            }
        }
    }


    onCompositionStart(){
        this.inputFlag=true;
    }
    onCompositionEnd(){
        this.inputFlag=false;
    }

    onChange() {
        let val = this.refs.input.value;
        if (val.replace(/\s/g, '')) {
            addScriptElement(this.wordUrl.setParams({wd: val, pwd: val}).url);
        } else {
            this.setState({list: []});
        }

    }

    onSelected(event) {
        let el = event.target;
        if (el.nodeName.toLocaleLowerCase() === 'li') {
            this.refs.input.value = el.innerText;
        }
    }

    keyPress(event) {
         // console.log(event.charCode || event.keyCode);
        if (event.charCode === 13 || event.keyCode === 13) {
            if(this.state.selectedIndex!==-1){
                this.refs.input.value=this.state.list[this.state.selectedIndex];
            }
            this.search();
        }else if(!this.inputFlag&&this.state.list.length>0){
            if((event.charCode||event.keyCode)===40){
                this.setState({selectedIndex:this.count.next()});
            }else if((event.charCode||event.keyCode)===38){
                this.setState({selectedIndex:this.count.previous()});
            }
        }


    }

    clearList() {
        this.setState({list: []});
    }

    render() {
        return <div className={style.container}>
            <input onCompositionStart={this.onCompositionStart} onCompositionEnd={this.onCompositionEnd} onKeyUp={this.keyPress} onChange={this.onChange} ref={'input'} type='text' placeholder={'搜索内容'}/>

            <ul onClick={this.onSelected} className={style.list} >
                {
                    this.state.list.map((item,index) => {
                        return <li className={this.state.selectedIndex===index?style.active:''} key={item}>{item}</li>
                    })
                }

            </ul>
            <a onClick={this.search}>
                <span className={'icon-search'}/>
                <span>Search</span>

            </a>
        </div>
    }
}


export default SearchBox;