export type EnvType = {
    key: string;
};

export type BoxOfficeItem = {
    id: string;
    rank?: string;
    title?: string;
    image?: string;
    weekend?: string;
    gross?: string;
    weeks?: string;
}

export type BoxOffice = {
    items: BoxOfficeItem[]
}

export type NameWithId = {
    id: string;
    name: string;
}

export type ActorType = {
    id: string;
    image: string;
    name: string;
    asCharacter: string;
}

export type KeyValue = {
    key: string;
    value: string;
}

export type SimilarItem = {
    id: string;
    title: string;
    fullTitle: string;
    year: string;
    image: string;
    plot: string;
    directors: string;
    stars: string;
    genres: string;
    imDbRating: string;
}

export type Title = {
    id: string;
    title: string;
    originalTitle: string;
    fullTitle: string;
    type: string;
    year: string;
    image: string;
    releaseDate: string;
    runtimeMins: string;
    runtimeStr: string;
    plot: string;
    plotLocal: string;
    plotLocalIsRtl: boolean;
    awards: string;
    directors: string;
    directorList: NameWithId[];
    writers: string;
    writerList: NameWithId[];
    stars: string;
    starList: NameWithId[];
    actorList: ActorType[];
    fullCast: string;
    genres: string;
    genreList: KeyValue[];
    companies: string;
    companyList: NameWithId[];
    countries: string;
    countryList: KeyValue[];
    languages: string;
    languageList: KeyValue[];
    contentRating: string;
    imDbRating: string;
    imDbRatingVotes: string;
    metacriticRating: string;
    ratings: string;
    wikipedia: string;
    posters: string;
    images: string;
    trailer: string;
    boxOffice: {
        budget: string;
        openingWeekendUSA: string;
        grossUSA: string;
        cumulativeWorldwideGross: string;
    },
    tagline: string;
    keywords: string;
    keywordList: string[];
    similars: SimilarItem[];
    tvSeriesInfo: string;
    tvEpisodeInfo: string;
    errorMessage: string;
}

export type Trailer = {
    imDbId: string;
    title: string;
    fullTitle: string;
    type: string;
    year: string;
    videoId: string;
    videoTitle: string;
    videoDescription: string;
    thumbnailUrl: string;
    uploadDate: string;
    link: string;
    linkEmbed: string;
    errorMessage: string;
}

export type YouTubeTrailer = {
    imDbId: string;
    title: string;
    fullTitle: string;
    type: string;
    year: string;
    videoId: string;
    videoUrl: string;
    errorMessage: string;
}

export type TmdbMovie = {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export type TmdbPopularMovies = {
    page: number;
    results: TmdbMovie[];
    total_pages: number;
    total_results: number;
    status_message?: string;
}

export type TmdbMovieDetail = {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: {} | null;
    budget: number;
    genres: { id: number; name: string; }[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string;
    production_companies: { name: string; id: number; logo_path: string | null; origin_country: string; }[];
    production_countries: { iso_3166_1: string; name: string }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: { iso_639_1: string; name: string; }[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    status_message?: string;
}

export type TmdbMovieVideos = {
    id: number;
    results: {
        id: string;
        iso_639_1: string;
        iso_3166_1: string;
        key: string;
        name: string;
        site: string;
        size: number;
        type: string;
    }[];
    status_message?: string;
}

export type TmdbMovieCredits = {
    id: number;
    cast: TmdbMovieCast[];
    crew: {
        adult: boolean;
        gender: number | null;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string | null;
        credit_id: string;
        department: string;
        job: string;
    }[];
    status_message?: string;
}

export type TmdbMovieCast = {
        adult: boolean;
        gender: number | null;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string | null;
        cast_id: number;
        character: string;
        credit_id: string;
        order: number;
}

export type TmdbMultiSearchResults = {
    page: number;
    results: (TmdbMovieSearchResult | TmdbTVSearchResult)[];
    total_results: number;
    total_pages: number;
    status_message?: string;
}

export type TmdbMovieSearchResult = {
    poster_path: string | null;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string | null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: boolean;
    media_type: string;
}

export type TmdbTVSearchResult = {
    poster_path: string | null;
    popularity: number;
    id: number;
    overview: string;
    backdrop_path: string | null;
    vote_average: number;
    first_air_date: string;
    origin_country: string;
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
    media_type: string;
}

export type TmdbPopularTV = {
    page: number;
    results: TmdbTV[];
    total_pages: number;
    total_results: number;
    status_message?: string;
}

export type TmdbTV = {
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    first_air_date: string;
    origin_country: string[];
    name: string;
    original_name: string;
}

export type TmdbTVDetail = {
    backdrop_path: string | null;
    created_by: {
        id: number;
        credit_id: string;
        name: string;
        gender: number;
        profile_path: string | null;
    }[];
    episode_runtime: number[];
    first_air_date: string;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        season_number: number;
        still_path: string | null;
        vote_average: number;
        vote_count: number;
    };
    name: string;
    next_episode_to_air: null;
    networks: {
        name: string;
        id: number;
        logo_path: string | null;
        origin_country: string;
    }[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    seasons: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        season_number: number;
    }[];
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    status_message?: string;
}
