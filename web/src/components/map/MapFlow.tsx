import Dagre from "@dagrejs/dagre";
import {
  Controls,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect } from "react";

const MapFlow = (props: { nodes: Node[]; edges: Edge[] }) => {
  const initialNodes = [
    {
      id: "1", // required
      position: { x: 0, y: 0 }, // required
      data: { label: "Hello" }, // required
    },
    {
      id: "2",
      position: { x: 0, y: 0 },
      data: { label: "World" },
    },
    {
      id: "3",
      position: { x: 0, y: 0 },
      data: { label: "asd" },
    },
  ];

  const initialEdges = [
    { id: "1-2", source: "1", target: "2" },
    { id: "2-3", source: "2", target: "3" },
    { id: "3-2", source: "3", target: "2" },
    { id: "loop", source: "3", target: "1" },
  ];

  const nodeWidth = 150;
  const nodeHeight = 50;

  const getLayoutedElements = (nodes, edges, options) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: options.direction });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) => {
      console.log("measured", node.measured);
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
        console.log(node.data.label);
        console.log("x", position.x);
        console.log("y", position.y);
        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        // const x = position.x - (node.measured?.width ?? 0) / 2;
        // const y = position.y - (node.measured?.height ?? 0) / 2;
        const x = position.x - nodeWidth / 2;
        const y = position.y - nodeHeight / 2;
        console.log("x2", x);
        console.log("y2", y);

        return { ...node, position: { x, y } };
      }),
      edges,
    };
  };

  const { fitView } = useReactFlow();
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);

  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(props.nodes, props.edges, {
        direction,
      });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [props.nodes, props.edges],
  );

  useEffect(() => {
    // FIXME: Find a solid way to apply layout. This is a hack.
    console.log("apply layout");
    onLayout("TB");
  }, [props]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      colorMode="dark"
    >
      <Controls />
    </ReactFlow>
  );
};

export default MapFlow;
