import Dagre from "@dagrejs/dagre";
import {
  applyNodeChanges,
  Controls,
  Edge,
  Node,
  NodeChange,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect } from "react";
import useConnectionData from "./data/useConnectionData";

const getLaidOutElements = (nodes: Node[], edges: Edge[]) => {
  const nodeWidth = 150;
  const nodeHeight = 50;

  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB" });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => {
    g.setNode(node.id, {
      ...node,
      // width: node.measured?.width ?? 0,
      width: nodeWidth,
      // height: node.measured?.height ?? 0,
      height: nodeHeight,
    });
  });

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      // const x = position.x - (node.measured?.width ?? 0) / 2;
      // const y = position.y - (node.measured?.height ?? 0) / 2;
      const x = position.x - nodeWidth / 2;
      const y = position.y - nodeHeight / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const MapFlow = () => {
  const { edges, nodes } = useConnectionData();

  const { fitView } = useReactFlow();
  const [nodesState, setNodes] = useNodesState<Node>([]);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((oldNodes) => applyNodeChanges(changes, oldNodes));
      fitView();
    },
    [setNodes, fitView],
  );

  const arrange = useCallback(() => {
    console.log("arrange");
    const laidOut = getLaidOutElements(nodes, edges);
    setNodes(laidOut.nodes);
    setEdges(laidOut.edges);
  }, [setEdges, setNodes, nodes, edges]);

  console.log("nodesState", nodesState);

  useEffect(() => {
    arrange();
  }, [nodes, arrange]);

  return (
    <ReactFlow
      nodes={nodesState}
      edges={edgesState}
      // Change functions are necessary for interactivity. Node focus (vanilla) does not seem to work without them.
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      colorMode="dark"
      fitView={true}
      nodesDraggable={false}
      nodesConnectable={false}
      deleteKeyCode={null}
    >
      <Controls />
    </ReactFlow>
  );
};

export default MapFlow;
