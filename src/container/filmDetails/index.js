import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoListSharp, IoBookmark, IoStarSharp, IoCaretForwardSharp } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { AiFillFacebook } from "react-icons/ai"
import { FaTwitter, FaInstagram } from "react-icons/fa"
import { BiLink } from "react-icons/bi"
import './index.scss'
import { Tooltip } from 'antd';
import axios from "axios";
import moment from 'moment';
import { connect } from 'react-redux';
import { filmActions } from '../../actions/film.action';

class FilmDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filmDetails: null,
            cast: [],
            keywords: [],
            blurEffect: true,
        }
    }

    // posterDiv = 

    posterOptions = [
        { icon: 'list', title: 'Login to create and edit custom lists', onclick: function () { alert("list Clicked"); } },
        { icon: 'favorite', title: 'Login to add this movie to your favorite list', onclick: function () { alert("favorite Clicked"); } },
        { icon: 'watchlist', title: 'Login to add this movie to your watchlist', onclick: function () { alert("watchlist Clicked"); } },
        { icon: 'rate', title: 'Login to rate this movie', onclick: function () { alert("rate Clicked"); } }
    ]

    //the footer of the poster. //dont know where to get this request
    persons = [{ name: 'Caroline Suh', rule: 'Director' }, { name: 'Dana Fox', rule: 'Screenplay' }, { name: 'Tony McNamara', rule: 'Screenplay' },
    { name: 'Kelly Marcel', rule: 'Story' }, { name: 'Aline Brosh McKenna', rule: 'Story' }]


    keywords = ["endrrrrrrrrrrrrrrrrrdf ffffff fgtg", "thriller", "catastrophe", "salvation", "thriller", "catastrophe", "thriller", "catastrophe"]


    componentDidMount() {
        this.props.dispatch(filmActions.getFilmCredits(632357));
        this.props.dispatch(filmActions.getFilmKeywords(632357));
        this.props.dispatch(filmActions.getFilmDetails(632357));
    }

    renderPosterOption = (icon, title, onclick) => {
        return (
            /* <Tooltip placement="bottom" title={title} color='#032541'> */
            <span onClick={onclick} class="posterListItem">
                {
                    icon === 'list' ? <IoListSharp /> :
                        icon === 'favorite' ? <MdFavorite /> :
                            icon === 'watchlist' ? <IoBookmark /> :
                                icon === 'rate' ? <IoStarSharp /> : null
                }
            </span>
            /*   </Tooltip> */
        )
    }

    caroselScroll = () => {
        let el = document.querySelector(".customCarosel")
        let scroll = el.scrollLeft
        if (scroll > 200) {
            this.setState({ blurEffect: false });
        }
        else this.setState({ blurEffect: true })
    }

    render() {
        let details = this.props.filmDetails
        return (
            details ?
                <>
                    <div class="filmPoster" >
                        <img src={"https://image.tmdb.org/t/p/w500" + details.poster_path} class="movieImg" />
                        <div class="filmDetails">
                            <span class="movieTitle">{details.title}<span class="releaseDate"> ({details.release_date.substring(0, 4)})</span> </span>
                            <span class="facts">
                                <span class="certificate">PG-13</span>
                                <span style={{ marginLeft: 5 }}>{details.genres.map((elm, i) => (i !== details.length && i !== 0 ? "," : "") + elm.name)} •
                                {Math.floor(details.runtime / 60) + "h " + details.runtime % 60 + "m"}</span>
                            </span>
                            <div class="filmOptionsDiv">
                                <span class="progressContainerInPoster">
                                    <CircularProgressbar
                                        value={details.vote_average * 10}
                                        text={`${details.vote_average * 10}%`}
                                        background
                                        backgroundPadding={5}
                                        strokeWidth={7}
                                        styles={buildStyles({
                                            backgroundColor: "#070f09",
                                            textColor: "#fff",
                                            pathColor: "#21d07a",
                                            trailColor: "transparent",
                                            textSize: 30,
                                        })}
                                    />
                                </span>
                                <span class="userScore">User Score</span>
                                {/* options */}
                                {
                                    this.posterOptions.map((elm) => this.renderPosterOption(elm.icon, elm.title, elm.onclick))
                                }
                                <span class="trailer">
                                    <IoCaretForwardSharp style={{ fontSize: 18, marginRight: 6 }} />
                                Play Trailer
                            </span>
                            </div>
                            <p class="tagline">{details.tagline}</p>
                            <h3 class="overview">Overview</h3>
                            <p class="oveviewTxt">{details.overview}</p>
                            <div class="filmPersons">
                                {
                                    this.persons.map((elm) => {
                                        return (
                                            <div>
                                                <div class="personName">{elm.name}</div>
                                                <div class="personRule">{elm.rule}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div class="mainContainer">
                        {/* cast carosel */}
                        <div class="cast">
                            <h3 class="castHeader">Series Cast</h3>
                            <ul class="customCarosel" onScroll={this.caroselScroll}>
                                {
                                    this.props.filmCredits.length && this.props.filmCredits.map((elm) => {
                                        return (
                                            < div class="singleCast">
                                                <img src={elm.profile_path ? "https://image.tmdb.org//t/p/w500" + elm.profile_path : null} class="castImg" />
                                                <div style={{ padding: 10 }}>
                                                    <p class="castName">{elm.name}</p>
                                                    <p class="castNameInFilm">{elm.character}</p>
                                                    {this.props.series && <p class="episodes">{elm.noOfEpisodes} Episodes</p>}
                                                </div>
                                            </div>
                                        )
                                    })}
                            </ul>
                            <h2 class="castFooter">Full Cast & Crew</h2>
                        </div>
                        {/* right menu */}
                        <div class={this.state.blurEffect ? "rightMenu" : "rightMenuWithoutBlur"}>
                            <div class="socialMediaIconsDiv">
                                {/* <Tooltip placement="top" title="Visit Facebook" color='#032541' style={{ cursor: 'pointer' }}> */}
                                <AiFillFacebook class="socialMediaIcon" />
                                {/* </Tooltip> */}
                                {/* <Tooltip placement="top" title="Visit Twitter" color='#032541' style={{ cursor: 'pointer' }}> */}
                                <FaTwitter class="socialMediaIcon" />
                                {/* </Tooltip> */}
                                {/*  <Tooltip placement="top" title="Visit Instagram" color='#032541' style={{ cursor: 'pointer' }}> */}
                                <FaInstagram class="socialMediaIcon" />
                                {/* </Tooltip> */}
                                <span style={{ borderRight: "1px solid grey", height: "50%", width: 5, marginRight: 5 }} />
                                {/*   <Tooltip placement="top" title="Visit Homepage" color='#032541' style={{ cursor: 'pointer' }}> */}
                                <BiLink class="socialMediaIcon" style={{ transform: "rotate(45deg)" }} />
                                {/*  </Tooltip> */}
                            </div>
                            <h1 class="rightMenuOption">Facts</h1>
                            <h1 class="rightMenuOption">Status</h1>
                            <span class="movieStatus">{details.status}</span>
                            {
                                this.props.series &&
                                <>
                                    <h1 class="rightMenuOption">Networks</h1>
                                    {
                                        details.production_companies.map((elm) =>
                                            elm.logo_path && <img src={`https://image.tmdb.org//t/p/h30${elm.logo_path}`} style={{ display: 'block', marginBottom: 3 }} />
                                        )
                                    }
                                    <h1 class="rightMenuOption" style={{ marginTop: 15 }}>Type</h1>
                                    <span class="movieStatus">Scripted</span>
                                </>
                            }
                            <h1 class="rightMenuOption">Original Language</h1>
                            <span class="movieStatus">{details.original_language === "en" ? "English" : details.original_language}</span>
                            {
                                !this.props.series &&
                                <>
                                    <h1 class="rightMenuOption">Budget</h1>
                                    <span class="movieStatus">${Intl.NumberFormat('en-US').format(details.budget)}</span>
                                    <h1 class="rightMenuOption">Revenue</h1>
                                    <span class="movieStatus">${Intl.NumberFormat('en-US').format(details.revenue)}</span>
                                </>

                            }
                            <h1 class="rightMenuOption" style={{ marginTop: 22 }}>Keywords</h1>
                            <div class="keywordsContainer">
                                {this.props.filmKeywords.map((elm) => {
                                    return (
                                        <span class="keyword">
                                            <p style={{ whiteSpace: 'nowrap', display: 'block', margin: 0, fontSize: 12 }}>{elm.name}</p>
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </>
                : null
        );
    }
}

const mapStateToProps = state => {
    let filmCredits = state.film.filmCredits;
    let filmKeywords = state.film.filmKeywords;
    let filmDetails = state.film.filmDetails

    return {
        filmCredits, filmKeywords, filmDetails
    };
};

export default connect(mapStateToProps)(FilmDetails);
