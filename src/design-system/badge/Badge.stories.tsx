// Badge.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Design System/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: "Default Badge",
    variant: "default",
    appearance: "solid",
    shape: "pill",
  },
};

export const Variants = () => (
  <>
    <Badge variant="default">Default</Badge>
    <Badge variant="primary">Primary</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="accent">Accent</Badge>
  </>
);

export const Appearances = () => (
  <>
    <Badge appearance="solid">Solid default</Badge>
    <Badge appearance="outline">Outline default</Badge>
    <Badge appearance="solid" variant="secondary">
      Solid Secondary
    </Badge>
    <Badge appearance="outline" variant="secondary">
      Outline Secondary
    </Badge>
  </>
);

export const Shapes = () => (
  <>
    <Badge shape="pill">Pill Shape</Badge>
    <Badge shape="rounded">Rounded Shape</Badge>
  </>
);

export const CombinedStyles = () => (
  <>
    <Badge variant="primary" appearance="solid" shape="pill">
      Primary Pill Solid
    </Badge>
    <Badge variant="secondary" appearance="outline" shape="rounded">
      Secondary Rounded Outline
    </Badge>
    <Badge variant="accent" appearance="solid" shape="rounded">
      Accent Rounded Solid
    </Badge>
  </>
);
