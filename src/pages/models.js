import React, { Component } from 'react';
import ModelSelection from '../components/model_selection';

import HeartIcon from '../models/m1';


class ModelsPage extends Component {
    render() {
        return (
            <div>
                <ModelCustomisation />
                <ModelSelection />
            </div>
        )
    }
}
export default ModelsPage;


// Models specific components 
class ModelCustomisation extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <article class="container item">
                <p class="item__about">Diocletia shoes are handmade leather shoes with a „dash of history“. Playing with the colors and traditional style, these Diocletia's shoes are designed to fulfill the demands of contemporary woman and her lifestyle.</p>
                <div class="item__model" id="model-info">
                    <h3>Model</h3>
                    <div id="item-price" class="item__price promo">
                        <del>
                            <span class="amount">&infin;€</span>
                        </del>
                        <ins>
                            <span class="amount">&infin;€</span>
                        </ins>
                    </div>
                </div>

                <h4 class="item-form__title item-form__title--block">Enter your measurement</h4>
                <div class="item__view" id="model">
                    <HeartIcon />
                    <div class="item__colors" id="colors">
                        <a class="item__color" data-color="red" style={{backgroundColor: 'red'}} href="#"></a>
                        <a class="item__color" data-color="green_light" style={{backgroundColor: '#1aa51a'}} href="#"></a>
                        <a class="item__color" data-color="crimson" style={{backgroundColor: '#af1111'}} href="#"></a>
                        <a class="item__color" data-color="yellow" style={{backgroundColor: '#eadc6d'}} href="#"></a>
                        <a class="item__color" data-color="cyclamen" style={{backgroundColor: '#ce3a77'}} href="#"></a>
                        <a class="item__color" data-color="green_dark" style={{backgroundColor: '#156915'}} href="#"></a>
                        <a class="item__color" data-color="purple" style={{backgroundColor: '#840484'}} href="#"></a>
                        <a class="item__color" data-color="orange" style={{backgroundColor: '#fd9914'}} href="#"></a>
                    </div>
                </div>
                <div class="item__controls">
                    <div class="item__form">
                        <input type="text" id="size1" name="s1" placeholder="1 - Foot lenght" />
                        <input type="text" id="size2" name="s2" placeholder="2 - Ball circumference" />
                        <input type="text" id="size3" name="s3" placeholder="3 - Instep circumference" />
                        <input type="text" id="size4" name="s4" placeholder="4 - Heel girth" />
                        <input type="text" id="size5" name="s5" placeholder="5 - Ankle girth" />
                        <p class="link-sizeguide item-form__about size-guide-link" style={{textDecoration: 'underline', cursor:'pointer'}}>
                        Size guide instructions for each length and girth measurments.</p>
                </div>
                <div class="item__dropdown">
                    <h4 class="item-form__title">or choose shoe size</h4>
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
  </article>
                                )
                            }
}