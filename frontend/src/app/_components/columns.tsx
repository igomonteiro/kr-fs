"use client";

import { Payment } from "@/@types/Payment";
import { Button } from "@/components/ui/button";
import { formatDocument } from "@/lib/utils";
import { CheckIcon, Cross2Icon, HeightIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "installmentNumber",
    header: "Número",
    cell: ({ row, getValue }) => (
      <div
        style={{
          paddingLeft: `${row.depth * 2}rem`,
        }}
      >
        {getValue<string>()}
      </div>
    ),
  },
  {
    accessorKey: "agency",
    header: "Agência",
  },
  {
    accessorKey: "cardNumber",
    header: "Carteira",
  },
  {
    accessorKey: "cardDescription",
    header: "Descrição da carteira",
  },
  {
    accessorKey: "proposalNumber",
    header: "Proposta",
  },
  {
    accessorKey: "customer.name",
    header: "Cliente",
  },
  {
    accessorKey: "customer.document",
    header: "CPF/CNPJ",
    cell: ({ getValue }) => <div>{formatDocument(getValue<string>())}</div>,
  },
  {
    accessorKey: "isValid",
    header: "Pagamento válido",
    cell: ({ getValue }) => (
      <div className="flex items-center justify-center">
        {getValue<boolean>() ? (
          <CheckIcon className="size-4 text-green-500"></CheckIcon>
        ) : (
          <Cross2Icon className="size-4 text-red-500"></Cross2Icon>
        )}
      </div>
    ),
  },
  {
    id: "seeDetailsAction",
    header: () => null,
    cell: ({ row }) => (
      <Button
        {...{
          onClick: row.getToggleExpandedHandler(),
        }}
        size="sm"
        variant="link"
      >
        {row.getIsExpanded() ? "Minimizar detalhes" : "Visualizar detalhes"}
      </Button>
    ),
  },
];
