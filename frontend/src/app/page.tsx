import { CsvForm } from "./_components/csv-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="flex flex-col">
        <CsvForm />
      </div>
    </main>
  );
}
