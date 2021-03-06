import React from "react";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import './create.css'
import _ from "lodash";


const ReactGridLayout = WidthProvider(Responsive);
const originalLayout = getFromLS("layout") || [];


/**
 * This layout demonstrates how to sync to localstorage.
 */
export default class LocalStorageLayout extends React.PureComponent {
  
  static defaultProps = {
    className: "layout",
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 30,
    compactType: null,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);
    
    this.state = {
        // layout: JSON.parse(JSON.stringify(originalLayout))
        layout: [1, 2, 3, 4, 6].map(function(i, key, list) {
          return {
            i : i.toString(),
            key: i,
            x : Number(i), y: Number(i)/2, w: 1, h: 1,
            add: i === (list.length - 1),
            class: "draggable"
          };
        }),
        toolboxElements: [
          {i: "t0", x: 1, y: 1, h: 1, maxH: 1, w: 1, class: "arrow_box"},
          {i: "t1", h: 1, w: 3, class: "draggable"}
        ],
        mounted: false,
        newCounter: 0,
        testCounter: 0,
        collisionState: false
      };
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }


  onAddItem = (elemParams) => {
    // let id = elementID;
    console.log("Beginning onAddItem");
    
    this.state.toolboxElements.filter((element) => {
      console.log("Searching for element...")
      if (element.i === "t0") {
        console.log("Element Found");
        var counter = this.state.newCounter;
        this.setState({
          layout: this.state.layout.concat([element.i]
            .map(function(i,key,list) {
              return {
                i: i.toString() + counter,
                key: i,
                // x: Number(elemParams[0]), y: Number(elemParams[1]), w: Number(elemParams[2]), h: Number(elemParams[3]), maxH: Number(elemParams[4]), 
                x: 1, y: 2, w: 2, h: 1, maxH: 1,
                add: i === (list.length-1),
                class: element.class
              }
            })
          ),
          newCounter: this.state.newCounter + 1
        });
      }
    });      
  }
  toggleCollision() {
    if(this.state.collisionState == false) {
      this.setState({
        collisionState: true
      })
    } else {
      this.setState({
        collisionState: false
      })
    }
  }

  resetLayout() {
    this.setState({
      layout:[]
    });
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
  }

  removeElement(el) {
    const removeStyle = { 
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? " + " : el.i
    return (
      <div key={i} data-grid={el}>
          <span className="remove" 
                style={removeStyle}
                onClick={this.onRemoveItem.bind(this, i)
          }>
            X
          </span>
      </div>
    )
  }

  onRemoveItem(i) {
    this.setState({ layout: _.reject(this.state.layout, { i: i})});
  }
    
    // if (this.state.testCounter != 0) {
    //   var arr = [...this.state.layout]
    //   var index = arr.indexOf(element);
    //   arr.splice(index, 1);
    //   this.setState({
    //     layout: arr
    //   });
    // } else {
    //   this.setState({
    //     testCounter: this.state.testCounter + 1
    //   });
    // }
  


  onBreakpointChange(breakpoint, cols) {
      this.setState({
        breakpoint: breakpoint,
        cols: cols
      });
  }

  onDragStart = (event, elementID) => {
      console.log('Beginning dragStart on div: ', elementID);
      event.dataTransfer.setData("elementID", elementID);
      console.log("Storing element ID: " + elementID);
  }
  // onDrop = (event) => {
  //   let elementID = event.dataTransfer.getData("elementID");
  //   console.log("Passing element ID: " + elementID + " to onAddItem method");
  //   this.onAddItem(elementID);
  // }
  onDrop = elemParams => {
    alert(`Element parameters:\n${JSON.stringify(elemParams, ['x', 'y', 'w', 'h', 'maxH'])}`);
    this.onAddItem(elemParams);
  }

  //=============================================================
  // render() {
  //   return (
  //     <div>
        
  //       <div>
  //         <button onClick={(event)=>this.resetLayout}>Reset Layout</button> 
  //         <button onClick={(event)=>this.onAddItem}>Add Element</button>
  //         <div id="container">

  //           <div id="toolbox">
  //             <div class="draggable" key="34" data-grid={{w: 2, h: 3, x: 0, y: 0}}>
  //               <span className="text">1</span>
  //             </div>
  //           </div>

  //           <div id="workspace">
  //             <ReactGridLayout
  //               {...this.props}
  //               layout={this.state.layout}
  //               onLayoutChange={this.onLayoutChange}
  //             >
  //               <div className="draggable" key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0 }}>
  //                 <span className="text">1</span>
  //               </div>
  //               <div className="draggable" key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0 }}>
  //                 <span className="text">2</span>
  //               </div>
  //               <div className="draggable" key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0 }}>
  //                 <span className="text">3</span>
  //               </div>
  //               <div className="arrow_box" key="4" data-grid={{ w: 2, h: 1, x: 6, y: 0, maxH: 1 }}>
  //                 <span className="text">4</span>
  //               </div>
  //               <div className="arrow_box" key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0 }}>
  //                 <span className="text">5</span>
  //               </div>
  //             </ReactGridLayout>
  //           </div>
  //          </div>
  //        </div>
  //      </div>
  //   );
  // }
  //=====================================================

  render() {
    var items = {
        template: [],
        agile: [],
        prince2: []      
    }
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

		this.state.layout.forEach ((item) => {
		  items["agile"].push(
        <div key={item.i} 
            data-grid={{w: item.w, h: item.h, x: item.x, y: item.y}}
            className = {item.class}
        >
          <span> {item.i} {item.x} {item.y}</span> 
        </div>
      );
    });

    // Pulls from the templates and creates div elements for them.
    this.state.toolboxElements.forEach ((temp) => {
      items["template"].push(
        <div key={temp.i} 
             data-grid={{w: temp.w, h: temp.h, x: temp.x, y: temp.y}}
             className = {temp.class}
             onDragStart = {(event) => this.onDragStart(event, temp.i)}
             draggable >
              <span> {temp.i} </span>
          </div>
      )
    });

  return (
      <div>
        <button  onClick={(event)=>this.onAddItem()}>Add Element</button>
        <button  onClick={(event)=>this.toggleCollision()}>Toggle Collision: {(!this.state.collisionState).toString()} </button>

        <div id="container">

          <div id="toolbox">
            {items.template}
          </div>

          <div id="workspace">
            <ReactGridLayout
            onLayoutchange={this.onLayoutChange.bind}
            isDroppable={true}
            onDrop={this.onDrop}
            // onDrop={(event)=>{this.onAddItem()}}
            onBreakpointChange={this.onBreakpointChange}
            {...this.props} 
            
            measureBeforeMount={false}
            useCSSTransforms={this.state.mounted}
            preventCollision={this.state.collisionState}
            // preventCollision={!this.state.compactType}
            >
              {items.agile}
              {_.map(this.state.layout, el => this.removeElement(el))}
            </ReactGridLayout>
          </div>
        </div>
      </div>
    )
  }
}



function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}