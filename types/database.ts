// types/database.ts
export interface QueryResult {
  insertId: number;
  affectedRows: number;
  changedRows: number;
}

export interface UserIdResult {
  id: number;
}
