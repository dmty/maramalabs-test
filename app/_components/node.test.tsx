import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { DataNode } from "@/app/api/data";

import Node from "./node";

describe("Node Component", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Simple Node", () => {
    const simpleNode: DataNode = {
      id: "1",
      name: "Data node",
    };

    it("should render node title with • mark", () => {
      const { getAllByText } = render(<Node node={simpleNode} />);
      expect(getAllByText("• Data node").length).toBe(1);
    });
  });

  describe("Node with children", () => {
    const nodeWithChildren: DataNode = {
      id: "1",
      name: "Node with children",
      children: [
        {
          id: "2",
          name: "Child 1",
        },
        {
          id: "3",
          name: "Child 2",
        },
      ],
    };

    it("should render node title with ▶ mark", () => {
      const { getAllByText } = render(<Node node={nodeWithChildren} />);
      expect(getAllByText("▶ Node with children").length).toBe(1);
    });

    it("should not render children on initial render", () => {
      const { queryByText } = render(<Node node={nodeWithChildren} />);
      expect(queryByText("• Child")).toBeNull;
    });

    it("should change mark and show children on click", () => {
      const { getAllByText } = render(<Node node={nodeWithChildren} />);
      const nodeTitle = screen.getByRole("button");
      fireEvent.click(nodeTitle);
      expect(getAllByText("▼ Node with children").length).toBe(1);
      expect(getAllByText("• Child", { exact: false }).length).toBe(2);
    });
  });

  describe("Node with nested children", () => {
    const nodeWithNestedChildren: DataNode = {
      id: "1",
      name: "Top node",
      children: [
        {
          id: "2",
          name: "Child 1",
          children: [
            {
              id: "3",
              name: "Nested child 1",
            },
            {
              id: "4",
              name: "Nested child 2",
            },
          ],
        },
      ],
    };

    it("should open children when clicked", () => {
      const { getAllByText, getByText } = render(
        <Node node={nodeWithNestedChildren} />,
      );
      const topNodeTitle = screen.getByRole("button");
      fireEvent.click(topNodeTitle);
      expect(getAllByText("Child", { exact: false }).length).toBe(1);
      const openedChild = getByText("Child", { exact: false });
      fireEvent.click(openedChild);
      expect(getAllByText("• Nested child", { exact: false }).length).toBe(2);
    });
  });
});
