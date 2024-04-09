import { Express, Request, Response, NextFunction } from 'express';
const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { spawn } = require("child_process");
const cors = require("cors");

const app: Express = express();

app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
    next();
});

app.use(morgan("dev"));

app.use("/films", createProxyMiddleware({
    target: "http://films:8001",
    changeOrigin: true,
}));

app.use("/people", createProxyMiddleware({
    target: "http://people:8002",
    changeOrigin: true,
}));

app.use("/planets", createProxyMiddleware({
    target: "http://planets:8003",
    changeOrigin: true,
}));

app.use("/starships", createProxyMiddleware({
    target: "http://starships:8004",
    changeOrigin: true,
}));
app.use("/database", createProxyMiddleware({
    target: "http://database:8005",
    changeOrigin: true,
}));

app.listen(8000, () => {
    console.log("Gateway on port 8000");
});

