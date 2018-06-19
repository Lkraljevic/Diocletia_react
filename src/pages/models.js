import React, { Component } from 'react';
import ModelSelection from '../components/model_selection';
import Model1 from '../models/model1';
import Model2 from '../models/model2';
import Model3 from '../models/model3';
import Model4 from '../models/model4';
import { M1Config, M2Config, M3Config, M4Config } from '../models/model_config';


// This is super container component
// It will need to have options to send ModelItem + SizeObject to the cart
class ModelsPage extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            activeModel : {
                code: null,
                name: null,
                price: null,
                colorStyle: null,
                stripsCount: null       
            }
        }

        this.updateColorStyle = this.updateColorStyle.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    render() {
        return (
            <div>
                <ModelView 
                activeModel = {this.state.activeModel}
                onUpdateColorStyle = {this.updateColorStyle}
                onAddToCart = {this.addToCart}
                lang = {this.props.lang}
                />

                <ModelSelection activeModel={this.state.activeModel} />
            </div>
        )
    }

    updateColorStyle(style) {
        
        this.setState((prevState, props)=>{
            prevState.activeModel.colorStyle = style; 
            return prevState;
        })
    }

    addToCart(size) {
        this.props.addToCart(this.state.activeModel, size, 1)
    }

    // @Luka: This loads Model from URL, and loads theme if it is defined by #hash
    static getDerivedStateFromProps(nextProps, prevState) {

        // nextProps.location.hash
        var activeModel = {};
        switch(nextProps.match.params.modelID) {
            case 'model-I':
                activeModel.code = M1Config.code;
                activeModel.name = M1Config.name;
                activeModel.price = M1Config.salePrice;
                activeModel.stripsCount = M1Config.stripsCount;
                activeModel.colorStyle = M1Config.themes[nextProps.location.hash.slice(1)] || M1Config.themes['default'];
            break;
            case 'model-II':
                activeModel.code = M2Config.code;
                activeModel.name = M2Config.name;
                activeModel.price = M2Config.salePrice;
                activeModel.stripsCount = M2Config.stripsCount;
                activeModel.colorStyle = M2Config.themes[nextProps.location.hash.slice(1)] || M2Config.themes['default'];
            break;
            case 'model-III':
                activeModel.code = M3Config.code;
                activeModel.name = M3Config.name;
                activeModel.price = M3Config.salePrice;
                activeModel.stripsCount = M3Config.stripsCount;
                activeModel.colorStyle = M3Config.themes[nextProps.location.hash.slice(1)] || M3Config.themes['default'];
            break;
            case 'model-IV':
                activeModel.code = M4Config.code;
                activeModel.name = M4Config.name;
                activeModel.price = M4Config.salePrice;
                activeModel.stripsCount = M4Config.stripsCount;
                activeModel.colorStyle = M4Config.themes[nextProps.location.hash.slice(1)] || M4Config.themes['default'];
            break;
        }
        return {activeModel};
    }

}
export default ModelsPage;


// This just container 
class ModelView extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        // Applay some logic for custom themese here
        return (
            <article className="container item">
                <p className="item__about">
                
                </p> 
                <ModelInfo />
                <ModelCustomisation {...this.props}/>
                <SizeForm  {...this.props}/>
            </article>
    )}

    

}

class ModelCustomisation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _activeColor: null,
            _activeStraps : null,
        }

        // Callbacks
        this.activateColor = this.activateColor.bind(this);
        this.updateStraps = this.updateStraps.bind(this);
        

    }

    render() {

        var Model = null;
        switch(this.state.code) {
            case 'M1': {
                Model = <Model1  
                activeStraps = {this.state._activeStraps}
                colorStyle = {this.state.colorStyle} 
                onStrapSelection = {this.updateStraps} />;
            }
            break;
            case 'M2':
                Model = <Model2  
                activeStraps = {this.state._activeStraps}
                colorStyle = {this.state.colorStyle} 
                onStrapSelection = {this.updateStraps} />;
            break;
            case 'M3':
                Model = <Model3  
                activeStraps = {this.state._activeStraps}
                colorStyle = {this.state.colorStyle} 
                onStrapSelection = {this.updateStraps} />;
            break;
            case 'M4':
                Model = <Model4  
                activeStraps = {this.state._activeStraps}
                colorStyle = {this.state.colorStyle} 
                onStrapSelection = {this.updateStraps} />;
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
            this.updateColorStyle(this.state)
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
            this.updateColorStyle(this.state)
        })
    }


    // Callback from update State
    // Calls props cb onUpdateColor style

    updateColorStyle(currentState) {
        var state = Object.assign({},currentState);
        function _isempty(array) {
            return array.indexOf(true) != -1
        }

        if(state._activeStraps && (_isempty(state._activeStraps.l )|| _isempty(state._activeStraps.r)))  
        if(state._activeColor) {

            state._activeStraps.l.forEach((strap, i)=>{
                if(strap) state.colorStyle.l[i] =  state._activeColor;
            });
            state._activeStraps.r.forEach((strap, i)=>{
                if(state) state.colorStyle.r[i] =  state._activeColor;
            });
            this.props.onUpdateColorStyle(state.colorStyle);
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        
        var code = nextProps.activeModel.code;
        var colorStyle = nextProps.activeModel.colorStyle;

        var _activeColor = null;
        var _activeStraps = {
            l: Array(nextProps.activeModel.stripsCount).map(()=>{false}),
            r: Array(nextProps.activeModel.stripsCount).map(()=>{false})
        };
        
        return {code, colorStyle, _activeStraps, _activeColor};
    }

}

