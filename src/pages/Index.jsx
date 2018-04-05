import React,{Component} from 'react';
import usually from 'data/usually';
import style from './index.scope.scss';
import SearchBox from 'components/SearchBox';
import Category from 'components/Category';
import data from 'data/index';
/**
 * home page
 */
class Index extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return <div className={style.container}>
            <SearchBox/>
            <div>
                <ul className={style.list}>
                    {
                        usually.map((item)=> {
                            let url=item.url.startsWith('https://')||item.url.startsWith('http://')?item.url:'https://'+item.url;
                            return <li key={item.name} className={style.item}><a target={'_blank'} href={url} style={{backgroundColor:item.background,color:item.color}}>

                                <div  className={style.content} dangerouslySetInnerHTML={{__html:item.text}} >
                                </div>
                                <div className={style.label}>{item.name}</div>
                            </a></li>
                        })
                    }
                </ul>
            </div>
            {
                data.map((item)=>{
                    return <Category key={item.title} data={item} />
                })
            }


        </div>
    }
}
export default Index;