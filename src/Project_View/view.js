import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './view.css';


function Arrow(props) {
    const style = {
        stroke: "black",
        strokeWidth: 3,
        gridColumn: props.col,
        gridRow: props.row,
        marginLeft: props.left,
        marginTop: props.top,
        zIndex: 5,
    };
    return (
        <svg width="25" height="25" style={style}>
            <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
                    markerWidth="6" markerHeight="6"
                    orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" strokeWidth="1" />
                </marker>
            </defs>
            <line x1={props.x1} x2={props.x2} y1={props.y1} y2={props.y2} markerEnd="url(#arrow)"/>
        </svg>
    );
}

function Line(props) {
    const divStyle = {
        width: '0px',
        border: '2px solid lightgrey',
        gridColumn: props.col,
        gridRow: props.row
    }
    return (
        <div style={divStyle}>
        </div>
    );
}

class Module extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: props.value,
            display: false,
            css: {gridColumn: props.col,
                  gridRow: props.row,
                  height: "100%",},
            backgroundColor: "white",
            height: props.height,
            selectValue: "complete",

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({selectValue: event.target.value});
    }

    handleSubmit(event) {
        if(this.state.selectValue == "complete") {
            this.setState({backgroundColor: "lightgreen"});
        } else if(this.state.selectValue == "inProgress") {
            this.setState({backgroundColor: "yellow"});
        } else {
            this.setState({backgroundColor: "white"});
        }
        this.setState({display: false});
    }

    render() {
        return (
          <div style={this.state.css}>
            <div className={this.state.values[0]} style={{backgroundColor: this.state.backgroundColor, height: this.state.height}} onClick={() => this.setState({display: !this.state.display})}>
                {this.state.values[1]}
            </div>
            {this.state.display &&
                <div className="hiddenForm">
                    <form onSubmit={this.handleSubmit}>
                        <select value={this.state.selectValue} onChange={this.handleChange} id="complete">
                            <option value="complete">Complete</option>
                            <option value="inProgress">In-Progress</option>
                            <option value="reset">Reset</option>
                        </select>
                        <br />
                        <input type="submit" />
                    </form>
                </div>}
          </div>
        );
    }
}

class View extends Component {
    render() {
        return (
            <div>
                <div className="grid">
                    <Line row="4 / 11" col="1" />
                    <Line row="4 / 11" col="3" />
                    <Line row="4 / 11" col="6" />
                    <Line row="4 / 11" col="15" />

                    <Arrow row="1" col="2" x1="10" x2="10" y1="0" y2="15" top="-7" left="40" />
                    <Arrow row="2" col="3" x1="0" x2="15" y1="10" y2="10" top="40" left="-10" />
                    <Arrow row="3" col="4" x1="10" x2="10" y1="0" y2="15" top="-7" left="20" />
                    <Arrow row="3" col="5" x1="10" x2="10" y1="25" y2="10" top="-11" left="50" />
                    <Arrow row="4" col="6" x1="0" x2="15" y1="10" y2="10" top="40" left="-10" />
                    <Arrow row="3" col="8" x1="10" x2="10" y1="25" y2="10" top="-11" left="50" />
                    <Arrow row="3" col="10" x1="10" x2="10" y1="0" y2="15" top="-7" left="20" />
                    <Arrow row="4" col="9" x1="24" x2="9" y1="10" y2="10" top="40" left="-10" />
                    <Arrow row="4" col="12" x1="0" x2="15" y1="10" y2="10" top="40" left="-10" />
                    <Arrow row="5" col="10" x1="10" x2="10" y1="0" y2="15" top="-7" left="20" />
                    <Arrow row="5" col="11" x1="10" x2="10" y1="25" y2="10" top="-11" left="50" />
                    <Arrow row="3" col="13" x1="10" x2="10" y1="25" y2="10" top="-11" left="20" />
                    <Arrow row="6" col="8" x1="10" x2="10" y1="25" y2="10" top="20" left="60" />

                    <Module value={["largeModule", "Starting up a Project"]} row="2 / 5" col="2" height="140px"/>
                    <Module value={["largeModule", "Directing a Project"]} row="2" col="4 / 14" height="40px"/>
                    <Module value={["largeModule", "Initiating a Project"]} row="4" col="4 / 6" height="40px"/>
                    <Module value={["largeModule", "Managing a Stage Boundary"]} row="4" col="7 / 9" height="40px"/>
                    <Module value={["largeModule", "Controlling a Stage"]} row="4" col="10 / 12" height="40px"/>
                    <Module value={["largeModule", "Closing a Project"]} row="4" col="13 / 15" height="40px"/>
                    <Module value={["largeModule", "Managing Project Delivery"]} row="6" col="10 / 12" height="40px"/>

                    <div style={{gridArea: "8 / 4 / 10 / 6"}}>
                        <div className="agileGrid">
                            <Module value={["smallModule", "IP"]} row="3" col="1 / 4" height="25px"/>
                            <Module value={["smallModule", "SB"]} row="3" col="4" height="25px"/>
                            <Module value={["smallModule", "CS"]} row="4" col="6 / 26" height="25px" />
                            <Module value={["smallModule", "MPD"]} row="5" col="6 / 14" height="25px" />
                            <Module value={["smallModule", "MPD"]} row="5" col="18 / 26" height="25px" />
                            <Module value={["smallModule", "SB"]} row="3" col="20 / 26" height="25px" />
                            <Module value={["smallModule", "MPD"]} row="9" col="9 / 24" height="25px" />
                            <Module value={["smallModule", "CS"]} row="4" col="27 / 49" height="25px" />
                            <Module value={["smallModule", "MPD"]} row="5" col="27 / 35" height="25px" />
                            <Module value={["smallModule", "MPD"]} row="6" col="34 / 42" height="25px" />
                            <Module value={["smallModule", "SB"]} row="3" col="43 / 49" height="25px" />
                            <Module value={["smallModule", "MPD"]} row="9" col="30 / 53" height="25px" />
                            <Module value={["smallModule", "CS"]} row="4" col="53 / 71" height="25px" />
                            <Module value={["smallModule", "MPD"]} row="5" col="53 / 61" height="25px" />
                            <Module value={["smallModule", "CP"]} row="3" col="65 / 71" height="25px" />
                            <Module value={["smallModule", "SB"]} row="3" col="49 / 54" height="25px" />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}






ReactDOM.render(<View />,  document.getElementById('root'));
export default View;
