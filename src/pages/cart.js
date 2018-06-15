import React, { Component } from 'react';

import Model1 from '../models/model1';
import Model2 from '../models/model2';
import Model3 from '../models/model3';
import Model4 from '../models/model4';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: !props.show,
            items: new Map(),
            amount: {
                total: 0,
                currency: 'EUR',
                details: {
                    subtotal: 0,
                    tax: 0,
                    shipping: 0
                }
            },
            discount: {
                code: '',
                value: 0,
                quantity: 0,
                totalDiscount: 0
            }
        }

        this.loadCart();

        props.onCartUpdate(this.state);

        this.removeItem = this.removeItem.bind(this);
    }
    render() {
        var className = 'shadow shadow--cart modal'
        if (this.state.hidden)
            className += ' modal-hidden';
        return (
            <div className={className} id="cart-modal">
                <div className="container cart">
                    <div className="cart__controls">
                        <a href="#" className="cart__back" onClick={this.hideCart.bind(this)}>Continue Shopping</a>
                        <a href="#" className="cart__close" onClick={this.hideCart.bind(this)}></a>
                    </div>

                    <div className="card__body">
                        <div className="empty-cart-overlay"></div>
                        <CartTable onRemove={this.removeItem}
                            amount={this.state.amount}
                            discount={this.state.discount}
                            items={this.state.items} />
                        <CartButtons />
                    </div>
                    <CartRequestForm />
                </div>
            </div>);
    }

    addItem(model, size, quantity) {
        var item = {
            code: model.code,
            id: this._guid(),
            name: model.name,
            quantity: quantity,
            size: size,
            colors: model.colorStyle,
            price: model.price
        }

        var items = this.state.items;
        items.set(item.id, item);

        this.setState({ items }, () => {
            this.updateTotal();
        });
    }

    removeItem(id) {
        console.log("Removed", id)
        var items = this.state.items;
        items.delete(id);

        this.setState({ items }, () => {
            this.props.onCartUpdate(this.state);
        });

    }

    updateTotal() {
        var subtotal = 0;
        this.state.items.forEach(function (item) {
            subtotal += item.price.price * Number(item.quantity);
            subtotal = Number(parseFloat(subtotal).toFixed(2));
        });

        this.setState({
            amount: {
                details: { subtotal },
                total: subtotal + this.state.amount.details.tax + this.state.amount.details.shipping
            }
        }, () => {
            this.saveCart();
        })

    }

    loadCart() {
        if (typeof (Storage) !== "undefined") {
            // Load Items
            var cart_items = localStorage.getItem('cart_items');
            if (cart_items) {
                cart_items = JSON.parse(cart_items);
                cart_items.forEach((item) => {
                    this.state.items.set(item.id, item);
                });
            }
            // Load Amount
            var cart_amount = localStorage.getItem('cart_amount');
            if (cart_amount)
                this.state.amount = JSON.parse(cart_amount);
        }
    }

    saveCart() {
        var cart_items = [];
        this.state.items.forEach(function (item) { cart_items.push(item) })
        localStorage.setItem('cart_items', JSON.stringify(cart_items));
        localStorage.setItem('cart_amount', JSON.stringify(this.state.amount));
        console.log("# Cart saved");
    }

    clearCart() {
        this.setState({
            items: new Map(),
            amount: {
                total: 0,
                currency: 'EUR',
                details: {
                    subtotal: 0,
                    tax: 0,
                    shipping: 0
                }
            },
            discount: {
                code: '',
                value: 0,
                quantity: 0,
                totalDiscount: 0
            }
        })

        this.saveCart();
    }

    _guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    hideCart(e) {
        e.preventDefault();
        this.props.toggleCart();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return { hidden: !nextProps.shown }
    }
}



