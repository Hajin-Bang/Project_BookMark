import Badge from "@/design-system/badge/Badge";
import Button from "@/design-system/button/Button";
import Input from "@/design-system/input/Input";
import Select from "@/design-system/select/components/Select";
import Textarea from "@/design-system/textarea/Textarea";
import { useToast } from "@/design-system/toast/ToastContext";
import { Lock, Mail } from "lucide-react";

const DesignTestPage = () => {
  const { addToast } = useToast();

  const showToast = (
    title: string,
    variant: "success" | "error" | "info",
    duration = 3000
  ) => {
    addToast({
      title,
      variant,
      duration,
    });
  };

  return (
    // -----------------Button test-----------------
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

      {/* -----------------Input test----------------- */}
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

      {/* -----------------Textarea Test----------------- */}
      <h2 className="text-xl font-bold mt-8">Textarea Component Test</h2>
      {/* Resize */}
      <h3>Resize</h3>
      <div className="flex flex-col gap-4">
        <Textarea placeholder="No Resize" resize="none" />
        <Textarea placeholder="Vertical Resize" resize="vertical" />
        <Textarea placeholder="Horizontal Resize" resize="horizontal" />
        <Textarea placeholder="Both Resize" resize="both" />
      </div>

      {/* Appearance */}
      <h3>Appearance Options</h3>
      <div className="flex flex-col gap-4">
        <Textarea placeholder="Standard Appearance" appearance="standard" />
        <Textarea placeholder="No Border Appearance" appearance="none" />
      </div>

      {/* Disabled */}
      <h3>Disabled</h3>
      <Textarea placeholder="Disabled Textarea" disabled />

      {/* Error */}
      <h3>Error</h3>
      <Textarea
        placeholder="Error Textarea"
        error="This is an error message for the textarea"
      />

      {/* Label */}
      <h3>Label</h3>
      <Textarea label="Description" placeholder="Textarea with a label" />

      {/* -----------------Badge Test----------------- */}
      <h2 className="text-xl font-bold mt-8">Badge Component Test</h2>
      <h3>Variants</h3>
      <div className="flex gap-4">
        <Badge variant="default">default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="accent">accent</Badge>
      </div>

      <h3>Appearance</h3>
      <div className="flex gap-4">
        <Badge variant="primary" appearance="solid">
          Solid Primary
        </Badge>
        <Badge variant="primary" appearance="outline">
          Outline Primary
        </Badge>
        <Badge variant="secondary" appearance="solid">
          Solid Secondary
        </Badge>
        <Badge variant="secondary" appearance="outline">
          Outline Secondary
        </Badge>
        <Badge variant="accent" appearance="solid">
          Solid Accent
        </Badge>
        <Badge variant="accent" appearance="outline">
          Outline Accent
        </Badge>
      </div>

      <h3>Shapes</h3>
      <div className="flex gap-4">
        <Badge variant="default" shape="rounded">
          Rounded Default
        </Badge>
        <Badge variant="primary" shape="rounded">
          Rounded Primary
        </Badge>
        <Badge variant="secondary" shape="rounded">
          Rounded Secondary
        </Badge>
        <Badge variant="accent" shape="rounded">
          Pill Accent
        </Badge>
      </div>

      {/* -----------------Select Test----------------- */}
      <h2 className="text-xl font-bold mt-8">Select Component Test</h2>
      <Select className="w-[300px]">
        <Select.Trigger placeholder="카테고리 선택" />
        <Select.Content>
          <Select.Option value="A">최신순</Select.Option>
          <Select.Option value="B">높은 가격순</Select.Option>
          <Select.Option value="C">낮은 가격순</Select.Option>
        </Select.Content>
      </Select>

      {/* -----------------Toast Test----------------- */}
      <h2 className="text-xl font-bold mt-8">Toast Component Test</h2>
      <div className="flex gap-4">
        <Button onClick={() => showToast("성공 메세지", "success")}>
          성공 토스트 열기
        </Button>
        <Button onClick={() => showToast("에러 메세지", "error")}>
          에러 토스트 열기
        </Button>
        <Button onClick={() => showToast("정보 메세지", "info")}>
          정보 토스트 열기
        </Button>
      </div>
    </div>
  );
};

export default DesignTestPage;
