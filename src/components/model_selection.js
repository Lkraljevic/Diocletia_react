import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ModelSelection extends Component {
    render() {
        return (
            <section id="choose-model" className="container cards cards--text">
                <Link to={'/models/model-I'} >
                <article className="card" id="model-I-href">
                    <div className="card__text">
                        Model I
                        <a href="#">more</a>
                    </div>
                    <img className="card__image" srcset="/images/shoes/M1@2x.png 2x, /images/shoes/M1@1x.png 1x" src="/images/shoes/M1@1x.png" alt="model-I" />
                    <img className="card-image--hover" srcset="/images/shoes/M1-hover@2x.png 2x, /images/shoes/M1-hover@1x.png 1x" src="/images/shoes/M1-hover@1x.png" alt="model-I"/>
                </article>
                </Link>
                <article className="card" id="model-II-href">
                    <div className="card__text">
                        Model II
                        <a href="#">more</a>
                    </div>
                    <img className="card__image" srcset="/images/shoes/M2@2x.png 2x, /images/shoes/M2@1x.png 1x" src="/images/shoes/M2@1x.png" alt="model-II" />
                    <img className="card-image--hover" srcset="/images/shoes/M2-hover@2x.png 2x, /images/shoes/M2-hover@1x.png 1x" src="/images/shoes/M2-hover@1x.png" alt="model-II"/>
                </article>
                <article className="card" id="model-III-href">
                    <div className="card__text">
                        Model III
                        <a href="#">more</a>
                    </div>
                    <img className="card__image" srcset="/images/shoes/M3@2x.png 2x, /images/shoes/M3@1x.png 1x" src="/images/shoes/M3@1x.png" alt="model-III"/>
                    <img className="card-image--hover" srcset="/images/shoes/M3-hover@2x.png 2x, /images/shoes/M3-hover@1x.png 1x" src="/images/shoes/M3-hover@1x.png" alt="model-III"/>
                </article>
                <article className="card" id="model-IV-href">
                    <div className="card__text">
                        Model IV
                        <a href="#">more</a>
                    </div>
                    <img className="card__image" srcset="/images/shoes/M4@2x.png 2x, /images/shoes/M4@1x.png 1x" src="/images/shoes/M4@1x.png" alt="model-IV"/>
                    <img className="card-image--hover" srcset="/images/shoes/M4-hover@2x.png 2x, /images/shoes/M4-hover@1x.png 1x" src="/images/shoes/M4-hover@1x.png" alt="model-IV"/>
                </article>
            </section>

        )}
}

export default ModelSelection;