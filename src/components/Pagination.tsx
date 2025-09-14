import React from 'react';

import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
interface Meta {
  from?: number;
  to?: number;
  total?: number;
}

interface PaginationProps {
  pageIndex: number; // página actual (1-based)
  pageCount: number; // total de páginas
  meta?: Meta; // { from, to, total } -> tu docData
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}
const AppPagination = ({
  pageIndex,
  pageCount,
  meta,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <>
      <div className="flex justify-end">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-2">
          {/* Texto estilo DataTables */}
          <div className="text-sm text-muted-foreground">
            {meta?.from != null && meta?.to != null && meta?.total != null && (
              <>
                Showing <b>{meta.from}</b> to <b>{meta.to}</b> of <b>{meta.total}</b> entries
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Controles de paginación */}
            <ShadPagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => pageIndex > 1 && onPageChange(pageIndex - 1)} />
                </PaginationItem>

                {pages.map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink isActive={p === pageIndex} onClick={() => onPageChange(p)}>
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext onClick={() => pageIndex < pageCount && onPageChange(pageIndex + 1)} />
                </PaginationItem>
              </PaginationContent>
            </ShadPagination>

            <Select value={String(pageSize)} onValueChange={(value) => onPageSizeChange(Number(value))}>
              <SelectTrigger className="w-fit whitespace-nowrap">
                <SelectValue placeholder="Resultados por página" />
              </SelectTrigger>
              <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppPagination;
