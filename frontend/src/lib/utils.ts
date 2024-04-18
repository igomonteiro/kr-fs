import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDocument(value: string) {
  let document = value.replace(/\D/g, "");
  if (document.length === 14) return formatCnpj(value);
  if (document.length === 11) return formatCpf(value);
}

export function formatCpf(value: string) {
  let cpf = value.replace(/\D/g, "");
  cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  return cpf;
}

export function formatCnpj(value: string) {
  let cnpj = value.replace(/\D/g, "");
  cnpj = cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4.$5",
  );
  return cnpj;
}

export function formatCurrency(value: number) {
  if (typeof value !== "number") return "";
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(date: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("pt-br").format(new Date(date));
}

export const StatusMap = {
  OPEN: "Aberto",
  CLOSED: "Fechado",
};

export const ExpirationStatusMap = {
  REGULAR: "Regular",
  EXPIRED: "Vencido",
};