class SizeForm extends Component {
    constructor(props) {
        super(props)

        this.state ={
            size1: '',
            size2: '',
            size3: '',
            size4: '',
            size5: '',
            size_number: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }
    render() {
        var errorMsg = null;
        if(this.state.error) {
            errorMsg = this.state.error.map((msg)=>{
                return (<p className="error">{msg}</p>)
            })
        }
        return(
            <div className="item__controls">
            <h4 className="item-form__title item-form__title--block">Enter your measurement</h4>
            <div className={(this.state.error ? "error " : "") + "item__form"}>
                <input type="text" value={this.state.size1} name="size1" placeholder="1 - Foot lenght" onChange={this.handleInputChange}/>
                <input type="text" value={this.state.size2} name="size2" placeholder="2 - Ball circumference" onChange={this.handleInputChange}/>
                <input type="text" value={this.state.size3} name="size3" placeholder="3 - Instep circumference" onChange={this.handleInputChange}/>
                <input type="text" value={this.state.size4} name="size4" placeholder="4 - Heel girth" onChange={this.handleInputChange}/>
                <input type="text" value={this.state.size5} name="size5" placeholder="5 - Ankle girth" onChange={this.handleInputChange}/>    
            </div>
            <p className="link-sizeguide item-form__about size-guide-link" style={{textDecoration: 'underline', cursor:'pointer'}}>
                Size guide instructions for each length and girth measurments.</p>
            <div className={(this.state.error ? "error " : "") + "item__dropdown"}>
                <h4 className="item-form__title">or choose shoe size</h4>
                <select name="size_number" onChange={this.handleInputChange}>
                    <option value="" disabled selected>EU Size: </option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                </select>
                <button class="button--gold" id="add_cart" onClick={this.onAddToCart.bind(this)}>Order Now</button>
                {errorMsg}
            </div>
        </div>
        )
    }
    onAddToCart() {
        var error = true;
        // Validation
        var size = {
            size1: this.state.size1,
            size2: this.state.size2,
            size3: this.state.size3,
            size4: this.state.size4,
            size5: this.state.size5,
            size_number: this.state.size_number
        }
        if(size.size_number) 
            error = false;
        else if(size.size1 && size.size2 && size.size3 && size.size4 && size.size5)
            error = false;
        

        if(!error) {
            this.setState({
                error: null,
                size: null
            },()=>{
                this.props.onAddToCart(size);
            });
        }   
        else {
            this.setState({
                error: ["We need more info!", 
                "If you don't want to measure your feets it's ok -- The custom fit is completely optional If you tend to fit well into a standard size, no worries!", 
                "Simply select your standard size and we'll get started on your DIOCLETIA shoes right away!"
            ]
            });
        }        
    }

    handleInputChange(event) {
        const target = event.target;
        const value =  target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSelection
    
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
                <a className={"item__color"+((this.props.activeColor=="o1")?" active":"")} data-color="royalblue" style={{backgroundColor: '#082bdd'}} href="#" onClick={this.activateColor.bind(this,"b2")}></a>
                <a className={"item__color"+((this.props.activeColor=="y1")?" active":"")} data-color="yellow" style={{backgroundColor: '#eadc6d'}} href="#" onClick={this.activateColor.bind(this,"y1")}></a>
                <a className={"item__color"+((this.props.activeColor=="c2")?" active":"")} data-color="cyclamen" style={{backgroundColor: '#ce3a77'}} href="#" onClick={this.activateColor.bind(this,"c2")}></a>
                <a className={"item__color"+((this.props.activeColor=="g2")?" active":"")} data-color="green_dark" style={{backgroundColor: '#156915'}} href="#" onClick={this.activateColor.bind(this,"g2")}></a>
                <a className={"item__color"+((this.props.activeColor=="p1")?" active":"")} data-color="purple" style={{backgroundColor: '#840484'}} href="#" onClick={this.activateColor.bind(this,"p1")}></a>
                <a className={"item__color"+((this.props.activeColor=="o1")?" active":"")} data-color="orange" style={{backgroundColor: '#fd9914'}} href="#" onClick={this.activateColor.bind(this,"o1")}></a>
                <a className={"item__color"+((this.props.activeColor=="o1")?" active":"")} data-color="skyblue" style={{backgroundColor: '#0bb7e7'}} href="#" onClick={this.activateColor.bind(this,"b1")}></a>
                
            </div>
        )
    }

    activateColor(color, e) {
        e.preventDefault();
        this.props.onColorActivate(color)
    }

}






