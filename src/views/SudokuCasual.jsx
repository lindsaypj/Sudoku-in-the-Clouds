import React from "react";
import { useState } from "react";
import SudokuBoard from "../components/boards/SudokuBoard";

function SudokuCasual(props) {

    // Function to get a random board from SudokuAPI
    // Use GET @ http://localhost:8080/sudoku/boards/random
    function GETRandomBoard() {
        const uri = "http://localhost:8080/sudoku/board/"+props.size+"x"+props.size;
        console.log(uri);
        const params = {
            method: "get",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }

        // Send fetch request and wait for response
        fetch(uri, params)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    console.log("ERROR: "+response);
                }
            })
            .then(function(board) {
                // Board should be int array
                console.log(board);
            });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <SudokuBoard size={props.boardSize} initialData={GETRandomBoard()} />
            </div>
        </div>
    );
}

export default SudokuCasual;