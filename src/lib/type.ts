export enum CellType {
  Empty = "empty",
  Block = "block",
  User = "user",
}

export interface CellInfo {
  type: CellType;
  hasBomb: boolean;
  hasFlame: boolean;
  source?: number;
}

export interface Position {
  row: number;
  col: number;
}
