import {
  Card,
  CardBody,
  Grid,
  Image,
  Text,
  Stack,
  Heading,
} from "@chakra-ui/react"
import { useColorModeValue } from "./ui/color-mode"

interface Movie {
  id: string
  title: string
  description: string
  image_url: string
  rating: number
}

interface MovieGridProps {
  movies: Movie[]
}

export const MovieGrid = ({ movies }: MovieGridProps) => {
  const ratingColor = useColorModeValue("yellow.600", "pink.500")
  if (!movies) return null
  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={6}
      alignSelf="center"
    >
      {movies.map((movie) => (
        <Card.Root key={movie.id} maxW="sm" height="100%">
          <CardBody>
            <Image
              src={movie.image_url}
              alt={movie.title}
              borderRadius="lg"
              mb={4}
            />
            <Stack gap={2}>
              <Heading size="lg">{movie.title}</Heading>
              <Text color={ratingColor} fontWeight="bold">
                Rating: {movie.rating}
              </Text>
              <Text color="fg.muted">{movie.description}</Text>
            </Stack>
          </CardBody>
        </Card.Root>
      ))}
    </Grid>
  )
}
