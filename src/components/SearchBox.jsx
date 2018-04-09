import React, {Component} from 'react';
import Url from 'library/tools/url';
import style from './search.box.scope.scss';
import addScriptElement from 'library/tools/addScriptElement';

/**
 * search bar
 */
class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.keyPress = this.keyPress.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelected = this.onSelected.bind(this);
        // this.hideList = this.hideList.bind(this);
        // this.showList = this.showList.bind(this);
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
            show: false
        };
    }

    search() {
        let content = this.refs.input.value;
        if (content.replace(/\s/g, '')) {
            window.open(new Url('https://www.baidu.com/s').setParameter('wd', content).url, '_blank');
        }
    }

    componentDidMount() {
        window[this.cb] = (data) => {
            let val = this.refs.input.value;
            // console.log(data);
            // noinspection JSCheckFunctionSignatures
            if (val.startsWith(data['q'])) {
                this.setState({list: data['s']});
            }

        }
    }

    onChange() {
        let val = this.refs.input.value;
        // console.log(val);
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
            this.search();
        }
    }

    // hideList() {
    //     this.setState({show: false});
    // }
    //
    // showList() {
    //     this.setState({show: true});
    // }

    render() {
        return <div className={style.container}>
            <input onKeyUp={this.keyPress} onChange={this.onChange} ref={'input'} type='text' placeholder={'搜索内容'}/>

            <ul onClick={this.onSelected} className={style.list} >
                {
                    this.state.list.map((item) => {
                        return <li key={item}>{item}</li>
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