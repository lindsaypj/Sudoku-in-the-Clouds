import React from "react";

export default function BoolSetting({ setting, setSetting, name, desc, editing }) {

    if (!editing) {
        return (
            <div className="row">
                {/* Description */}
                <div className="col-12 col-md-6">
                    <p>
                        {name}: <span className="fw-bold">{String(setting)}</span>
                    </p>
                    <p>
                        {desc}
                    </p>
                </div>
                {/* Image examples */}
                <div className="col-12 col-md-6">

                </div>
            </div>
        );
    }
    else {
        return (
            <div className="row">
                {/* Description */}
                <div className="col-12 col-md-6">
                    <p>
                        {name}: <input 
                                    type={"checkbox"} 
                                    className="form-check-input" 
                                    checked={setting}
                                    onChange={(e) => {setSetting(e.target.checked)}}
                                />
                    </p>
                    <p>
                        {desc}
                    </p>
                </div>
                {/* Image examples */}
                <div className="col-12 col-md-6">

                </div>
            </div>
        );
    }
        
}