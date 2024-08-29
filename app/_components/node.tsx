"use client";

import { MouseEvent, useState } from "react";
import { DataNode } from "@/app/api/data";

type NodeProps = {
  node: DataNode;
};

export default function Node({ node }: NodeProps) {
  const { name, children } = node;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => setIsOpen(!isOpen);

  if (!children?.length) {
    return <div>• {name}</div>;
  }

  return isOpen ? (
    <>
      <NodeTitle name={name} onClick={handleOpen} isOpen={isOpen} />
      <div className="pl-4">
        {children.map((childNode) => (
          <Node key={childNode.id} node={childNode} />
        ))}
      </div>
    </>
  ) : (
    <NodeTitle name={name} onClick={handleOpen} isOpen={isOpen} />
  );
}

type NodeTitleProps = {
  isOpen: boolean;
  name: string;
  onClick: (event: MouseEvent<HTMLElement>) => void;
};

const NodeTitle = ({ isOpen, name, onClick }: NodeTitleProps) => (
  <div tabIndex={0} role="button" onClick={onClick} aria-pressed={isOpen}>
    {isOpen ? "▼" : "▶"} {name}
  </div>
);