class CartTable extends Component {
    render() {
        var items = []
        this.props.items.forEach((item) => {
            items.push(
                <CartItem id={item.id}
                    code={item.code}
                    colors={item.colors}
                    name={item.name}
                    size={item.size}
                    total={item.total}
                    quantity={item.quantity}
                    price={item.price}
                    onRemove={this.props.onRemove} />
            )
        });
        return (
            <table className="cart__table" id="cart-table">
                <tr className="cart_header">
                    <th>My Cart ({this.props.items.length})</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                </tr>
                {items}
                <tr class="cart__stotal">
                    <td></td>
                    <td class="cart__subtitle">Subtotal:
                    </td>
                    <td></td>
                    <td>{this.props.amount.details.subtotal}€</td>
                </tr>

                {
                    this.props.discount.value ?
                        <tr class="cart__stotal">
                            <td>
                                Promo: {this.props.discount.code}
                            </td>
                            <td class="cart__subtitle">Discount:
                        </td>
                            <td>
                            </td>
                            <td>{this.props.discount.value}€</td>
                        </tr>
                        : null
                }

                <tr class="cart__details">
                    <td class="cart__space">
                        <div class="cart-shipping">
                            Shipping costs are not included.<br />
                            Check Out Our <a href="https://diocletia.hr/terms"> Shipping Policy</a>
                        </div>
                    </td>
                    <td class="cart__space">

                    </td>
                </tr>
                <tr class="cart__total">
                    <td></td>
                    <td>
                    </td>
                    <td>TOTAL:</td>
                    <td>{ /*calcTotal amount.total discount.value*/}€</td>

                </tr>
            </table>
        )
    }
}

class CartItem extends Component {
    constructor(props) {
        super(props)
        console.log(props);
    }
    render() {
        var itemSvg = null;
        switch (this.props.code) {
            case 'M1':
                itemSvg = <Model1
                    colorStyle={this.props.colors} />;
                break;
            case 'M2':
                itemSvg = <Model2
                    colorStyle={this.props.colors} />;
                break;
            case 'M3':
                itemSvg = <Model3
                    colorStyle={this.props.colors} />;
                break;
            case 'M4':
                itemSvg = <Model4
                    colorStyle={this.props.colors} />;
                break;
        }

        var size_string = [];
        if (this.props.size.size_number) {
            let string = "Size: " + this.props.size.size_number;
            let el = (<p>{string}</p>);
            size_string.push(el);
        }
        if (this.props.size.size1 || this.props.size.size2 || this.props.size.size3 || this.props.size.size4 || this.props.size.size5) {
            let string = 'Custom size fit: ' + (this.props.size.size1 || '-') + ':' + (this.props.size.size2 || '-') + ':' + (this.props.size.size3 || '-') + ':' + (this.props.size.size4 || '-') + ':' + (this.props.size.size5 || '-');
            let el = (<p>{string}</p>);
            size_string.push(el);
        }
        //apply colors
        return (
            <tr className="cart__item">
                <td>
                    <div className="cart-item__image">
                        {itemSvg}
                    </div>
                    <div className="cart-item__content">
                        <div className="cart__model">
                            {this.props.name}
                        </div>
                        <div className="cart__size">

                            {size_string}
                        </div>
                        <a className="cart__remove" href="#" onClick={() => { this.props.onRemove(this.props.id) }}>
                            Remove
                    </a>
                    </div>
                </td>
                <td>{this.props.price.price}€</td>
                <td>
                    <input type="number" min="1" max="100" value={this.props.quantity} />
                </td>
                <td>{Number(this.props.price.price) * Number(this.props.quantity)}€</td>
            </tr>
        )
    }
}


const CartButtons = (props = {}) => (
    <div className="cart__buttons">
        <div className="discount-form">
            <div>
                <input id="promo-code" name="promocode" className="promo-code" type="text" placeholder="Enter a promo code" autocomplete="off" />
                <button className="apply-coupon">Apply</button>
            </div>
        </div>
        <div>
            <button id="cart-sendRequest">Send Request</button>
        </div>
        <div>
            <div id="paypal-button"></div>
        </div>
    </div>
)


class CartRequestForm extends Component {
    render() {
        return(
            <div className="cart_request_form hidden">
                        <h2 className="cart-form__title">Shooping cart request! Drop us a few lines :)</h2>
                        <form className="container cart-form" name="cart-form" id="cart-form">
                            <input type="text" name="name" className="" placeholder="Name:" required="" />
                            <input type="email" name="email" className="" placeholder="Email:" required="" />
                            <input type="text" name="subject" className="" placeholder="Subject:" required="" />
                            <textarea name="message" placeholder="Message:" className="" required=""></textarea>

                            <div id="recaptcha" className="g-recaptcha" data-sitekey="6LeHJVcUAAAAAMuPh8-LQHuc7cxCP-TCBzEfpUuK" data-callback="cart_onSubmitRequest" data-size="invisible"></div>
                            <div className="form-buttons">
                                <button id="card-send-request">
                                    Send Request
                            </button>
                                <div id="cart-request-cancel">
                                    Cancel
                            </div>
                            </div>
                        </form>
                    </div>
        )
    }
}




export default Cart;