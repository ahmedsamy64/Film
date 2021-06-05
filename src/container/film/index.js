import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { filmActions } from '../../actions/film.action'
import './index.scss'
class Film extends Component {
    componentDidMount() {
        this.props.dispatch(filmActions.getPopularFilms())
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    let { films } = state.films;

    return {
        films
    };
};

export default withRouter(connect(mapStateToProps)(Film));

