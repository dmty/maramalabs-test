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
    return <li className="cursor-default">• {name}</li>;
  }

  return isOpen ? (
    <>
      <NodeTitle name={name} onClick={handleOpen} isOpen={isOpen} />
      <ul className="pl-4" role="group">
        {children.map((childNode) => (
          <Node key={childNode.id} node={childNode} />
        ))}
      </ul>
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
  <li
    tabIndex={0}
    role="button"
    onClick={onClick}
    aria-pressed={isOpen}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick(event as any);
      }
    }}
    className="hover:bg-gray-800"
  >
    {isOpen ? "▼" : "▶"} {name}
  </li>
);
