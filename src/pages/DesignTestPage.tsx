import Button from "@/design-system/button/Button";

const DesignTestPage = () => {
  return (
    <div className="flex flex-col gap-5 items-start">
      <h1 className="text-xl font-bold">Button Component Test</h1>

      <h2>Variants</h2>
      <div className="flex gap-4">
        <Button variant="solid">Solid Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="link">Link Button</Button>
      </div>

      <h2>Sizes</h2>
      <div className="flex gap-3">
        <Button size="sm">Small Button</Button>
        <Button size="md">Medium Button</Button>
        <Button size="lg">Large Button</Button>
        <Button size="xl">Extra Large Button</Button>
      </div>

      <h2>Disabled State</h2>
      <Button variant="solid" disabled size="md">
        Disabled Button
      </Button>
    </div>
  );
};

export default DesignTestPage;
