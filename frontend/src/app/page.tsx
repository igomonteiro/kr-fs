import { Payment, columns } from "./_components/columns";
import { CsvForm } from "./_components/csv-form";
import { DataTable } from "./_components/data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
  ];
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="flex flex-col gap-16">
        <CsvForm />
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
