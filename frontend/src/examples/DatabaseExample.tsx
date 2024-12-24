import { PageSections } from "@/components/common/PageSections";
import { DataTableCore } from "@/components/composites/DataTableCore";
import { DataTableFilterHeader } from "@/components/composites/DataTableFilterHeader";
import { DataTableSortHeader } from "@/components/composites/DataTableSortHeader";
import { Tile } from "@/components/composites/Tile";
import { DataTableToolbar } from "@/components/data/DataTableToolbar";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { BlockQuote, Header4, Paragraph } from "@/components/ui/typography";
import { createApiClient } from "@/utils/apiClient";
import { formatDate } from "@/utils/dateUtils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Column } from "@tanstack/react-table";
import { CloudDownloadIcon, PlusIcon } from "lucide-react";

function CheckApiStatus() {
  const imp = `import { createApiClient } from "@/utils/apiClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";`;
  const code = `const queryClient = useQueryClient();
const apiClient = createApiClient("http://localhost:3000/v1");

const { isPending, isFetching, isError, data, error } = useQuery({
    queryKey: ["ApiRoot"],
    queryFn: async () => apiClient.get(""),
  });

const handleRefresh = () => {
  queryClient.invalidateQueries({ queryKey: ["ApiRoot"] });
};
`;
  const usage = `{!isPending && !isError && (
  <BlockQuote className="max-h-80">
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </BlockQuote>
)}`;

  const queryClient = useQueryClient();
  const apiClient = createApiClient("http://localhost:3000/v1");

  const { isPending, isFetching, isError, data, error } = useQuery({
    queryKey: ["ApiRoot"],
    queryFn: async () => apiClient.get(""),
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["ApiRoot"] });
  };
  return (
    <Tile
      title="API Root Info"
      description="Call the root API endpoint and display the results."
    >
      <Header4>Results</Header4>
      {isError && (
        <>
          <span className="text-destructive mr-4">
            Error: {error?.message || "Unknown error"}
          </span>
          <Button size="sm" variant="secondary" onClick={handleRefresh}>
            Retry
          </Button>
        </>
      )}
      {isPending && <Spinner size="lg" />}
      {!isPending && !isError && (
        <BlockQuote className="max-h-80">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </BlockQuote>
      )}
      {!isError && (
        <>
          <Button
            disabled={isFetching || isPending}
            variant={"outline"}
            onClick={handleRefresh}
          >
            {isFetching || (isPending && data) ? (
              <Spinner size="sm" />
            ) : (
              <CloudDownloadIcon className="mr-2 h-4 w-4" />
            )}
            Invalidate Query to update data
          </Button>
          <Paragraph className="mt-4">
            Last updated: {new Date().toISOString()}
          </Paragraph>
        </>
      )}
      <Separator className="my-4" />
      <CodeBlock code={imp} />
      <CodeBlock code={code} />
      <CodeBlock code={usage} />
    </Tile>
  );
}

interface FullDataType {
  id: string;
  name: string;
  count: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

function TableFromDatabase() {
  const apiClient = createApiClient("http://localhost:3000/v1/");

  const { isPending, isFetching, isError, data, error } = useQuery<
    FullDataType[]
  >({
    queryKey: ["ExampleFull"],
    queryFn: async () => apiClient.get("example"),
    select: (data: FullDataType[]) =>
      data.map((item) => ({
        ...item,
        createdAt: formatDate(item.createdAt),
        updatedAt: formatDate(item.updatedAt),
      })),
  });

  const columns = [
    {
      accessorKey: "name",
      header: ({ column }: { column: Column<FullDataType, string> }) => (
        <DataTableFilterHeader column={column} title="Name" />
      ),
    },
    {
      header: ({ column }: { column: Column<FullDataType, string> }) => (
        <DataTableSortHeader column={column} title="Count" />
      ),
      accessorKey: "count",
      sortingFns: "alphanumeric",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Active",
      accessorKey: "isActive",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt",
    },
  ];

  const toolbar = () => {
    return (
      <div className="flex items-center space-x-2">
        <Button>
          <PlusIcon size="lg" />
        </Button>
      </div>
    );
  };

  return (
    <Tile
      title="Datatable from backend database"
      description="Use API endpoints to get, add, update, and delete data from the database."
    >
      {isPending && <Spinner size="lg" />}
      {isError && (
        <div>An error has occurred: {error?.message || "Unknown error"}</div>
      )}
      {!isError && !isPending && !isFetching && (
        <DataTableCore
          columns={columns}
          data={data || []}
          toolbar={toolbar}
          caption="Complete data set from the database, with formatted dates."
        />
      )}
    </Tile>
  );
}

interface SummaryDataType {
  name: string;
  count: number;
  isActive: boolean;
}

function SummaryTableWithCustomDataShape() {
  const apiClient = createApiClient("http://localhost:3000/v1/example");

  const { isPending, isFetching, isError, data, error } = useQuery<
    SummaryDataType[]
  >({
    queryKey: ["ExampleSummaries"],
    queryFn: async () => apiClient.get("summaries"),
  });
  return (
    <Tile
      title="Custom DTO data shape"
      description="Using a custom DTO, we can get only the data that we need instead of the full object."
    >
      <Header4>Custom data shape using dto.</Header4>
      {isPending && <Spinner size="lg" />}
      {isError && (
        <div>An error has occurred: {error?.message || "Unknown error"}</div>
      )}
      {!isError && !isPending && !isFetching && (
        <DataTableCore
          columns={[
            {
              header: "Name",
              accessorKey: "name",
            },
            {
              header: "Count",
              accessorKey: "count",
            },
            {
              header: "Active",
              accessorKey: "isActive",
            },
          ]}
          data={data || []}
          toolbar={(table) => <DataTableToolbar table={table} />}
          caption="This data comes from database, via custom DTO, reusable apiClient, and react-query!"
        />
      )}
    </Tile>
  );
}

const sections = [
  {
    id: "api-root-info",
    title: "API Root Info",
    children: <CheckApiStatus />,
  },
  {
    id: "datatable-full",
    title: "Full Datatable",
    children: <TableFromDatabase />,
  },
  {
    id: "database-custom-dto",
    title: "Custom Shape Datatable",
    children: <SummaryTableWithCustomDataShape />,
  },
];
export const DatabaseExample = () => {
  return <PageSections sections={sections} />;
};
