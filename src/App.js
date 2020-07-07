import React, { useEffect, useState } from "react";
import "./App.css";

const mxgraph = require("mxgraph")({
  mxImageBasePath: "mxgraph/javascript/src/images",
  mxBasePath: "mxgraph/javascript/src",
});

const { mxClient, mxUtils, mxCodec, mxConstants, mxEdgeStyle } = mxgraph;

export default function MyMxGraph() {
  const [graph, setGraph] = useState(null);

  const onShow = () => {
    var encoder = new mxCodec();
    var node = encoder.encode(graph.getModel());
    mxUtils.popup(mxUtils.getPrettyXml(node), true);
  };

  useEffect(() => {
    if (!mxClient.isBrowserSupported()) {
      mxUtils.error("Browser is not supported!", 200, false);
      return;
    }
    const container = document.querySelector("#mxcontainer");
    let newGraph = new mxgraph.mxGraph(container);
    let xmlString = `
    <mxGraphModel>
    <root>
      <mxCell id="0" />
      <mxCell id="1" parent="0" />
      <mxCell id="4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;" parent="1" source="2" target="3" edge="1">
        <mxGeometry relative="1" as="geometry" />
      </mxCell>
      <mxCell id="2" value="Hello" style="rounded=0;whiteSpace=wrap;html=1;" parent="1" vertex="1">
        <mxGeometry x="60" y="160" width="120" height="60" as="geometry" />
      </mxCell>
      <mxCell id="3" value="Richa" style="rounded=0;whiteSpace=wrap;html=1;" parent="1" vertex="1">
        <mxGeometry x="1030" y="650" width="120" height="60" as="geometry" />
      </mxCell>
    </root>
  </mxGraphModel>`;

    var doc = mxUtils.parseXml(xmlString);
    var codec = new mxCodec(doc);
    codec.decode(doc.documentElement, newGraph.getModel());
    // newGraph.fit();
    // newGraph.setPanning(true);
    // newGraph.setEnabled(false);
    // newGraph.setHtmlLabels(true);
    setGraph(newGraph);
    var vertexStyle = newGraph.getStylesheet().getDefaultVertexStyle();
    vertexStyle[mxConstants.ROUNDED] = true;
    var edgeStyle = newGraph.getStylesheet().getDefaultEdgeStyle();
    edgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;
  }, []);

  return (
    <div>
      <button onClick={onShow}>Show</button>
      <div id="mxcontainer"></div>
    </div>
  );
}
