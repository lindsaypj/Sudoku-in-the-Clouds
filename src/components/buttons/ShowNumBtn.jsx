import React, { useEffect, useState } from "react";

import '../../styles/css/ShowNumBtn.css';

function ShowNumBtn(props) {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(!props.hideNums);
    }, [props.hideNums]); 

    return (
        <button 
            type="button"
            className={"btn shadow-sm p-2 text-center selected-"+selected}
            onClick={() => props.setHideNums(false)}
        >
            <div className="p-0 d-block">
                <div className="p-1 d-inline-block cell-1">
                    <span className="btn-cell">1</span>
                </div>
                <div className="p-1 d-inline-block cell-2">
                    <span className="btn-cell">2</span>
                </div>
            </div>
            <div className="p-0 d-flex">
                <div className="p-1 d-inline-block cell-3">
                    <span className="btn-cell">3</span>
                </div>
                <div className="p-1 d-inline-block cell-4">
                    <span className="btn-cell">4</span>
                </div>
            </div>
        </button>
    );
}

export default ShowNumBtn;