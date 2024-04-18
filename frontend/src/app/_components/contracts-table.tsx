import { Contract } from "@/@types/Contract";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";

interface ContractsTableProps {
  contract: Contract;
}

export function ContractsTable({ contract }: ContractsTableProps) {
  return (
    <Table>
      <TableHeader className="border-b">
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Valor total</TableHead>
          <TableHead>Quantidade de prestações</TableHead>
          <TableHead>Código do produto</TableHead>
          <TableHead>Descrição do produto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{formatDate(contract.date)}</TableCell>
          <TableCell>{formatCurrency(contract.totalValue)}</TableCell>
          <TableCell>{contract.installmentsQuantity}</TableCell>
          <TableCell>{contract.product.code}</TableCell>
          <TableCell>{contract.product.description}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
