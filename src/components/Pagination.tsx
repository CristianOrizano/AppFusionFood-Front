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
  perPage: number;
  currentPage: number;
  lastPage: number;
}

interface PaginationProps {
  meta: Meta; // toda la info de paginación
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  maxPagesWithoutTruncation?: number;
}

const generatePageNumbers = (
  pageIndex: number,
  pageCount: number,
  maxPagesWithoutTruncation = 5,
): (number | string)[] => {
  if (pageCount <= maxPagesWithoutTruncation) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  // Conjunto de números que queremos mostrar (antes de insertar los '…')
  let pageNumbers: number[] = [];

  // Cerca del inicio: mostrar 1..4
  if (pageIndex <= 3) {
    pageNumbers = [1, 2, 3, 4, pageCount];
  }
  // Cerca del final: mostrar last-3..last
  else if (pageIndex >= pageCount - 2) {
    pageNumbers = [1, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
  }
  // En el medio: mostrar 1, pageIndex-1, pageIndex, pageIndex+1, last
  else {
    pageNumbers = [1, pageIndex - 1, pageIndex, pageIndex + 1, pageCount];
  }

  // Filtramos duplicados, fuera de rango, y ordenamos
  const nums = Array.from(new Set(pageNumbers.filter((n) => n >= 1 && n <= pageCount))).sort((a, b) => a - b);

  // Construimos el array final insertando '…' cuando la diferencia entre
  // números consecutivos sea mayor a 1
  const result: (number | string)[] = [];
  for (let i = 0; i < nums.length; i++) {
    result.push(nums[i]);
    if (i < nums.length - 1) {
      if (nums[i + 1] - nums[i] > 1) {
        result.push('…');
      }
    }
  }

  return result;
};

const AppPagination = ({
  meta,
  onPageChange,
  onPageSizeChange,
  maxPagesWithoutTruncation = 5,
}: PaginationProps) => {
  const pageIndex = meta?.currentPage ?? 1;
  const pageSize = meta?.perPage ?? 10;
  const pageCount = meta?.lastPage ?? 1;

  const pages = generatePageNumbers(pageIndex, pageCount, maxPagesWithoutTruncation);

  return (
    <div className="flex justify-end">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-2">
        {/* Texto de entries */}
        <div className="text-sm text-muted-foreground">
          {meta?.from != null && meta?.to != null && meta?.total != null && (
            <>
              Mostrando <b>{meta.from}</b> a <b>{meta.to}</b> de <b>{meta.total}</b> registros
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Paginación */}
          <ShadPagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => pageIndex > 1 && onPageChange(pageIndex - 1)}
                  className={pageIndex === 1 ? 'pointer-events-none opacity-50' : ''}
                  size="icon"
                />
              </PaginationItem>

              {pages.map((p, i) => (
                <PaginationItem key={i}>
                  {typeof p === 'number' ? (
                    <PaginationLink isActive={p === pageIndex} onClick={() => onPageChange(p)} size="icon">
                      {p}
                    </PaginationLink>
                  ) : (
                    <span className="px-2">…</span>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => pageIndex < pageCount && onPageChange(pageIndex + 1)}
                  className={pageIndex === pageCount ? 'pointer-events-none opacity-50' : ''}
                  size="icon"
                />
              </PaginationItem>
            </PaginationContent>
          </ShadPagination>

          {/* Selector de tamaño de página */}
          <Select value={String(pageSize)} onValueChange={(value) => onPageSizeChange(Number(value))}>
            <SelectTrigger size="sm" className="w-full">
              <SelectValue placeholder="Resultados por página" />
            </SelectTrigger>
            <SelectContent>
              {[10, 25, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AppPagination;
