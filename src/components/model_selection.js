import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
let path = (window.location.origin == "https://diocletia.hr") ? "/Diocletia_react/dist":"";

class ModelSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models:[{
                code:'M1',
                name: 'Model I',
                url: path + '/models/model-I/'
            },{
                code:'M2',
                name: 'Model II',
                url: path + '/models/model-II/'
            },{
                code:'M3',
                name: 'Model III',
                url: path + '/models/model-III/'
            },{
                code:'M4',
                name: 'Model IV',
                url: path + '/models/model-IV/'
            }]
        }
    }
    render() {
        var chooseModels = this.state.models.map(model => {
            if(!this.props.activeModel || this.props.activeModel.code != model.code )
            return <ModelItem code={model.code} name={model.name} url={model.url}/>
        });
        return (
            <section id="choose-model" className="container cards cards--text">
                {chooseModels}
            </section>

        )}
}

export default ModelSelection;



const ModelItem   =  withRouter((props={}) =>(
    <article className="card card-model" data-hash="{{hash}}" onClick={() => { props.history.push(props.url) }}>
        <div className="card__text">
            {props.name}
            <a>more</a>
        </div>
        <img className="card__image" srcset={"/images/shoes/" + props.code + "@2x.png 2x, /images/shoes/"+ props.code +"@1x.png 1x"} src={"/images/shoes/"+ props.code +"@1x.png"}/>
        <img className="card-image--hover" srcset={"/images/shoes/"+ props.code +"-hover@2x.png 2x, /images/shoes/"+ props.code +"-hover@1x.png 1x"} src={"/images/shoes/"+ props.code +"-hover@1x.png"}/>
    </article>
))