import { Handle, Position } from '@xyflow/react';
import { UserPlus, Baby, Edit2 } from 'lucide-react';
import type { PersonData } from '../types';

export default function PersonNode({ data, id }: { data: PersonData; id: string }) {
  return (
    <div className={`group relative w-48 bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-shadow ${data.borderColor || 'border-slate-200'}`}>
      {/* Handles for connections */}
      <Handle type="target" position={Position.Top} id="top" className="!bg-slate-300" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !border-none" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !border-none" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-slate-300" />

      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="font-semibold text-slate-800">{data.name || 'Sin nombre'}</h3>
        {(data.birthDate || data.deathDate) && (
          <p className="text-xs text-slate-500 mt-1">
            {data.birthDate || '?'} - {data.deathDate || '?'}
          </p>
        )}
      </div>

      {/* Hover Actions */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white border border-slate-200 rounded-md shadow-sm p-1 z-10">
        <button
          onClick={() => data.onEdit?.(id)}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded"
          title="Editar"
        >
          <Edit2 size={14} />
        </button>
        <button
          onClick={() => data.onAddPartner?.(id)}
          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded"
          title="Agregar Pareja"
        >
          <UserPlus size={14} />
        </button>
        <button
          onClick={() => data.onAddChildSingle?.(id)}
          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded"
          title="Agregar Hijo (Solo)"
        >
          <Baby size={14} />
        </button>
      </div>
    </div>
  );
}
