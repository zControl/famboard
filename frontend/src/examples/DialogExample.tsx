import { PageSections } from "@/components/common/PageSections";
import { ActionModal } from "@/components/composites/ActionModal";
import { Tile } from "@/components/composites/Tile";
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
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { DisplayModal } from "@/components/composites/DisplayModal";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SectionDescription, SectionTitle } from "@/components/ui/typography";
import { FormSample } from "@/examples/FormSample";

function ActionDialogModal() {
  const imp = `import {
AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle,
AlertDialogTrigger,
} from "@/components/ui/alert-dialog";`;

  const imp2 = `import { ActionModal } from "@/components/composites/ActionModal";`;
  const code2 = `<ActionModal
  trigger="Open Confirm Action"
  title="Confirm Action"
  description="You should be sure about this action, because it is important."
  onCancel={() => console.log("Cancel")}
  onConfirm={() => console.log("Confirm")}
>
  Content of modal here.
</ActionModal>
`;
  return (
    <Tile
      title="Alert Dialog"
      description="An alert dialog is a modal that prompts the user to submit or confirm a required action. (Confirm or Cancel)"
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Open Alert Dialog</Button>
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
      <Separator className="my-4" />
      <CodeBlock code={imp} language="tsx" />
      <Separator className="my-4" />
      <SectionTitle>Action Modal Component</SectionTitle>
      <SectionDescription>
        A reusable component built on top of Alert Dialog. It can be used
        instead of creating the full AlertDialog each time.
      </SectionDescription>
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
      <CodeBlock code={imp2} language="tsx" />
      <CodeBlock code={code2} language="tsx" />
    </Tile>
  );
}

function DisplayDialogModal() {
  const imp = `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";`;
  const imp2 = `import { DisplayModal } from "@/components/composites/DisplayModal";`;
  return (
    <Tile
      title="Display Modal"
      description="Display modal is like the action modal. Unlike the action modal, it does not require any action."
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Display Dialog</Button>
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
      <Separator className="my-4" />
      <CodeBlock code={imp} language="tsx" />
      <Separator className="my-4" />
      <SectionTitle>Display Modal Component</SectionTitle>
      <SectionDescription>
        A reusable component built on top of Dialog. It can be used instead of
        creating the full Dialog each time.
      </SectionDescription>
      <DisplayModal
        trigger="Open Display Modal"
        title="Confirm Action"
        description="You should be sure about this action, because it is important."
      >
        Dialog Content Here
      </DisplayModal>
      <Separator className="my-4" />
      <CodeBlock code={imp2} language="tsx" />
    </Tile>
  );
}

function DrawerModal() {
  const imp = `import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/composites/Drawer";`;
  return (
    <Tile
      title="Drawer"
      description="Drawer modal is a window that comes up from a trigger."
    >
      <Drawer>
        <DrawerTrigger asChild>
          <Button asChild variant="outline">
            Open Drawer
          </Button>
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
      <CodeBlock code={imp} language="tsx" />
    </Tile>
  );
}

function SheetModal() {
  const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

  const imp = `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/Sheet";`;
  return (
    <Tile
      title="Sheet"
      description="Sheet is a window that comes in from the side or bottom of the screen."
    >
      <div className="w-40 lg:w-96 mx-auto grid grid-cols-2 gap-4">
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="outline">{side}</Button>
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>
                  The sheet description goes here
                </SheetDescription>
              </SheetHeader>
              <FormSample />
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant={"outline"}>Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
      <Separator className="my-4" />
      <CodeBlock code={imp} language="tsx" />
    </Tile>
  );
}

function ToastModal() {
  return <div>Toast Modal</div>;
}

const sections = [
  {
    id: "action-modal",
    title: "Action Modal",
    children: <ActionDialogModal />,
  },
  {
    id: "display-modal",
    title: "Display Modal",
    children: <DisplayDialogModal />,
  },
  { id: "drawer", title: "Drawer", children: <DrawerModal /> },
  { id: "sheet", title: "Sheet", children: <SheetModal /> },
  { id: "toast", title: "Toast", children: <ToastModal /> },
];
const DialogExample = () => {
  return <PageSections sections={sections} />;
};

export { DialogExample };
