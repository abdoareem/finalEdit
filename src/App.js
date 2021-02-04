import React, { useReducer, useState } from "react";

import reducer from "./Reducers/reducer";

import AZCollapse from "./Components/AZCollapse";
import Diagram from "./Components/Diagram";
import RegionSelector from "./Components/Input/RegionSelector";

import "antd/dist/antd.css";
import "./App.css";

import { Button } from "antd";
import ServicesSelector from "./Components/Input/ServicesSelector";

function App() {
  const [numAZs, setNumAZs] = useState(2);
  const [services, setServices] = useState([]); // AZ agnostic services

  function onServicesChange(services) {
    setServices(services);
  }

  const initialState = {
    region: "AP-SOUTHEAST-1",
    AZs: [
      {
        name: "AP-SOUTHEAST-1a",
        NATType: "AWS::EC2::NatGateway",
        privateSubnets: [],
        publicSubnets: [],
      },
    ],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  function download() {
    const svgEl = document.getElementById("svg");
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "diagram.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const servicesOptions = [
    { label: "S3", value: "S3"},
    { label: "EC2", value: "EC2" },
    { label: "GuardDuty", value: "GuardDuty" },
  ];

  return (
    <div className="App">
      <h1>VPC DIAGRAM GENERATOR</h1>
      <div className="rowContainer">
        <div className="inputContainer">
          <div className="inputRow">
            <div>Region</div>
            <RegionSelector onChangeRegion={()=>{
              setServices([]);
            }} dispatch={dispatch} setNumAZs={setNumAZs} />
          </div>
          <div className="inputRow">
            <div>Availability Zones</div>
            <div>{numAZs}</div>
          </div>
          <div className="inputCol">
            <AZCollapse AZs={state.AZs} dispatch={dispatch} />
            <Button
              block
              disabled={state.AZs.length >= numAZs}
              onClick={() => dispatch({ type: "ADD_AZ" })}
            >
              Add Availability Zone
            </Button>
          </div>
          <ServicesSelector options={servicesOptions} onServicesChange={onServicesChange} />
          <div className="inputRow">
            <Button block shape="round" onClick={download}>
              Download
            </Button>
          </div>
        </div>
        <Diagram AZs={state.AZs} />
      </div>
    </div>
  );
}

export default App;
