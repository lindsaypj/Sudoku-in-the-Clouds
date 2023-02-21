import React from "react";
import SudokuBoard from "../components/boards/SudokuBoard";

import "../styles/css/home.css";
import "../styles/animation/clouds-animation.css";

const exampleBoard = [8,0,0,0,0,0,0,0,0,0,0,3,6,0,0,0,0,0,0,7,0,0,9,0,2,0,0,0,5,0,0,0,
                      7,0,0,0,0,0,0,0,4,5,7,0,0,0,0,0,1,0,0,0,3,0,0,0,1,0,0,0,0,6,8,0,
                      0,8,5,0,0,0,1,0,0,9,0,0,0,0,4,0,0];

function SudokuHome(props) {

    // Function to get either login or logout button
    function getLoginLogout() {
        if (props.user !== null && props.user !== undefined) {
            return (
                <button 
                    type={"button"}
                    className="btn btn-light mt-3 me-5 float-end"
                    onClick={() => {
                        sessionStorage.clear();
                        props.setUser(null);
                        sessionStorage.setItem('gameMode', "");
                        props.setGameMode("");
                    }}
                >Logout</button>
            );
        }
        else {
            return (
                <button 
                    type={"button"}
                    className="btn btn-light mt-3 me-5 float-end"
                    onClick={() => {
                        props.setNewUser(false);
                        sessionStorage.setItem('gameMode', props.GameModes.Account);
                        props.setGameMode(props.GameModes.Account);
                    }}
                >Login</button>
            );
        }
    }

    return (
        <div className="container-fluid home-body">
            <div className="d-block position-fixed w-100">
                {/* Menu button */}
                <button 
                    type={"button"}
                    className="btn btn-light m-3"
                    onClick={() => {
                        props.setMenuVisibility(true);
                        props.setInitialMenuPage("main");
                    }}
                >Menu</button>

                {/* Login button */}
                {getLoginLogout()}
            </div>
            <div className="sky-background row">
                {/* Header */}
                <div className="header row">
                <div id="clouds">
                    <div className="cloud x1"></div>
                    <div className="cloud x2"></div>
                    <div className="cloud x3"></div>
                    <div className="cloud x4"></div>
                    <div className="cloud x5"></div>
                </div>
                    <h1>Sudoku In the Clouds</h1>
                </div>

                {/* Project Info */}
                <div className="project-info row my-5 px-5">
                    <div className="col-12 order-md-1 text-center">
                        <p className="home-p">
                            Sudoku is a popular game in which you are given an incomplete board of numbers,
                            where each number is unique to its row, column, and group. The goal being to
                            complete the board. Sudoku In the Clouds is a place for you to relax, improve, or
                            compete with your sudoku skills.
                        </p>
                        {/* Play Button */}
                        <button 
                            className="btn btn-light btn-lg px-5"
                            onClick={() => {
                                props.setInitialMenuPage("game-modes");
                                props.setMenuVisibility(true);
                            }}
                        >Play</button>
                    </div>
                </div>
            </div>

            {/* Live Example */}
            <div className="home-example row">
                <div className="col-12 text-center">
                    <div className="d-inline-block shadow">
                        <SudokuBoard size={9} gameMode={"home"} initialBoard={exampleBoard} boardIndex={2} />
                    </div>
                </div>
            </div>

            {/* Account creation */}
            <div className="home-account row mt-5 pt-5">
                <div className="col-12 text-center px-1 px-md-5">
                    <p className="home-p">
                        With a free account, you can track your solving progress, personalize your game with
                        customizable themes, and conveniently remember your game preferences. Sign up today 
                        to take your Sudoku skills to the next level!
                    </p>

                    {/* Create Account button */}
                    <button
                        type={"button"}
                        className="btn btn-light btn-lg px-5 mx-2"
                        onClick={() => {
                            props.setNewUser(true);
                            sessionStorage.setItem('gameMode', props.GameModes.Account);
                            props.setGameMode(props.GameModes.Account);
                        }}    
                    >Create Account</button>
                </div>
            </div>

            {/* Coming Soon  */}
            <div className="coming-soon row px-5 mt-5">
                <div className="col-12 text-center pt-5">
                    <h2>Coming Soon...</h2>
                </div>

                {/* Blind Sudoku */}
                <div className="blind-sudoku col-12">
                    <h3>Blind Sudoku</h3>
                    <p className="home-p">
                        Not a fan of numbers? Try this challenging twist on Sudoku! There are no values
                        representing the cells on the board. Instead, when you select a tile, the matching
                        tiles will be highlighted. The board will only show you tiles that have values and
                        tiles that don't. You can either add to a selected group of tiles, or add a new
                        value to the board.
                    </p>
                </div>

                {/* Custom Styling */}
                <div className="custom-styles col-12">
                    <h3>Custom Styling</h3>
                    <p className="home-p">
                        Tired of the traditional black and white boards? Add some color with custom board
                        styles!
                    </p>
                </div>

            </div>

            {/* Bootstrap */}
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
                    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossOrigin="anonymous">
            </script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
                    integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossOrigin="anonymous">
            </script>
        </div>
    );
}

export default SudokuHome;