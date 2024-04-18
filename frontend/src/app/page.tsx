import { CsvForm } from "./_components/csv-form";
import { Payments } from "./_components/payments";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="flex flex-col">
        <CsvForm />
        <div className="mt-8">
          <Payments />
        </div>
      </div>
    </main>
  );
}
