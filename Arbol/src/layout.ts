import dagre from 'dagre';
import type { Node, Edge } from '@xyflow/react';

export const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction, nodesep: 40, ranksep: 80 });

  const isHorizontal = (edge: Edge) => edge.sourceHandle === 'right' || edge.targetHandle === 'left';

  const nextHorizontal = new Map<string, string>();
  const prevHorizontal = new Map<string, string>();
  
  edges.forEach(e => {
    if (isHorizontal(e)) {
      nextHorizontal.set(e.source, e.target);
      prevHorizontal.set(e.target, e.source);
    }
  });

  const groups: string[][] = [];
  const visited = new Set<string>();

  nodes.forEach(node => {
    if (!visited.has(node.id) && !prevHorizontal.has(node.id)) {
      const chain: string[] = [];
      let curr: string | undefined = node.id;
      while (curr) {
        chain.push(curr);
        visited.add(curr);
        curr = nextHorizontal.get(curr);
      }
      groups.push(chain);
    }
  });

  const GROUP_SPACING = 20; // Shorter union lines
  const groupIdMap = new Map<string, string>();

  groups.forEach((chain, i) => {
    const groupId = `group_${i}`;
    chain.forEach(id => groupIdMap.set(id, groupId));
    
    let totalWidth = 0;
    let maxHeight = 0;
    chain.forEach(id => {
      const n = nodes.find(x => x.id === id)!;
      const w = n.type === 'person' ? 192 : 16;
      const h = n.type === 'person' ? 100 : 16;
      totalWidth += w;
      maxHeight = Math.max(maxHeight, h);
    });
    totalWidth += Math.max(0, chain.length - 1) * GROUP_SPACING;

    dagreGraph.setNode(groupId, { width: totalWidth, height: maxHeight });
  });

  edges.forEach((edge) => {
    if (!isHorizontal(edge)) {
      const sourceGroup = groupIdMap.get(edge.source)!;
      const targetGroup = groupIdMap.get(edge.target)!;
      // Prevent self loops in Dagre if a vertical edge connects nodes in the same group (shouldn't happen in our logic)
      if (sourceGroup !== targetGroup) {
        dagreGraph.setEdge(sourceGroup, targetGroup);
      }
    }
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const groupId = groupIdMap.get(node.id)!;
    const groupPos = dagreGraph.node(groupId);
    const chain = groups.find(c => c.includes(node.id))!;
    
    let totalWidth = 0;
    chain.forEach(id => {
      const n = nodes.find(x => x.id === id)!;
      const w = n.type === 'person' ? 192 : 16;
      totalWidth += w;
    });
    totalWidth += Math.max(0, chain.length - 1) * GROUP_SPACING;

    const startX = groupPos.x - totalWidth / 2;
    let currentX = startX;
    
    const newNode = { ...node };

    for (const id of chain) {
      const n = nodes.find(x => x.id === id)!;
      const w = n.type === 'person' ? 192 : 16;
      const h = n.type === 'person' ? 100 : 16;
      
      if (id === node.id) {
        newNode.position = {
          x: currentX,
          y: groupPos.y - h / 2,
        };
        break;
      }
      currentX += w + GROUP_SPACING;
    }

    return newNode;
  });

  return { nodes: newNodes, edges };
};
