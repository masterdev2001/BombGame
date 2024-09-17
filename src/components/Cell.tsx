import { CellInfo } from "../lib/type";

interface CellProps {
  data: CellInfo;
}

const Cell = ({ data }: CellProps) => {
  if (data.hasFlame) return <div className="cell flame" />;
  return (
    <div className={`cell ${data.type}`}>
      {data.hasBomb && <div className="cell bomb" />}
    </div>
  );
};

export default Cell;
