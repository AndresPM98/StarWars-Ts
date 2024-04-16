import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import movieRoutes from './routes/index';
const { ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Conexión a la base de datos MongoDB con opciones de ServerApiVersion
mongoose.connect(process.env.MONGODB_URI as string, {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
});

// Configurar las rutas
app.use('/', movieRoutes);

// Middleware para manejar solicitudes a rutas no encontradas
app.use("*", (req: Request, res: Response) => {
    res.status(404).send("not found");
});

// Middleware para manejar errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).send({
        error: true,
        message: err.message,
    });
});

export default app;
