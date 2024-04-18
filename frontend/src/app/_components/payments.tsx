"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { paymentService } from "@/services/payment";
import { useMemo, useState } from "react";
import { PaginationState, Row } from "@tanstack/react-table";
import { Payment } from "@/@types/Payment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContractsTable } from "./contracts-table";
import { InstallmentsTable } from "./installments-table";

export function Payments() {
  const columnsMemo = useMemo(() => columns, []);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["payments", pagination],
    queryFn: () =>
      paymentService.findAll(pagination.pageIndex, pagination.pageSize),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return "Loading";
  if (isError) return "Error";

  function renderDetails({ row }: { row: Row<Payment> }) {
    return (
      <div>
        <Accordion type="single" collapsible>
          {row.original.contracts.map((contract) => (
            <AccordionItem
              key={contract.number}
              value={`item-${contract.number}`}
            >
              <AccordionTrigger>Contrato #{contract.number}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col ml-2 gap-2">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="font-bold">Informações do contrato</h1>
                    <ContractsTable contract={contract}></ContractsTable>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="font-bold">Prestações</h1>
                    <InstallmentsTable
                      installments={contract.installments}
                    ></InstallmentsTable>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  return (
    <DataTable
      columns={columnsMemo}
      data={data?.payments || []}
      renderSubComponent={renderDetails}
      getRowCanExpand={() => true}
      pagination={pagination}
      totalCount={data?.totalCount}
      handleOnPageChange={setPagination}
    />
  );
}
