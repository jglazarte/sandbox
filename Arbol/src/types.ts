import type { Node, Edge } from '@xyflow/react';

export type PersonData = {
  name: string;
  birthDate?: string;
  deathDate?: string;
  borderColor?: string;
  onAddPartner?: (nodeId: string) => void;
  onAddChildSingle?: (nodeId: string) => void;
  onEdit?: (nodeId: string) => void;
};

export type UnionData = {
  endDate?: string;
  onAddChildUnion?: (unionId: string) => void;
};

export type PersonNodeType = Node<PersonData, 'person'>;
export type UnionNodeType = Node<UnionData, 'union'>;
export type FamilyNode = PersonNodeType | UnionNodeType;
export type FamilyEdge = Edge;
