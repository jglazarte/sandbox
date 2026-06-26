import { useCallback, useState, useRef, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
  useReactFlow,
  Panel,
} from '@xyflow/react';
import type { NodeChange, EdgeChange, Edge } from '@xyflow/react';
import { v4 as uuidv4 } from 'uuid';
import { Download, LayoutDashboard, X } from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

import PersonNode from './components/PersonNode';
import UnionNode from './components/UnionNode';
import { getLayoutedElements } from './layout';
import type { FamilyNode, PersonData, UnionData } from './types';

const nodeTypes = {
  person: PersonNode,
  union: UnionNode,
};

const BRANCH_COLORS = [
  'border-blue-500',
  'border-emerald-500',
  'border-purple-500',
  'border-amber-500',
  'border-rose-500',
  'border-cyan-500',
  'border-orange-500',
];

function Flow() {
  const { fitView } = useReactFlow();
  const flowRef = useRef<HTMLDivElement>(null);
  
  const [nodes, setNodes] = useState<FamilyNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange<FamilyNode>[]) => setNodes((nds) => applyNodeChanges(changes, nds) as FamilyNode[]),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const runLayout = (currentNodes: FamilyNode[], currentEdges: Edge[]) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(currentNodes, currentEdges);
    setNodes([...layoutedNodes] as FamilyNode[]);
    setEdges([...layoutedEdges]);
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 800 });
    }, 50);
  };

  const onLayout = () => {
    runLayout(nodes, edges);
  };

  const actionsRef = useRef<any>({});

  const handleEdit = (id: string) => {
    setEditingNodeId(id);
  };

  const handleAddPartner = (nodeId: string) => {
    const sourceNode = nodes.find(n => n.id === nodeId);
    const existingColor = (sourceNode?.data as PersonData)?.borderColor;
    const colorToUse = existingColor || BRANCH_COLORS[0];

    const newPartnerId = uuidv4();
    const unionId = uuidv4();

    const newPartner: FamilyNode = {
      id: newPartnerId,
      type: 'person',
      position: { x: 0, y: 0 },
      data: { 
        name: 'Nueva Pareja', 
        borderColor: colorToUse,
        onEdit: (id) => actionsRef.current.handleEdit(id), 
        onAddPartner: (id) => actionsRef.current.handleAddPartner(id), 
        onAddChildSingle: (id) => actionsRef.current.handleAddChildSingle(id) 
      }
    };

    const newUnion: FamilyNode = {
      id: unionId,
      type: 'union',
      position: { x: 0, y: 0 },
      data: { onAddChildUnion: (id) => actionsRef.current.handleAddChildUnion(id) }
    };

    const edge1: Edge = {
      id: `e-${nodeId}-${unionId}`,
      source: nodeId,
      target: unionId,
      sourceHandle: 'right',
      targetHandle: 'left',
      type: 'smoothstep',
      style: { stroke: '#cbd5e1', strokeWidth: 2 }
    };

    const edge2: Edge = {
      id: `e-${unionId}-${newPartnerId}`,
      source: unionId,
      target: newPartnerId,
      sourceHandle: 'right',
      targetHandle: 'left',
      type: 'smoothstep',
      style: { stroke: '#cbd5e1', strokeWidth: 2 }
    };

    runLayout([...nodes, newUnion, newPartner], [...edges, edge1, edge2]);
  };

  const handleAddChildSingle = (nodeId: string) => {
    const sourceNode = nodes.find(n => n.id === nodeId);
    const existingColor = (sourceNode?.data as PersonData)?.borderColor;
    
    let colorToUse = existingColor;
    if (!colorToUse) {
       const existingChildrenCount = edges.filter(e => e.source === nodeId && e.targetHandle === 'top').length;
       colorToUse = BRANCH_COLORS[existingChildrenCount % BRANCH_COLORS.length];
    }

    const childId = uuidv4();
    
    const newChild: FamilyNode = {
      id: childId,
      type: 'person',
      position: { x: 0, y: 0 },
      data: { 
        name: 'Hijo', 
        borderColor: colorToUse,
        onEdit: (id) => actionsRef.current.handleEdit(id), 
        onAddPartner: (id) => actionsRef.current.handleAddPartner(id), 
        onAddChildSingle: (id) => actionsRef.current.handleAddChildSingle(id) 
      }
    };

    const edge: Edge = {
      id: `e-${nodeId}-${childId}`,
      source: nodeId,
      target: childId,
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'smoothstep',
      style: { stroke: '#cbd5e1', strokeWidth: 2 }
    };

    runLayout([...nodes, newChild], [...edges, edge]);
  };

  const handleAddChildUnion = (unionId: string) => {
    const parentEdges = edges.filter(e => e.target === unionId);
    let colorToUse = BRANCH_COLORS[0];
    if (parentEdges.length > 0) {
       const p1 = nodes.find(n => n.id === parentEdges[0].source);
       colorToUse = (p1?.data as PersonData)?.borderColor || BRANCH_COLORS[0];
    }

    const childId = uuidv4();
    
    const newChild: FamilyNode = {
      id: childId,
      type: 'person',
      position: { x: 0, y: 0 },
      data: { 
        name: 'Hijo', 
        borderColor: colorToUse,
        onEdit: (id) => actionsRef.current.handleEdit(id), 
        onAddPartner: (id) => actionsRef.current.handleAddPartner(id), 
        onAddChildSingle: (id) => actionsRef.current.handleAddChildSingle(id) 
      }
    };

    const edge: Edge = {
      id: `e-${unionId}-${childId}`,
      source: unionId,
      target: childId,
      sourceHandle: 'bottom',
      targetHandle: 'top',
      type: 'smoothstep',
      style: { stroke: '#cbd5e1', strokeWidth: 2 }
    };

    runLayout([...nodes, newChild], [...edges, edge]);
  };

  actionsRef.current = { handleEdit, handleAddPartner, handleAddChildSingle, handleAddChildUnion };

  // Initial node
  useEffect(() => {
    if (nodes.length === 0) {
      const initialNodeId = uuidv4();
      setNodes([
        {
          id: initialNodeId,
          type: 'person',
          position: { x: 400, y: 200 },
          data: {
            name: 'Persona 1',
            onEdit: (id) => actionsRef.current.handleEdit(id),
            onAddPartner: (id) => actionsRef.current.handleAddPartner(id),
            onAddChildSingle: (id) => actionsRef.current.handleAddChildSingle(id),
          },
        },
      ]);
    }
  }, []);

  const exportPdf = async () => {
    const flowElement = flowRef.current?.querySelector('.react-flow') as HTMLElement;
    if (!flowElement) return;

    try {
      const dataUrl = await toPng(flowElement, { 
        backgroundColor: '#f8fafc',
        pixelRatio: 2,
        filter: (node) => {
          if (node?.classList?.contains('react-flow__panel') || node?.classList?.contains('react-flow__controls')) {
            return false;
          }
          return true;
        }
      });
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [flowElement.offsetWidth, flowElement.offsetHeight]
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, flowElement.offsetWidth, flowElement.offsetHeight);
      pdf.save('arbol-genealogico.pdf');
    } catch (err) {
      console.error('Error exporting PDF', err);
      alert('Error al exportar PDF. Intente alejar el zoom un poco antes de exportar.');
    }
  };

  const editingNode = nodes.find(n => n.id === editingNodeId);

  return (
    <div className="w-screen h-screen flex" ref={flowRef}>
      <div className="flex-1 h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
        >
          <Background color="#cbd5e1" gap={16} />
          <Controls className="!bg-white !shadow-sm !border !border-slate-200" />
          
          <Panel position="top-right" className="flex gap-2">
            <button
              onClick={onLayout}
              className="flex items-center gap-2 bg-white px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
            >
              <LayoutDashboard size={16} /> Auto-Organizar
            </button>
            <button
              onClick={exportPdf}
              className="flex items-center gap-2 bg-slate-900 px-4 py-2 text-sm font-medium text-white border border-slate-900 rounded-lg shadow-sm hover:bg-slate-800 transition-colors"
            >
              <Download size={16} /> Exportar PDF
            </button>
          </Panel>
        </ReactFlow>
      </div>

      {/* Sidebar Editor */}
      {editingNode && (
        <div className="w-80 h-full bg-white border-l border-slate-200 shadow-xl flex flex-col p-6 z-10 transition-transform">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-800">
              {editingNode.type === 'person' ? 'Editar Persona' : 'Editar Unión'}
            </h2>
            <button onClick={() => setEditingNodeId(null)} className="text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {editingNode.type === 'person' ? (
              <>
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Nombre
                  <input
                    type="text"
                    value={(editingNode.data as PersonData).name || ''}
                    onChange={(e) => {
                      setNodes(nds => nds.map(n => n.id === editingNode.id ? { ...n, data: { ...n.data, name: e.target.value } as any } : n));
                    }}
                    className="mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Año de Nacimiento
                  <input
                    type="text"
                    placeholder="Ej. 1950"
                    value={(editingNode.data as PersonData).birthDate || ''}
                    onChange={(e) => {
                      setNodes(nds => nds.map(n => n.id === editingNode.id ? { ...n, data: { ...n.data, birthDate: e.target.value } as any } : n));
                    }}
                    className="mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                  Año de Defunción
                  <input
                    type="text"
                    placeholder="Ej. 2020 (opcional)"
                    value={(editingNode.data as PersonData).deathDate || ''}
                    onChange={(e) => {
                      setNodes(nds => nds.map(n => n.id === editingNode.id ? { ...n, data: { ...n.data, deathDate: e.target.value } as any } : n));
                    }}
                    className="mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </label>
              </>
            ) : (
              <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Fecha de Fin (opcional)
                <input
                  type="text"
                  placeholder="Ej. 1990"
                  value={(editingNode.data as UnionData).endDate || ''}
                  onChange={(e) => {
                    setNodes(nds => nds.map(n => n.id === editingNode.id ? { ...n, data: { ...n.data, endDate: e.target.value } as any } : n));
                  }}
                  className="mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </label>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
