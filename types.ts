import { Settings } from "http2";

export type EnvType = {
    key: string;
};

export type BoxOfficeItem = {
    id: string;
    rank: string;
    title: string;
    image: string;
    weekend: string;
    gross: string;
    weeks: string;
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