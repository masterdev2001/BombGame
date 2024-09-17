import { ChangeEvent, useState } from "react";

import Board from "./components/Board";

const App = () => {
  const [rows, setRows] = useState(7);
  const [cols, setCols] = useState(7);

  const onChangeRow = (event: ChangeEvent<HTMLInputElement>) =>
    setRows(Number(event.target.value));
  const onChangeCol = (event: ChangeEvent<HTMLInputElement>) =>
    setCols(Number(event.target.value));

  return (
    <div>
      <div>
        <div>
          <label>Rows:</label>
          <input type="number" value={rows} onChange={onChangeRow} />
        </div>
        <div>
          <label>Columns:</label>
          <input type="number" value={cols} onChange={onChangeCol} />
        </div>
      </div>

      <Board rows={rows} columns={cols} />
    </div>
  );
};

export default App;
