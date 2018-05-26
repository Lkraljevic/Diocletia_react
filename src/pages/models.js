import React, { Component } from 'react';
import ModelSelection from '../components/model_selection';

import Model1 from '../models/model1';
import Model2 from '../models/model2';
import Model3 from '../models/model3';
import Model4 from '../models/model4';


class ModelsPage extends Component {
    constructor(props) {
        super(props) 
    }
    render() {
        return (
            <div>
                <ModelCustomisation activeModel = {this.state.activeModel}/>
                <ModelSelection />
            </div>
        )
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        var activeModel = {};
        switch(nextProps.match.params.modelID) {
            case 'model-I':
                activeModel.code = 'M1';
            break;
            case 'model-II':
                activeModel.code = 'M2';
            break;
            case 'model-III':
                activeModel.code = 'M3';
            break;
            case 'model-IV':
                activeModel.code = 'M4';
            break;
        }
        return {activeModel};
      }
}
export default ModelsPage;


// Models specific components 
class ModelCustomisation extends Component {
    constructor(props) {
        super(props)
        console.log(props);
    }
    render() {
        // Applay some logic for custom themese here

        var model = null;
        switch(this.props.activeModel.code) {
            case 'M1':
                model = <Model1 color_theme = {M1Config.themes['default']}/>;
            break;
            case 'M2':
                model = <Model2/>;
            break;
            case 'M3':
                model = <Model3/>;
            break;
            case 'M4':
                model = <Model4/>;
            break;
        }
        return (
            <article className="container item">
                <p className="item__about">Diocletia shoes are handmade leather shoes with a „dash of history“. Playing with the colors and traditional style, these Diocletia's shoes are designed to fulfill the demands of contemporary woman and her lifestyle.</p>
                <div className="item__model" id="model-info">
                    <h3>Model</h3>
                    <div id="item-price" className="item__price promo">
                        <del>
                            <span class="amount">&infin;€</span>
                        </del>
                        <ins>
                            <span class="amount">&infin;€</span>
                        </ins>
                    </div>
                </div>
                <div className="item__view" id="model">
                    {model}
                    <div className="item__colors" id="colors">
                        <a className="item__color" data-color="red" style={{backgroundColor: 'red'}} href="#"></a>
                        <a className="item__color" data-color="green_light" style={{backgroundColor: '#1aa51a'}} href="#"></a>
                        <a className="item__color" data-color="crimson" style={{backgroundColor: '#af1111'}} href="#"></a>
                        <a className="item__color" data-color="yellow" style={{backgroundColor: '#eadc6d'}} href="#"></a>
                        <a className="item__color" data-color="cyclamen" style={{backgroundColor: '#ce3a77'}} href="#"></a>
                        <a className="item__color" data-color="green_dark" style={{backgroundColor: '#156915'}} href="#"></a>
                        <a className="item__color" data-color="purple" style={{backgroundColor: '#840484'}} href="#"></a>
                        <a className="item__color" data-color="orange" style={{backgroundColor: '#fd9914'}} href="#"></a>
                    </div>
                </div>
                <SizeForm />
              </article>
        )}
}





class SizeForm extends Component {
    render() {
        return(
            <div className="item__controls">
            <h4 className="item-form__title item-form__title--block">Enter your measurement</h4>
            <div className="item__form">
                <input type="text" id="size1" name="s1" placeholder="1 - Foot lenght" />
                <input type="text" id="size2" name="s2" placeholder="2 - Ball circumference" />
                <input type="text" id="size3" name="s3" placeholder="3 - Instep circumference" />
                <input type="text" id="size4" name="s4" placeholder="4 - Heel girth" />
                <input type="text" id="size5" name="s5" placeholder="5 - Ankle girth" />
                <p className="link-sizeguide item-form__about size-guide-link" style={{textDecoration: 'underline', cursor:'pointer'}}>
                Size guide instructions for each length and girth measurments.</p>
             </div>
            <div className="item__dropdown">
                <h4 className="item-form__title">or choose shoe size</h4>
                <select id="size_number" name="size_number">
                    <option value="" disabled selected>EU Size: </option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                </select>
                <button class="button--gold" id="add_cart">Order Now</button>
            </div>
        </div>
        )
    }
}







var M1Config = {
    code: 'M1',
    nr_strips: 7,
    sale_price: {
      price: 90,
      promo_price: 65,
      currency: 'EUR'
    },
    name: 'Model I',
    themes: {
      "default": {
        l: ['c2', 'y1', 'c2', 'y1', 'c2', 'c2', 'c2'],
        r: ['c2', 'y1', 'c2', 'y1', 'c2', 'c2', 'c2']
      },
      "test2": {
        l: ['g2', 'g2', 'g2', 'g2', 'g2', 'g2', 'g2'],
        r: ['r1', 'r1', 'r1', 'r1', 'r1', 'r1', 'r1']
      },
      "test3": {
        l: ['r1', 'r1', 'r1', 'r1', 'r1', 'r1', 'r1'],
        r: ['g2', 'g2', 'g2', 'g2', 'g2', 'g2', 'g2']
      }
    }
}

var M2Config = {
    code: 'M2',
    nr_strips: 4,
    sale_price: {
      price: 90,
      promo_price: 65,
      currency: 'EUR'
    },
    name: 'Model II',
    themes: {
      "default": {
        l: ['g1', 'g2', 'y1', 'r1'],
        r: ['g2', 'g1', 'r1', 'y1']
      },
      "test2": {
        l: ['g2', 'g2', 'g2', 'g2'],
        r: ['r1', 'r1', 'r1', 'r1']
      },
      "test3": {
        l: ['r1', 'r1', 'r1', 'r1'],
        r: ['g2', 'g2', 'g2', 'g2']
      }
    }
}

var M3Config = {
  code: 'M3',
  nr_strips: 9,
  sale_price: {
    price: 90,
    promo_price: 65,
    currency: 'EUR'
  },
  name: 'Model III',
  themes: {
    "default": {
      l: ['c1', 'g2', 'g1', 'o1','y1','p1','g1','g2','o1'],
      r: ['c1', 'g2', 'g1', 'o1','y1','p1','g1','g2','o1']
    },
    "test2": {
      l: ['g2', 'g2', 'g2', 'g2', 'y1','y1','r1','r1','r1'],
      r: ['r1', 'r1', 'r1', 'r1', 'y1','y1','r1','r1','r1']
    },
    "test3": {
      l: ['r1', 'r1', 'r1', 'r1', 'y1','y1','r1','r1','r1'],
      r: ['g2', 'g2', 'g2', 'g2', 'y1','y1','r1','r1','r1']
    }
  }
}

var M4Config = {
  code: 'M4',
  nr_strips: 6,
  sale_price: {
    price: 90,
    promo_price: 65,
    currency: 'EUR'
  },
  name: 'Model IV',
  themes: {
    "default": {
      l: ['c2', 'c2', 'c2', 'c2','c2','c2'],
      r: ['c2', 'c2', 'c2', 'c2','c2','c2']
    },
    "test2": {
      l: ['g2', 'g2', 'g2', 'g2', 'y1','y1'],
      r: ['r1', 'r1', 'r1', 'r1', 'y1','y1']
    },
    "test3": {
      l: ['r1', 'r1', 'r1', 'r1', 'y1','y1'],
      r: ['g2', 'g2', 'g2', 'g2', 'y1','y1']
    }
  }
}
