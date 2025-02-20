import { useState, useEffect } from "react"
import { Stack, Container, Heading, HStack, Spinner, Card, Text, Button, VStack, Box } from "@chakra-ui/react"
import { MovieGrid } from "./MoviesGrid"
import { Pagination } from "./Pagination"
import { ColorModeButton } from "./ui/color-mode"

interface Movie {
    id: string
    title: string
    description: string
    image_url: string
    rating: number
}

interface MovieResponse {
    total: number
    items: Movie[]
    detail: string
}

const MOVIES_PER_PAGE = 12

export const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const limit = MOVIES_PER_PAGE

    const fetchMovies = async (page: number) => {
        try {
            setLoading(true)
            setError("")
            const skip = (page - 1) * limit
            const response = await fetch(
                `https://november7-730026606190.europe-west1.run.app/movies/?skip=${skip}&limit=${limit}`

            )
            const data: MovieResponse = await response.json()
            if (response.ok) {
                setMovies(data.items || [])
                setTotal(data.total)
            } else {
                setError(data.detail)
            }
            setLoading(false)
        } catch (error) {
            setError("Network problem")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMovies(currentPage)
    }, [currentPage])

    const totalPages = Math.ceil(total / limit)

    return (
        <Container maxW="container.xl" py={8}>
            <HStack justify="center" pb={8}>
                <Heading size="5xl">Tommy's Movie List</Heading>
                <Box css={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                }}>
                    <ColorModeButton />
                </Box>


            </HStack>
            {loading ? (
                <HStack justify="center" >
                    <Spinner size="xl" />
                </HStack>
            ) : error ? (
                <HStack justify="center" >
                    <Card.Root  >
                        <Card.Body>
                            <VStack justify="center" >
                                <Text textAlign="center"><b>Error featching movies:</b></Text>
                                <Text textAlign="center" color={"fg.error"}>{error}</Text>
                            </VStack>
                            <VStack justify="center" >
                                <Button size="xl" mt={2} onClick={() => fetchMovies(currentPage)}>Try again</Button>
                            </VStack>
                        </Card.Body>
                    </Card.Root>
                </HStack>
            ) : (
                <Stack gap={8} mt={8}>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />

                    <MovieGrid movies={movies} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </Stack>

            )}
        </Container>
    )
}