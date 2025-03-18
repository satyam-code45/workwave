import arcjet, { fixedWindow, shield, tokenBucket, detectBot } from "@arcjet/next";

export {detectBot, fixedWindow, shield, tokenBucket}

export default arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [],

})