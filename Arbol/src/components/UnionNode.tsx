import { Handle, Position } from '@xyflow/react';
import { Baby } from 'lucide-react';
import type { UnionData } from '../types';

export default function UnionNode({ data, id }: { data: UnionData; id: string }) {
  return (
    <div className="group relative w-4 h-4 bg-slate-300 rounded-full border-2 border-white hover:bg-slate-400 transition-colors">
      <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !border-none" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !border-none" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-transparent !border-none" />

      {/* Hover Actions */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white border border-slate-200 rounded-md shadow-sm p-1 z-10">
        <button
          onClick={() => data.onAddChildUnion?.(id)}
          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded"
          title="Agregar Hijo (Unión)"
        >
          <Baby size={14} />
        </button>
      </div>

      {data.endDate && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 whitespace-nowrap bg-white px-1 rounded shadow-sm">
          Fin: {data.endDate}
        </div>
      )}
    </div>
  );
}
