import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface Props {
  totalItems: number
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export const PaginationComponent = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const getPageIndices = () => {
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }

  if (totalPages <= 1) {
    return null
  }

  const pageIndices = getPageIndices()
  const showStartEllipsis = pageIndices[0] > 1
  const showEndEllipsis = pageIndices[pageIndices.length - 1] < totalPages

  return (
    <div className="flex justify-center">
      <Pagination className="m-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>

          {showStartEllipsis && (
            <>
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(1)}
                  className="cursor-pointer"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {pageIndices.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                className={`cursor-pointer px-3 py-2 rounded-xl text-sm font-medium ${
                  currentPage === page
                    ? 'transition-all duration-300 ease-in-out bg-primary text-primary-foreground'
                    : 'transition-none text-muted-foreground hover:text-foreground'
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {showEndEllipsis && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(totalPages)}
                  className="cursor-pointer"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
