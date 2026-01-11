const swaggerJsdoc = require("swagger-jsdoc");

// Opciones de Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Practica 1 API",
            version: "1.0.0",
            description: "API para la AEMET y cosnultas con referencia a ella",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Sergio Pompa Sierra",
                url: "https://github.com/sergiops",
                email: "sergiops@outlook.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Educational server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                user: {
                    type: "object",
                    properties: {
                        username: {
                            type: "string",
                        },
                        fullName: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                        },
                        description: {
                            type: "string",
                        },
                        password: {
                            type: "string",
                        },
                    },
                },
                login: {
                    type: "object",
                    properties: {
                        username: {
                            type: "string",
                        },
                        password: {
                            type: "string",
                        },
                    },
                },
                register: {
                    type: "object",
                    properties: {
                        username: {
                            type: "string",
                        },
                        fullName: {
                            type: "string",
                        },
                        description: {
                            type: "string",
                        },
                        password: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                        },
                    },
                },
                updateUser: {
                    type: "object",
                    properties: {
                        username: {
                            type: "string",
                        },
                        fullName: {
                            type: "string",
                        },
                        description: {
                            type: "string",
                        },
                        password: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                        },
                    },
                },
                advancedData: {
                    type: "object",
                    properties: {
                        airPressure: {
                            type: "number",
                        },
                        uvIndex: {
                            type: "number",
                        },
                        pollenIndex: {
                            type: "number",
                        },
                        sondaName: {
                            type: "string",
                        },
                        dateMedition: {
                            type: "date",
                        },
                        hourMedition: {
                            type: "string",
                        },
                        deleted: {
                            type: "boolean",
                        },
                    },
                },
                airQuality: {
                    type: "object",
                    properties: {
                        airQualityIndex: {
                            type: "number",
                        },
                        sondaName: {
                            type: "string",
                        },
                        dateMedition: {
                            type: "date",
                        },
                        hourMedition: {
                            type: "string",
                        },
                        deleted: {
                            type: "boolean",
                        },
                    },
                    humidityData: {
                        type: "object",
                        properties: {
                            humidity: {
                                type: "number",
                            },
                            sondaName: {
                                type: "string",
                            },
                            dateMedition: {
                                type: "date",
                            },
                            hourMedition: {
                                type: "string",
                            },
                            deleted: {
                                type: "boolean",
                            },
                        },
                    },
                    image: {
                        type: "object",
                        properties: {
                            location: {
                                type: "string",
                            },
                            imageUrl: {
                                type: "string",
                            },
                            date: {
                                type: "date",
                            },
                            hour: {
                                type: "string",
                            },
                            deleted: {
                                type: "boolean",
                            },
                        },
                    },
                    metereorologyinfo: {
                        type: "object",
                        properties: {
                            temperature: {
                                type: "number",
                            },
                            windChill: {
                                type: "number",
                            },
                            cloudCover: {
                                type: "string",
                            },
                            sondaName: {
                                type: "string",
                            },
                            dateMedition: {
                                type: "date",
                            },
                            hourMedition: {
                                type: "string",
                            },
                            deleted: {
                                type: "boolean",
                            },
                        },
                    },
                    precipitationData: {
                        type: "object",
                        properties: {
                            precipitationType: {
                                type: "string",
                            },
                            precipitationProbability: {
                                type: "number",
                            },
                            sondaName: {
                                type: "string",
                            },
                            dateMedition: {
                                type: "date",
                            },
                            hourMedition: {
                                type: "string",
                            },
                            deleted: {
                                type: "boolean",
                            },
                        },
                    },
                    sonda: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                            },
                            description: {
                                type: "string",
                            },
                            location: {
                                type: "string",
                            },
                            deleted: {
                                type: "boolean",
                            },
                        },
                    },
                    windData: {
                        type: "object",
                        properties: {
                            windSpeed: {
                                type: "number",
                            },
                            windGustSpeed: {
                                type: "number",
                            },
                            windDirection: {
                                type: "string",
                            },
                            sondaName: {
                                type: "string",
                            },
                            dateMedition: {
                                type: "date",
                            },
                            hourMedition: {
                                type: "string",
                            },
                            deleted: {
                                type: "boolean",
                            },
                        },
                    },

                },


            }
        },
    },
    apis: ["./api/routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;