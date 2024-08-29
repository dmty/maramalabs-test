import { DataNode } from "@/app/api/data";
import Node from "./node";

type TreeProps = {
  data: DataNode[];
};

export default function Tree({ data }: TreeProps) {
  return data.map((node) => <Node key={node.id} node={node} />);
}
