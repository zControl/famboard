import { PageSections } from "@/components/common/PageSections";

function FormBasicsTile() {
  return <div>form basics tile</div>;
}

function FormFieldTile() {
  return <div>form field tile</div>;
}

function FormGroupsTile() {
  return <div>form groups tile</div>;
}

const sections = [
  { id: "form-basic", title: "Basic items", children: <FormBasicsTile /> },
  { id: "form-inputs", title: "Input fields", children: <FormFieldTile /> },
  { id: "form-groups", title: "Groups", children: <FormGroupsTile /> },
];

const FormsExample = () => {
  return <PageSections sections={sections} />;
};

export { FormsExample };
