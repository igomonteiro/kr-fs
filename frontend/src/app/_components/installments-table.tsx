import { Installment } from "@/@types/Installments";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  formatDate,
  formatCurrency,
  StatusMap,
  ExpirationStatusMap,
} from "@/lib/utils";

interface InstallmentsTableProps {
  installments: Installment[];
}

export function InstallmentsTable({ installments }: InstallmentsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sequência</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Data de expiração</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Mora</TableHead>
          <TableHead>Multa</TableHead>
          <TableHead>IOF</TableHead>
          <TableHead>Desconto</TableHead>
          <TableHead>Valor atual</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {installments.map((installment) => (
          <TableRow key={installment.sequenceNumber}>
            <TableCell>{installment.sequenceNumber}</TableCell>
            <TableCell>{installment.type}</TableCell>
            <TableCell>{formatDate(installment.expirationDate)}</TableCell>
            <TableCell>{formatCurrency(installment.value)}</TableCell>
            <TableCell>{formatCurrency(installment.lateFee)}</TableCell>
            <TableCell>{formatCurrency(installment.penaltyValue)}</TableCell>
            <TableCell>{formatCurrency(installment.iof)}</TableCell>
            <TableCell>{formatCurrency(installment.discount)}</TableCell>
            <TableCell>{formatCurrency(installment.currentValue)}</TableCell>
            <TableCell>{`${StatusMap[installment.status] || ""} - ${ExpirationStatusMap[installment.expirationStatus] || ""}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
