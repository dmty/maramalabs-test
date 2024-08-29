import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import type { DataNode } from "@/app/api/data";

import Tree from "./tree";

describe("Tree Component", () => {
  afterEach(() => {
    cleanup();
  });
  const treeData: DataNode[] = [
    {
      id: "1",
      name: "Node 1",
    },
    {
      id: "2",
      name: "Node 2",
    },
    {
      id: "3",
      name: "Node 3",
      children: [
        {
          id: "4",
          name: "Node 4",
        },
        {
          id: "5",
          name: "Node 5",
          children: [
            {
              id: "6",
              name: "Node 6",
            },
          ],
        },
      ],
    },
  ];

  it("should be able to render a node array", () => {
    const { getAllByText } = render(<Tree data={treeData} />);
    expect(getAllByText("Node", { exact: false }).length).toBe(3);
  });
});
