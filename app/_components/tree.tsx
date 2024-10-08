import { DataNode } from "@/app/api/data";
import Node from "./node";
import { use } from "react";

type TreeProps = {
  dataRequest: Promise<DataNode[]>;
};

export default function Tree({ dataRequest }: TreeProps) {
  const data = use(dataRequest);

  return (
    <ul role="tree">
      {data.map((node) => (
        <Node key={node.id} node={node} />
      ))}
    </ul>
  );
}
