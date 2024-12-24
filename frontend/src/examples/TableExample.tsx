import { PageSections } from "@/components/common/PageSections";
import { DataTableCore } from "@/components/composites/DataTableCore";
import { Tile } from "@/components/composites/Tile";
import { DataTableToolbar } from "@/components/data/DataTableToolbar";
import { CodeBlock } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TableTile() {
  const imp = `import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";`;
  const code = `<Table>
  <TableCaption>Table Caption</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">W-100 Column</TableHead>
      <TableHead>Middle Column</TableHead>
      <TableHead>Middle Column</TableHead>
      <TableHead className="text-right">Right Align Column</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">Row 1, Cell 1</TableCell>
      <TableCell>Row 1, Cell 2</TableCell>
      <TableCell>Row 1, Cell 3</TableCell>
      <TableCell className="text-right">Row 1, Cell 4</TableCell>
    </TableRow>
  </TableBody>
</Table>
  
  `;
  return (
    <Tile
      title="Raw Table"
      description="This is the most basic for of a table, with manual entry of the columns, rows, and cells."
    >
      <Table>
        <TableCaption>Table Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">W-100 Column</TableHead>
            <TableHead>Middle Column</TableHead>
            <TableHead>Middle Column</TableHead>
            <TableHead className="text-right">Right Align Column</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Row 1, Cell 1</TableCell>
            <TableCell>Row 1, Cell 2</TableCell>
            <TableCell>Row 1, Cell 3</TableCell>
            <TableCell className="text-right">Row 1, Cell 4</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Separator className="my-4" />
      <CodeBlock code={imp} />
      <CodeBlock code={code} />
    </Tile>
  );
}

function SimpliestDataTable() {
  return (
    <Tile
      title="Local Data Table"
      description="Simple data table where the colmuns and data are hard coded into local array."
    >
      <DataTableCore
        columns={[
          {
            header: "First Name",
            accessorKey: "firstName",
          },
          {
            header: "Last Name",
            accessorKey: "lastName",
          },
        ]}
        data={[
          {
            firstName: "John",
            lastName: "Doe",
          },
          {
            firstName: "Jane",
            lastName: "Doe",
          },
        ]}
        toolbar={(table) => <DataTableToolbar table={table} />}
        caption="Data Table with pagination, sorting, and filtering."
      />
    </Tile>
  );
}

function ApiDataTable() {
  return (
    <Tile
      title="Featured Data Table"
      description="Data Table with pagination, sorting, and filtering."
    >
      <p>Featured Data Table</p>
    </Tile>
  );
}

const sections = [
  { id: "table", title: "Table", children: <TableTile /> },
  {
    id: "local-datatable",
    title: "Local Data Table",
    children: <SimpliestDataTable />,
  },
  {
    id: "api-datatable",
    title: "Api Data Table",
    children: <ApiDataTable />,
  },
];

export const TableExample = () => {
  return <PageSections sections={sections} />;
};
