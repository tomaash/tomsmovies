import { arrayFromLength } from "@/utils"
import {
  Button,
  ButtonGroup,
  HStack,
} from "@chakra-ui/react"
import { useMemo } from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {

  const pageNumbers = useMemo(() => arrayFromLength(totalPages), [totalPages])

  return (
    <HStack justify="center" gap={2}>
      <ButtonGroup gap={2} variant="outline">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>

        {pageNumbers.map(i => (
          <Button
            key={i}
            onClick={() => onPageChange(i)}
            variant={currentPage === i ? "solid" : "outline"}
            colorScheme="blue"
          >
            {i}
          </Button>
        ))}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </ButtonGroup>
    </HStack>
  )
}
