/*
 * If you are planning to develop against your own server, this will need changing to your own url
 */

// export const rootUrl = "http://localhost:4000/api/3";
// export const rootUrl = "https://www.uploadr.co.uk/ext/api/3";
export const rootUrl = "https://www.joshdev.io/ext/api/3";

export const imageGlobalProps: ImageGlobalPropsType = {
    base_url: "http://image.tmdb.org/t/p/",
    secure_base_url: "https://image.tmdb.org/t/p/",
    backdrop_sizes: ["w300", "w780", "w1280", "original"],
    logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    profile_sizes: ["w45", "w185", "h632", "original"],
    still_sizes: ["w92", "w185", "w300", "original"],
};

export type ImageGlobalPropsType = {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
};
