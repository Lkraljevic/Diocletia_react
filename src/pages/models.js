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

        // nextProps.location.hash
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
        this.onAddToCart = this.onAddToCart.bind(this);
        this.modelView = React.createRef();
    }
    render() {
        // Applay some logic for custom themese here
        return (
            <article className="container item">
                <p className="item__about">Diocletia shoes are handmade leather shoes with a „dash of history“. Playing with the colors and traditional style, these Diocletia's shoes are designed to fulfill the demands of contemporary woman and her lifestyle.</p>
                <ModelInfo />
                <ModelView ref={this.modelView} {...this.props}/>
                <SizeForm  onAddToCart={this.onAddToCart}/>
            </article>
    )}

    onAddToCart(size) {
        console.log("This on order");
        var order = {
            code: this.modelView.current.state.code,
            style: this.modelView.current.state.style,
            price:
            quantity: 1, 
        }
        var item = {
            code: model.code,
            id: this._guid(),
            name: model.name,
            quantity: 1, 
            size: size,
            colors: model.currentTheme,
            price: model.sale_price
          }
    }
}

class ModelView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _activeColor: null,
            _activeStraps : null,
            code: null,
            style: null,
        }

        // Callbacks
        this.activateColor = this.activateColor.bind(this);
        this.updateStraps = this.updateStraps.bind(this);

        //this.updateColorStyle = this.updateColorStyle.bind(this);
    }

    render() {

        var Model = null;
        switch(this.props.activeModel.code) {
            case 'M1': {
                
                Model = <Model1  
                activeStraps = {this.state._activeStraps}
                colorStyle = {this.state.colorStyle} 
                onStrapSelection = {this.updateStraps} />;
            }
            break;
            case 'M2':
                Model = <Model2/>;
            break;
            case 'M3':
                Model = <Model3/>;
            break;
            case 'M4':
                Model = <Model4/>;
            break;
        }
        return(
            <div className="item__view" id="model">
                    {Model}
                    <ColorPalete 
                    activeColor={this.state._activeColor} 
                    onColorActivate={this.activateColor}/>
                </div>
        )
    }

    activateColor(color) {
        
        this.setState((prevState, props)=> {
            if(prevState._activeColor == color)
                return {_activeColor: null}
            else
                return {_activeColor: color}
        }, () => {
            this.updateColorStyle()
        })
    }

    updateStraps(strObj) {
        this.setState((prevState, props)=>{

            if ('l' in strObj) 
                prevState._activeStraps.l[strObj.l] = !prevState._activeStraps.l[strObj.l]

            if ('r' in strObj) 
                prevState._activeStraps.r[strObj.r] = !prevState._activeStraps.r[strObj.r]


            return {_activeStraps: prevState._activeStraps}
        }, () => {
            this.updateColorStyle()
        })
    }

    updateColorStyle() {
        console.log(this.state);
        function _isempty(array) {
            return array.indexOf(true) != -1
        }
        this.setState((prevState, props)=>{
            
            if(prevState._activeStraps && (_isempty(prevState._activeStraps.l )|| _isempty(prevState._activeStraps.r)))  
                if(prevState._activeColor){

                    prevState._activeStraps.l.forEach((strap, i)=>{
                        if(strap) prevState.colorStyle.l[i] =  prevState._activeColor;
                    });
                    prevState._activeStraps.r.forEach((strap, i)=>{
                        if(strap) prevState.colorStyle.r[i] =  prevState._activeColor;
                    });
                    return {
                    _activeColor: null,
                    _activeStraps: {
                        l : prevState._activeStraps.l.map(()=>{false}),
                        r : prevState._activeStraps.r.map(()=>{false})
                    },
                    colorStyle: prevState.colorStyle
                    }
                }
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        var code, colorStyle, _activeStraps;
        switch(nextProps.activeModel.code) {
            case 'M1':
                code = 'M1';
                colorStyle = M1Config.themes['default'];
                _activeStraps = {
                    l: Array(M1Config.nr_strips).map(()=>{false}),
                    r: Array(M1Config.nr_strips).map(()=>{false})
                };
            break;
            case 'M2':
                code = 'M2';
                colorStyle = M2Config.themes['default'];
            break;
            case 'M3':
                code = 'M3';
                colorStyle = M3Config.themes['default'];
            break;
            case 'M4':
                code = 'M4';
                colorStyle = M4Config.themes['default'];
            break;
        }
        return {code, colorStyle, _activeStraps};
    }
}


class ColorPalete extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return(
            <div className="item__colors" id="colors">
                <a className={"item__color"+((this.props.activeColor=="r1")?" active":"")} data-color="red" style={{backgroundColor: 'red'}} href="#" onClick={this.activateColor.bind(this,"r1")}></a>
                <a className={"item__color"+((this.props.activeColor=="g1")?" active":"")} data-color="green_light" style={{backgroundColor: '#1aa51a'}} href="#" onClick={this.activateColor.bind(this,"g1")}></a>
                <a className={"item__color"+((this.props.activeColor=="c1")?" active":"")} data-color="crimson" style={{backgroundColor: '#af1111'}} href="#" onClick={this.activateColor.bind(this,"c1")}></a>
                <a className={"item__color"+((this.props.activeColor=="y1")?" active":"")} data-color="yellow" style={{backgroundColor: '#eadc6d'}} href="#" onClick={this.activateColor.bind(this,"y1")}></a>
                <a className={"item__color"+((this.props.activeColor=="c2")?" active":"")} data-color="cyclamen" style={{backgroundColor: '#ce3a77'}} href="#" onClick={this.activateColor.bind(this,"c2")}></a>
                <a className={"item__color"+((this.props.activeColor=="g2")?" active":"")} data-color="green_dark" style={{backgroundColor: '#156915'}} href="#" onClick={this.activateColor.bind(this,"g2")}></a>
                <a className={"item__color"+((this.props.activeColor=="p1")?" active":"")} data-color="purple" style={{backgroundColor: '#840484'}} href="#" onClick={this.activateColor.bind(this,"p1")}></a>
                <a className={"item__color"+((this.props.activeColor=="o1")?" active":"")} data-color="orange" style={{backgroundColor: '#fd9914'}} href="#" onClick={this.activateColor.bind(this,"o1")}></a>
            </div>
        )
    }

    activateColor(color, e) {
        e.preventDefault();
        this.props.onColorActivate(color)
    }

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
            </div>
            <p className="link-sizeguide item-form__about size-guide-link" style={{textDecoration: 'underline', cursor:'pointer'}}>
                Size guide instructions for each length and girth measurments.</p>
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
                <button class="button--gold" id="add_cart" onClick={this.onAddToCart.bind(this)}>Order Now</button>
            </div>
        </div>
        )
    }
    onAddToCart() {
        // Validation
        this.props.onOrder();
    }
}

const ModelInfo = (props={})=>(
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
)







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
