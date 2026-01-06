import { FormSample } from "@/common/examples/FormSample";
import { PageSections } from "@/common/layout/PageSections";
import { Button } from "@/common/ui/actions/button";
import { Separator } from "@/common/ui/display/separator";
import { ActionModal } from "@/common/ui/overlay/ActionModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/ui/overlay/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/ui/overlay/dialog";
import { DisplayModal } from "@/common/ui/overlay/DisplayModal";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/common/ui/overlay/drawer";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/common/ui/overlay/sheet";
import { Tile } from "@/common/ui/surfaces/Tile";
import { Code } from "@/common/ui/typography/code";
import { CodeBlockData } from "@/common/ui/typography/code-block";
import { Sheet } from "lucide-react";

function ActionModalTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "actionmodal-usage",
      code: `<ActionModal
  trigger="Open Confirm Action"
  title="Confirm Action"
  description="You should be sure about this action, because it is important."
  onCancel={() => console.log("Cancel")}
  onConfirm={() => console.log("Confirm")}
>
  Content of modal here.
</ActionModal>`,
    },
  ];
  return (
    <Tile
      title="Action Modal"
      description="An alert dialog is a modal that prompts the user to submit or confirm a required action. (Confirm or Cancel)"
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert Dialog Title</AlertDialogTitle>
            <AlertDialogDescription>
              This description calls out what is required for the user to know.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            The content of the alert dialog goes here. It could be a form, an
            image or a child component.
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => console.log("Cancel")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => console.log("Continue")}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ActionModal
        trigger="Open Alert Dialog"
        title="Confirm Action"
        description="You should be sure about this action, because it is important."
        onCancel={() => console.log("Cancel")}
        onConfirm={() => console.log("Confirm")}
      >
        Content of modal here.
      </ActionModal>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function DisplayModalTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "actionmodal-usage",
      code: `<DisplayModal
  trigger="Open Display Modal"
  title="Confirm Action"
  description="You should be sure about this action, because it is important."
>
  Dialog Content Here
</DisplayModal>>`,
    },
  ];
  return (
    <Tile
      title="Display Modal"
      description="Display modal is like the action modal. Unlike the action modal, it does not require any action."
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>This is the Dialog Title</DialogTitle>
            <DialogDescription>
              The dialog description goes here.
            </DialogDescription>
          </DialogHeader>
          <div>This is where the content goes.</div>
        </DialogContent>
      </Dialog>
      <DisplayModal
        trigger="Open Display Modal"
        title="Confirm Action"
        description="You should be sure about this action, because it is important."
      >
        Dialog Content Here
      </DisplayModal>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function DrawerTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "drawer-usage",
      code: `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>This is the Drawer Title</DrawerTitle>
        <DrawerDescription>
          The drawer description goes here.
        </DrawerDescription>
      </DrawerHeader>
      <FormSample />
    </div>
  </DrawerContent>
</Drawer>`,
    },
  ];
  return (
    <Tile
      title="Drawer"
      description="Drawer modal is a window that comes up from a trigger."
    >
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>This is the Drawer Title</DrawerTitle>
              <DrawerDescription>
                The drawer description goes here.
              </DrawerDescription>
            </DrawerHeader>
            <FormSample />
          </div>
        </DrawerContent>
      </Drawer>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function SheetTile() {
  const code: CodeBlockData[] = [
    {
      language: "tsx",
      filename: "sheet-usage",
      code: `code here`,
    },
  ];
  return (
    <Tile
      title="Sheet"
      description="Sheet is a window that comes in from the side or bottom of the screen."
    >
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Separator className="my-4" />
      <Code codeData={code} />
    </Tile>
  );
}

function MissingComponentsTile() {
  return (
    <Tile
      title="More Components Coming Soon"
      description="More overlay components will be added here soon."
    >
      <ul>
        <li>Command</li>
        <li>Context-Menu</li>
        <li>Dropdown-Menu</li>
        <li>EmojiSelector</li>
        <li>EnhancedSelector</li>
        <li>HoverCard</li>
        <li>Popover</li>
        <li>Select</li>
      </ul>
    </Tile>
  );
}
const sections = [
  {
    id: "action-modal",
    title: "Action Modal",
    children: <ActionModalTile />,
  },
  {
    id: "display-modal",
    title: "Display Modal",
    children: <DisplayModalTile />,
  },
  { id: "drawer", title: "Drawer", children: <DrawerTile /> },
  { id: "missing", title: "Missing", children: <MissingComponentsTile /> },
];

export const UIOverlay = () => {
  return <PageSections sections={sections} />;
};
