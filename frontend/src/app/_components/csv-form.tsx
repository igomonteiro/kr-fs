"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ReloadIcon } from "@radix-ui/react-icons";
import { httpClient } from "@/services/httpClient";

const ACCEPTED_FILE_TYPES = ["text/csv"];
const MAX_FILE_SIZE = 30 * 1024 * 1024 * 1024; // 30GB

const formSchema = z.object({
  file: z
    .instanceof(File, { message: "Campo obrigatório" })
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      "Tamanho máximo do arquivo é 30GB",
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Somente arquivo .csv é permitido",
    ),
});

export function CsvForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit({ file }: z.infer<typeof formSchema>) {
    const chunkSize = 5 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);
    const chunkProgress = 100 / totalChunks;
    let key = 0;
    let start = 0;
    let end = Math.min(chunkSize, file.size);

    const uploadNextChunk = async () => {
      if (end <= file.size) {
        const chunk = file.slice(start, end);
        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("key", String(key));
        formData.append("totalChunks", String(totalChunks));
        formData.append("filename", file.name);

        try {
          await httpClient.post("/payments/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setProgress(Number((key + 1) * chunkProgress));
          key++;
          start = end;
          end = start + chunkSize;
          await uploadNextChunk();
        } catch (err) {
          console.log(err);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setProgress(100);
      }
    };

    setIsSubmitting(true);
    await uploadNextChunk();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Upload dos dados de pagamento</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                  type="file"
                  accept="text/csv"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
              {isSubmitting && <Progress value={progress} />}
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <ReloadIcon className="mr-2 size-4 animate-spin" />
              Processando...
            </>
          ) : (
            "Confirmar"
          )}
        </Button>
      </form>
    </Form>
  );
}
