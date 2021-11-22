import react from "../node_modules/react";
import React, { useState, useLayoutEffect } from "../node_modules/react";
import ReactDOM from "../node_modules/react-dom";
import "./index.css";

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
        <div>
            <textarea
                className='PadArea'
                id='Padbrowser'
                value={getContent}
                onChange={handleChange}
            />

            <ButtonSave note={getContent} />
        </div>
    );
}

const handleSaveClick = (e) => {
    var blob = new Blob([e.target.value], { type: "text/json" }),
        e = document.createEvent("MouseEvents"),
        a = document.createElement("a");

    a.download = "notes.txt";
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
    e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
    );
    a.dispatchEvent(e);
};

function ButtonSave(props) {
    return (
        <react.Fragment>
            <button
                className='savebutton'
                onClick={handleSaveClick}
                value={props.note}
            >
                Save
            </button>
        </react.Fragment>
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
