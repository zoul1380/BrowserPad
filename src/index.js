import React, { useState, useLayoutEffect } from "../node_modules/react";
import ReactDOM from "../node_modules/react-dom";
import style from "./index.css";

function LocalSave(props) {
    const [getName, setName] = useState(props.savename);
    return (
        <input
            id='namebox'
            className='namebox'
            onChange={(e) => setName(e.target.value)}
            value={getName}
        />
    );
}

function BrowserPad(props) {
    const [getContent, setContent] = useState(
        localStorage.getItem(props.padname)
    );

    if (getContent === undefined) {
        setContent("");
    }

    const handleChange = (e) => {
        localStorage.setItem(props.padname, e.target.value);
        setContent(e.target.value);
    };

    return (
        <textarea
            className='PadArea'
            id='Padbrowser'
            value={getContent}
            onChange={handleChange}
        />
    );
}

class MainCanvas extends React.Component {
    render() {
        return (
            <div>
                <BrowserPad padname='padpaper' />
            </div>
        );
    }
}

ReactDOM.render(<MainCanvas savename='test' />, document.getElementById("app"));
