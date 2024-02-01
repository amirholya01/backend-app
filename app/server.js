const morgan = require("morgan");
const swaggerJs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const {AllRoutes} = require("./router/router");

module.exports = class Application{

    #express = require("express");
    #app = this.#express();


    // Constructor method
    constructor(PORT, DB_HOST) {
        this.configApplication();
        this.createServer(PORT);
        this.connectToMongoDB(DB_HOST);
        this.createRoutes();
        this.errorHandler();
    }


    // Method for configuring the application
    configApplication(){

        const path = require("path");
        const swaggerDefinition = {
            openapi: "3.0.0",
            info: {
                title: "Backend of final project",
                version: "1.0.0",
                description: ".........",
                contact: {
                    name: "Amir Hossein Olyanasab Narab",
                    email: "amirholyanasab@gmail.com"
                }
            },
            servers: [
                {
                    url: "http://localhost:4000"
                }
            ]
        };

        const swaggerSpec = swaggerJs({
            swaggerDefinition,
            apis: ["app/router/*/*.js"]
        });
        this.#app.use(morgan("dev"));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")))
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended : true}));
        this.#app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
    }


    // Method for creating the server
    createServer(PORT){
        const http = require("http");
        http.createServer(this.#app)
            .listen(PORT, () => {
                console.log(`Server is running on http://localhost:${PORT}`)
            });
    }


    // Method for configuring the database
    connectToMongoDB(DB_HOST){
        const mongoose = require("mongoose");

        mongoose.connect(DB_HOST)
            .then(() => console.log('Connecting to MongoDB was successfully'))
            .catch(err => console.log(`Connecting to MongoDB was failed ---- ${err}`))

        //installing the morgan package and using it on the server file when breaking the connection to DB, it's a secure way

        process.on("SIGINT", async() => {
            await mongoose.connection.close();
            process.exit(0);
        })
    }


    createRoutes(){
        this.#app.use(AllRoutes);
    }


    // Method for handling errors
    errorHandler(){
        //Not found -404
        this.#app.use((req, res, next) =>{
            // Handle 404 errors
            return res.status(404).json({
                statusCode: 404,
                message: "The page or address was not found"
            })
        })

        }
}