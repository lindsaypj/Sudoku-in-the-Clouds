import React from "react";
import { useState, useEffect } from "react";
import SudokuBoard from "../components/boards/SudokuBoard";
import Loading from "../components/Loading.jsx";

function SudokuCasual(props) {
    const [isLoading, setLoading] = useState(true);
    const [initialBoard, setInitialBoard] = useState();

    // Function to get a random board from SudokuAPI
    // Use GET @ http://localhost:8080/sudoku/boards/random
    function fetchBoard() {
        const uri = "http://localhost:8080/sudoku/board/"+props.size+"x"+props.size;
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
                    console.log("ERROR: "+response.status+ " " + response.url);
                }
            })
            .then(function(board) {
                // Board should be int array
                // Return array with board data to be rendered inside board
                setLoading(false);
                setInitialBoard(board);
            })
            // Stop loading if error occured
            .catch( (e) => setLoading(false));
    }

    // Fetch the data on first render
    useEffect(() => {
        setLoading(true);
        fetchBoard();
    }, []);


    // Display the loading component if still loading, otherwise render board
    function getRender() {
        if (isLoading === true) {
            return <Loading />
        }
        else {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div>
                            <SudokuBoard size={props.size} initialBoard={initialBoard} boardIndex={10} />
                        </div>
                    </div>
                </div>
            );
        }
    }

    // Return SudokuCasual Component
    return (
        <div>
            {getRender()}
        </div>
    );
}

export default SudokuCasual;