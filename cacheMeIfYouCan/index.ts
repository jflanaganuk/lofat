import express from "express";
import fs from "fs";
import fetch from "node-fetch";
import del from "del";
import cors from 'cors';

const app = express();
export type EnvType = {
    remote_url: string;
    api_key: string;
    cache_seconds: number;
};
const env: EnvType = require("./env.json");

const remoteUrl = env.remote_url;
const apiKey = env.api_key;
const cacheSeconds = env.cache_seconds || 1000;
interface ParsedQs {
    [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

app.use(cors());

app.use("/", express.static(__dirname + "/"));

app.get("/", (_req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

setInterval(() => {
    clearCache();
}, cacheSeconds * 1000);

app.get("/api*", (req, res) => {
    const params = req.params[0];
    const query = convertToQueryString(req.query);
    const safeParams = convertToSafeFileName(params);
    const safeQueries = convertToSafeFileName(removeApiKey(query));
    fs.stat(
        `${__dirname}/cached/${safeParams}${safeQueries}.json`,
        (err, _stat) => {
            if (err === null) {
                textLog(
                    "log",
                    `Serving cached file ${safeParams}${safeQueries}`
                );
                res.sendFile(
                    `${__dirname}/cached/${safeParams}${safeQueries}.json`
                );
            } else if (err.code === "ENOENT") {
                fetchData(res, params, query);
            } else {
                textLog("error", "Unknown file error : ", err);
            }
        }
    );
});

function convertToQueryString(input: ParsedQs): string {
    const inputWithKey = {
        ...input,
        api_key: apiKey,
    };
    const queries = Object.keys(inputWithKey)
        .map((key) => `${key}=${inputWithKey[key]}`)
        .join("&");
    return `?${queries}`;
}

function convertToSafeFileName(input: string): string {
    return input.replace(/\//g, "-");
}

function removeApiKey(input: string): string {
    // As the api_key is always at the end, this should be safe to do
    const strippedString = input.replace(`api_key=${apiKey}`, "");
    if (strippedString.length === 0) return "";
    return strippedString.slice(0, -1); // This removes any trailing '&'
}

const fetchData = (res, params, queries) => {
    const url = new URL(`${remoteUrl}${params}${queries}`, "http://localhost");
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const formatted = JSON.stringify(data);
            const safeParams = convertToSafeFileName(params);
            const safeQueries = convertToSafeFileName(removeApiKey(queries));
            fs.writeFile(
                `${__dirname}/cached/${safeParams}${safeQueries}.json`,
                formatted,
                (e) => {
                    if (e) return console.error(e);
                    textLog("log", `Wrote to file ${safeParams}${safeQueries}`);
                    res.sendFile(
                        `${__dirname}/cached/${safeParams}${safeQueries}.json`
                    );
                }
            );
        });
};

app.listen(4000, () => {
    console.log("CacheMeIfYouCan listening on local port 4000");
    console.log("http://localhost:4000");
});

function clearCache() {
    const date = new Date(Date.now());
    textLog(
        "log",
        `Clearing Cache now, will clear again in ${Math.floor(
            cacheSeconds / 60
        )} minutes - ${date.toLocaleString()}`
    );
    (async () => {
        try {
            await del(`${__dirname}/cached`);
            await fs.mkdir(`${__dirname}/cached`, (e) => {
                if (e) return textLog("error", e);
                textLog("log", "Cached cleared");
            });
        } catch (err) {
            textLog("error", "Error deleting cached dir", err);
        }
    })();
}

function textLog(type: "log" | "error", data1: any, data2?: any): void {
    const data = `${data1}${data2 || ""}`;
    if (type === "log") console.log(data);
    if (type === "error") console.error(data);
    fs.appendFile(
        `${__dirname}/log.txt`,
        type === "log" ? `"[log] : ${data}",\n` : `"[error] : ${data}",\n`,
        (e) => {
            if (e) console.error("UNABLE TO WRITE TO LOG FILE!!!");
        }
    );
}
// Write blank log on startup
fs.writeFile(`${__dirname}/log.txt`, "", (e) => {
    if (e) console.error("UNABLE TO WRITE TO LOG FILE!!!");
    const date = new Date(Date.now());
    textLog("log", "Started Server at " + date.toLocaleDateString());
    textLog(
        "log",
        "Current cache policy is set to " + cacheSeconds + " seconds"
    );
    textLog(
        "log",
        "CacheMeIfYouCan will be caching requests sent to the remote url: " +
            remoteUrl
    );
    textLog("error", "This is an example of an error");
});
