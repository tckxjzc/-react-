import React, {Component} from 'react';
import style from './category.scope.scss';
import Url from 'library/tools/url';
import colors from 'style/colors.scope.scss';
class Category extends Component {


    constructor(props) {
        super(props);
        this.colors=(function () {
            let arr=[];
            for(let key in colors){
                if(colors.hasOwnProperty(key)){
                    arr.push(colors[key]);
                }

            }
            return arr;
        }());
        //颜色数
        this.total=this.colors.length;
        this.previous=-1;

    }
    //生产背景色
    getColorIndex(){
        let index=Math.floor(Math.random()*this.total);
        if(index!==this.previous){
            this.previous=index;
            return index;
        }else {
            return this.getColorIndex();
        }
    }

    render() {
        let {data}=this.props;

        //view
        return <div className={style.container}>
            <div className={style.title} style={{backgroundColor:data.titleColor}}>
                <span className={'icon-category-1'}> </span>
                {data.title}
            </div>
            <ul style={{backgroundColor:data.listColor}} className={style.list}>
                {data.list.map((item)=>{
                    return <li key={item.name} className={style.item}>
                        <a target={'_blank'} className={this.colors[this.getColorIndex()]} href={item.url} >
                            <img onError={(e)=>{
                                e.target.src=require('assets/default.png');
                            }} src={Url(item.url).getHost()+'/favicon.ico'} />
                            <span>{item.name}</span>
                        </a>
                    </li>
                })}
            </ul>
        </div>
    }
}


export default Category;