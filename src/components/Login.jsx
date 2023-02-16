import React from "react";

export default function Login() {
    return (
        <div className="bg-light text-center mt-5">
            <h2 className="mb-4">Please Log In</h2>
            <form>
                <div className="d-block m-2">
                    <label>
                        <input type={"text"} className="form-control border-0" placeholder="Username" />
                    </label>
                </div>
                <div className="d-block m-2">
                    <label>
                        <input type={"password"} className="form-control border-0" placeholder="Password" />
                    </label>
                </div>
                
                <div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
}