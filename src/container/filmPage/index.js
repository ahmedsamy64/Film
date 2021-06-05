import React, { Component } from 'react';
import LogoImg from "../../assets/TMDB_logo.svg"
import { BiPlusMedical, } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa"
import { FiChevronRight } from "react-icons/fi"
import { Dropdown, Menu, Progress } from "antd"
import 'antd/dist/antd.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filmActions } from '../../actions/film.action';
import './index.scss'
import axios from 'axios';
import moment from 'moment'

class Film extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: { label: "Popular", val: "popular" },

        }
    }


    componentDidMount() {
        this.props.dispatch(filmActions.getPopularFilms(this.state.currentTab.val))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentTab !== this.state.currentTab) {
            this.props.dispatch(filmActions.getPopularFilms(this.state.currentTab.val))
        }
    }


    moviesMenu = (<Menu style={{ width: 120 }}>
        <Menu.Item onClick={() => this.setState({ currentTab: { label: "Upcoming", val: "upcoming" } })}>
            <span>
                Upcoming
            </span>
        </Menu.Item>
        <Menu.Item onClick={() => this.setState({ currentTab: { label: "Popular", val: "popular" } })}>
            <span >
                Popular
            </span>
        </Menu.Item>
        <Menu.Item onClick={() => this.setState({ currentTab: { label: "Top Rated", val: "top_rated" } })}>
            <span >
                Top rated
            </span>
        </Menu.Item>
    </Menu>)

    Header = (<div className="navigation-bar">
        <div className="navigation-bar-segment">
            <img src={LogoImg} className="mainLogo" />
            <Dropdown overlay={this.moviesMenu}>
                <span onClick={e => e.preventDefault()}>Movies</span>
            </Dropdown>
            <span>TV Shows</span>
            <span>People</span>
            <span>More</span>
        </div>
        <div className="navigation-bar-segment">
            <BiPlusMedical onClick={() => alert("Add Clicked!")} className="plusIcon" />
            {/* should be component but its static for trial purpose */}
            <div className="languageOptions">EN</div>
            <span>Login</span>
            <span>Join TMDb</span>
            <IoSearchSharp className="searchIcon" />
        </div>
    </div>)

    sidebarOption = (optionName, onClick) => (
        <div className="sidebarOption" onClick={onClick}>
            <span>{optionName}</span>
            <FaAngleRight size={16} />
        </div>
    )

    sidebarOptions = (["Sort", "Filters", "Where To Watch"].map((elm) => this.sidebarOption(elm, () => alert(elm))))


    render() {
        return (
            <div className="mainPageContainer">
                {/* Page header */}
                {this.Header}
                {/* Page body */}
                <div style={{ display: 'flex' }}>
                    {/* Sidebar */}
                    <div className="sideBarContainer">
                        <h2 className="currentType">{this.state.currentTab.label} Movies</h2>
                        {this.sidebarOptions}
                        <div className="sidebarSearchDiv">
                            Search
                        </div>
                    </div>
                    {/* films container*/}
                    <div className="filmsContainer">
                        {
                            this.props.films && this.props.films.map((film) => {
                               // console.log(">>>>films", film)
                                return (
                                    <div className="singleFilmContainer">
                                        <div className="threeDotsDiv" >
                                            <BsThreeDots style={{ opacity: 0.4, fontSize: 15 }} />
                                        </div>
                                        <Link to={`/movie/${film.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} className="filmImg" />
                                        </Link>
                                        <div className="progressContainer">
                                            <CircularProgressbar
                                                value={film.vote_average * 10}
                                                text={`${film.vote_average * 10}%`}
                                                background
                                                backgroundPadding={5}
                                                strokeWidth={7}
                                                styles={buildStyles({
                                                    backgroundColor: "#070f09",
                                                    textColor: "#fff",
                                                    pathColor: film.vote_average > 7.5 ? "#21d07a" : film.vote_average < 7.6 && film.vote_average > 4 ? "#fdee87" : 'red',
                                                    trailColor: "transparent",
                                                    textSize: 30,
                                                })}
                                            />
                                        </div>
                                        <p className="filmTitle">{film.title.length > 46 ? film.title.substring(0, 46).concat("...") : film.title}</p>
                                        <p className="filmDate">{moment(film.release_date).format("MMMM Do YYYY")}</p>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let films = state.film.films;

    return {
        films
    };
};

export default connect(mapStateToProps)(Film);
// export default Film

