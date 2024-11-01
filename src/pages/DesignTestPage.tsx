import Button from "@/design-system/button/Button";
import Input from "@/design-system/input/Input";
import { Lock, Mail } from "lucide-react";

const DesignTestPage = () => {
  return (
    // Button test
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

      {/* Input test */}
      <h2 className="text-xl font-bold mt-8">Input Component Test</h2>
      {/* Size Variants */}
      <h3>Sizes</h3>
      <div className="flex flex-col gap-4">
        <Input size="sm" placeholder="Small Input" />
        <Input size="md" placeholder="Medium Input" />
        <Input size="lg" placeholder="Large Input" />
        <Input size="xl" placeholder="Extra Large Input" />
      </div>
      {/* Disabled */}
      <h3>Disabled State</h3>
      <Input placeholder="Disabled" disabled />
      {/* Icon */}
      <h3>With Icon</h3>
      <div className="flex flex-col gap-4">
        <Input placeholder="Email" icon={<Mail />} />
        <Input placeholder="Password" icon={<Lock />} type="password" />
      </div>
      {/* Error */}
      <h3>Error State</h3>
      <Input
        size="md"
        placeholder="Error Input"
        error="This is an error message"
      />
      {/* Full */}
      <h3>Full Width</h3>
      <div className="w-96">
        <Input size="md" placeholder="Full Width Input" full />
      </div>
      {/* Label */}
      <h3>With Label</h3>
      <Input placeholder="Labeled Input" label="Email" />
      {/* File Upload */}
      <h3>File Upload</h3>
      <Input
        size="md"
        type="file"
        accept="image/*"
        multiple
        placeholder="Select files"
      />
    </div>
  );
};

export default DesignTestPage;
