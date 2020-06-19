<template>
    <div>
        <movie-list :pageMovies="$store.state.movie.searchRouterData"/>
    </div>
</template>

<script>
import MovieList from "@/components/Movie/MovieList"
export default {
    components: {
        MovieList
    }
}
</script>