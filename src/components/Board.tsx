import { useState, useEffect, useRef, useCallback } from "react";

import { CellInfo, CellType, Position } from "../lib/type";
import Cell from "./Cell";

interface BoardProps {
  rows: number;
  columns: number;
}

const Board = ({ rows, columns }: BoardProps) => {
  const [boards, setBoards] = useState<CellInfo[][]>([]);
  const userPos = useRef<Position>({ row: 0, col: 0 });
  const bombs = useRef<Record<number, number>>({});
  const explodes = useRef<Record<number, number>>({});

  const explode = useCallback(
    (row: number, col: number, cells: CellInfo[][], source: number) => {
      const dRows = [0, 0, 1, -1];
      const dCols = [1, -1, 0, 0];
      for (let i = 0; i < 4; i++) {
        let newRow = row;
        let newCol = col;
        for (let j = 0; j < 3; j++) {
          newRow += dRows[i];
          newCol += dCols[i];
          if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= columns)
            break;
          if (cells[newRow][newCol].type === CellType.Block) {
            j = 4;
          }
          if (cells[newRow][newCol].hasBomb) {
            cells[newRow][newCol].hasBomb = false;
            clearInterval(bombs.current[newRow * rows + newCol]);
            clearInterval(explodes.current[newRow * rows + newCol]);
            delete bombs.current[newRow * row + newCol];
            delete explodes.current[newRow * row + newCol];
            explode(newRow, newCol, cells, source);
          }
          cells[newRow][newCol].hasFlame = true;
          cells[newRow][newCol].source = source;
        }
      }
    },
    [columns, rows]
  );

  const move = useCallback(
    (dRow: number, dCol: number) => {
      const { row, col } = userPos.current;
      const newRow = row + dRow;
      const newCol = col + dCol;
      if (
        newRow >= 0 &&
        newRow < rows &&
        newCol >= 0 &&
        newCol < columns &&
        boards[newRow][newCol].type !== CellType.Block &&
        !boards[newRow][newCol].hasBomb
      ) {
        setBoards((prev) => {
          const newBoards = [...prev];
          newBoards[row][col].type = CellType.Empty;
          newBoards[newRow][newCol].type = CellType.User;
          return newBoards;
        });
        userPos.current.row = newRow;
        userPos.current.col = newCol;
      }
    },
    [boards, rows, columns]
  );

  useEffect(() => {
    const newBoards = new Array<CellInfo[]>(rows);
    for (let i = 0; i < rows; i++) {
      newBoards[i] = new Array<CellInfo>(columns);
      for (let j = 0; j < columns; j++) {
        newBoards[i][j] = {
          type: Math.random() > 0.7 ? CellType.Block : CellType.Empty,
          hasBomb: false,
          hasFlame: false,
        };
      }
    }
    const userRow = Math.floor(Math.random() * (rows - 1));
    const userCol = Math.floor(Math.random() * (columns - 1));
    newBoards[userRow][userCol].type = CellType.User;
    userPos.current.row = userRow;
    userPos.current.col = userCol;
    setBoards(newBoards);
  }, [rows, columns]);

  const onKeyPress = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      switch (event.key) {
        case "ArrowUp":
          move(-1, 0);
          break;
        case "ArrowDown":
          move(1, 0);
          break;
        case "ArrowLeft":
          move(0, -1);
          break;
        case "ArrowRight":
          move(0, 1);
          break;
        case " ": {
          const { row, col } = userPos.current;
          const id = row * rows + col;
          setBoards((prev) => {
            const newBoards = [...prev];
            newBoards[row][col].hasBomb = true;
            return newBoards;
          });
          bombs.current[id] = setTimeout(() => {
            setBoards((prev) => {
              const newBoards = [...prev];
              newBoards[row][col].hasBomb = false;
              newBoards[row][col].hasFlame = true;
              newBoards[row][col].source = id;
              explode(row, col, newBoards, id);
              return newBoards;
            });
          }, 3000);
          explodes.current[id] = setTimeout(() => {
            setBoards((prev) => {
              const newBoards = [...prev];
              for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                  if (newBoards[i][j].source === id) {
                    newBoards[i][j].hasFlame = false;
                    newBoards[i][j].type = CellType.Empty;
                    newBoards[i][j].source = undefined;
                    if (
                      i === userPos.current.row &&
                      j === userPos.current.col
                    ) {
                      alert("Finished!");
                      window.location.reload();
                    }
                  }
                }
              }
              return newBoards;
            });
          }, 3500);
          break;
        }
      }
    },
    [move, explode, rows, columns]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);

    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [onKeyPress]);

  return (
    <table>
      <tbody>
        {boards.map((row) => (
          <tr>
            {row.map((col) => (
              <td>
                <Cell data={col} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;
