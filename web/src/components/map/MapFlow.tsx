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
  const nodeWidth = 150;
  const nodeHeight = 50;

  const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
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

  const { fitView } = useReactFlow();
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);

  const onLayout = useCallback(() => {
    const layouted = getLayoutedElements(props.nodes, props.edges);

    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);

    window.requestAnimationFrame(() => {
      fitView();
    });
  }, [props.nodes, props.edges]);

  useEffect(() => {
    // FIXME: Find a solid way to apply layout. This is a hack.
    onLayout();
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
