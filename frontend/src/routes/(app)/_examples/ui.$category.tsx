import { NotFoundPage } from "@/common/error/NotFoundPage";
import { UIActions } from "@/common/examples/UIActions";
import { UIColors } from "@/common/examples/UIColors";
import { UIData } from "@/common/examples/UIData";
import { UIDisplay } from "@/common/examples/UIDisplay";
import { UIFeedback } from "@/common/examples/UIFeedback";
import { UIFields } from "@/common/examples/UIFields";
import { UIMedia } from "@/common/examples/UIMedia";
import { UINavigation } from "@/common/examples/UINavigation";
import { UIOverlay } from "@/common/examples/UIOverlay";
import { UISurfaces } from "@/common/examples/UISurfaces";
import { UITypography } from "@/common/examples/UITypography";
import { PageContainer } from "@/common/layout/PageContainer";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_examples/ui/$category")({
  component: UICategoryPage,
});

function UICategoryPage() {
  const { category } = useParams({ from: "/(app)/_examples/ui/$category" });

  // Define component mapping
  const componentMap: Record<
    string,
    {
      component: React.ReactNode;
      title: string;
      description: string;
      keywords: string;
    }
  > = {
    colors: {
      component: <UIColors />,
      title: "UI | Colors",
      description: "The color system used in the app.",
      keywords: "ui, colors, color-box, color-selector",
    },
    actions: {
      component: <UIActions />,
      title: "UI | Actions",
      description: "Components for user interactions.",
      keywords: "ui, actions, button, button-link",
    },
    data: {
      component: <UIData />,
      title: "UI | Data",
      description: "Components to display various data.",
      keywords: "ui, chart, data, table, list, item, labeled-value",
    },
    display: {
      component: <UIDisplay />,
      title: "UI | Display",
      description: "A piece of content that presents information to the user.",
      keywords: "ui, display, content",
    },
    feedback: {
      component: <UIFeedback />,
      title: "UI | Feedback",
      description: "Components to provide feedback to users.",
      keywords: "ui, feedback, spinner, toast, tooltip, loaders",
    },
    fields: {
      component: <UIFields />,
      title: "UI | Fields",
      description: "Form fields for user input.",
      keywords:
        "ui, fields, form, input, toggle, switch, select, slider, checkbox, radio",
    },
    media: {
      component: <UIMedia />,
      title: "UI | Media",
      description: "Display various media in different formats.",
      keywords: "ui, media, image, video, audio",
    },
    navigation: {
      component: <UINavigation />,
      title: "UI | Navigation",
      description: "Components to help users navigate through the app.",
      keywords: "ui, navigation, menu, link, breadcrumb",
    },
    overlay: {
      component: <UIOverlay />,
      title: "UI | Overlay",
      description:
        "Component that is not part of page but requires user interaction.",
      keywords: "ui, overlay, modal, popover",
    },
    surfaces: {
      component: <UISurfaces />,
      title: "UI | Surfaces",
      description: "A wrapper to hold content on the page.",
      keywords:
        "ui, surfaces, accordian, card, tile, panel, section, container",
    },
    typography: {
      component: <UITypography />,
      title: "UI | Typography",
      description: "Display text formatted in a specific way.",
      keywords: "ui, typography, text, heading, paragraph",
    },
  };

  // Get the configuration for the current category
  const config = componentMap[category] || {
    component: <NotFoundPage />,
    title: "Unknown Category",
    description: "UI Category not found, check url.",
  };

  return (
    <PageContainer
      title={config.title}
      description={config.description}
      keywords={config.keywords}
    >
      {config.component}
    </PageContainer>
  );
}
