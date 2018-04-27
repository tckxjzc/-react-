import React, {Component} from 'react';
import Url from 'library/tools/url';
import style from './search.box.scope.scss';
import addScriptElement from 'library/tools/addScriptElement';
import Count from 'library/number/Count';

/**
 * search bar
 */
class SearchBox extends Component {
    inputFlag = false;//是否输入中
    searchIndex = 0;//默认百度搜索
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelected = this.onSelected.bind(this);
        this.onCompositionStart = this.onCompositionStart.bind(this);
        this.onCompositionEnd = this.onCompositionEnd.bind(this);
        this.selectSearchEngine = this.selectSearchEngine.bind(this);
        this.count = new Count(0, -1);
        this.input = React.createRef();
        this.clearList = this.clearList.bind(this);
        this.cb = 'addWordList_' + Math.floor(Math.random() * 10000);
        this.wordUrl = new Url('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su').setParams({
            csor: 1,
            josn: 1,
            req: 2,
            p: 3,
            cb: this.cb
        });
        //state
        this.state = {
            list: [],
            show: false,
            selectedIndex: -1
        };
        //search list
        this.searchList = [
            {
                name: "百度搜索",
                getUlr: (content) => {
                    return new Url('https://www.baidu.com/s').setParameter('wd', content).url;
                }
            },
            {
                name: "词霸翻译",
                getUlr: (content) => {
                    return `http://www.iciba.com/` + encodeURIComponent(content);
                }
            },
            {
                name: "npm搜索",
                getUlr: (content) => {
                    return new Url("https://www.npmjs.com/search").setParameter('q', content).url;
                }
            },
            {
                name: "github搜索",
                getUlr: (content) => {
                    return new Url('https://github.com/search?utf8=%E2%9C%93').setParameter('q', content).url;
                }
            },
            {
                name: "google搜索",
                getUlr: (content) => {
                    return new Url('https://www.google.com/search').setParameter('q', content).url;
                }
            }
        ];
    }

    search() {
        let content = this.input.current.value;
        if (content.replace(/\s/g, '')) {
            window.open(this.searchList[this.searchIndex].getUlr(content), wbp.target);
        }
    }

    selectSearchEngine(e) {
        // if(e.target.checked){
        this.searchIndex = e.target.value;
        // }
    }

    componentDidMount() {
        window[this.cb] = (data) => {
            let val = this.input.current.value;
            // console.log(data);
            // noinspection JSCheckFunctionSignatures
            if (val.startsWith(data['q'])) {
                this.setState({list: data['s'], selectedIndex: -1});
                this.count.setMax(data['s'].length - 1).setValue(-1)
            }
        }
    }


    onCompositionStart() {
        this.inputFlag = true;
    }

    onCompositionEnd() {
        this.inputFlag = false;
    }

    onChange() {
        let val = this.input.current.value;
        if (val.replace(/\s/g, '')) {
            addScriptElement(this.wordUrl.setParams({wd: val, pwd: val}).url);
        } else {
            this.setState({list: []});
        }

    }

    onSelected(event) {
        let el = event.target;
        if (el.nodeName.toLocaleLowerCase() === 'li') {
            this.input.current.value = el.innerText;
        }
    }

    keyPress(event) {
        // console.log(event.charCode || event.keyCode);
        if (event.charCode === 13 || event.keyCode === 13) {
            // if (this.state.selectedIndex !== -1) {
            //     this.input.current.value = this.state.list[this.state.selectedIndex];
            // }
            this.search();
        } else if (!this.inputFlag && this.state.list.length > 0) {
            let code=event.charCode || event.keyCode;
            let index;
            if(code===40||code===38){
                if (code === 40) {

                    index=this.count.next();

                } else if (code === 38) {
                    index=this.count.previous();
                }
                this.setState({selectedIndex:index});
                this.input.current.value = this.state.list[index];
            }


        }


    }

    clearList() {
        this.setState({list: []});
    }

    render() {
        return <div>
            <div className={style.container}>
                <input onCompositionStart={this.onCompositionStart} onCompositionEnd={this.onCompositionEnd}
                       onKeyUp={this.keyPress} onChange={this.onChange} ref={this.input} type='text'
                       placeholder={'搜索内容'}/>

                <ul onClick={this.onSelected} className={style.list}>
                    {
                        this.state.list.map((item, index) => {
                            return <li className={this.state.selectedIndex === index ? style.active : ''}
                                       key={item}>{item}</li>
                        })
                    }

                </ul>
                <a onClick={this.search}>
                    <span className={'icon-search'}/>
                    <span>Search</span>

                </a>
            </div>
            <div className={style.radio}>
                <ul>
                    {
                        this.searchList.map((item, index) => {
                            return <li key={item.name}>
                                <input onChange={this.selectSearchEngine} defaultChecked={index === 0}
                                       name={'searchType'} id={'searchItem' + index} type='radio' value={index}/>
                                <label htmlFor={'searchItem' + index}>{item.name}</label>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    }
}


export default SearchBox;