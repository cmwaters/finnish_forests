const routes = [
    {
        name: "Punarinnankierros Trail - 2.4 km",
        status: "Open",
        duration: "50 minutes",
        description: "Difficult terrain",
        coordinates: [
            {
                lat: 60.306601,
                lng: 24.51148,
            },
            {
                lat: 60.30685,
                lng: 24.524148,
            },
            {
                lat: 60.305996,
                lng: 24.511531,
            }
        ],
        waypoints: [
            {
                latitude: 60.30685,
                longitude: 24.524148,
            }
        ]
    },
    {
        name: "Korpinkierros Trail - 6.4 km",
        status: "Open",
        duration: "2 hours 30 minutes",
        description: "Easy trail, open rocky ground",
        coordinates: [
            {
                lat: 60.311838,
                lng: 24.449307,
            },
            {
                lat: 60.321092,
                lng: 24.448947,
            },
            {
                lat: 60.312672,
                lng: 24.453176,
            }
        ],
        waypoints: [
            {
                latitude: 60.321092,
                longitude: 24.448947,
            }
        ]
    },
    {
        name: "Haukankierros Trail - 8.5 km",
        status: "Open",
        duration: "3 hours",
        description: "Challenging trail",
        coordinates: [
            {
                lat: 60.374321,
                lng: 24.500165,
            },
            {
                lat: 60.374597,
                lng: 24.481546,
            },
            {
                lat: 60.349246,
                lng: 24.506887,
            },
            {
                lat: 60.373399,
                lng: 24.497253,
            }
        ],
        waypoints: [
            {
                latitude: 60.374597,
                longitude: 24.481546,
            },
            {
                latitude: 60.349246,
                longitude: 24.506887,
            }
        ]
    },
    {
        name: "Kaarniaispolku Nature Trail - 10.2 km",
        status: "Open",
        duration: "3 hours 40 minutes",
        description: "Challenging due to height differences, no winter maintenance",
        coordinates: [
            {
                lat: 60.292644,
                lng: 24.53259,
            },
            {
                lat: 60.305623,
                lng: 24.509018,
            },
            {
                lat: 60.31505,
                lng: 24.506231,
            },
            {
                lat: 60.305381,
                lng: 24.522423,
            },
            {
                lat: 60.292777,
                lng: 24.532155,
            }
        ],
        waypoints: [
            {
                latitude: 60.305623,
                longitude: 24.509018,
            },
            {
                latitude: 60.31505,
                longitude: 24.506231,
            },
            {
                latitude: 60.305381,
                longitude: 24.522423,
            },
        ]
    },
    {
        name: "Veikkola-Salmi Trail - 13 km",
        status: "Open",
        duration: "4 hours 40 minutes",
        description: "Suitable for biking",
        coordinates: [
            {
                lat: 60.294254,
                lng: 24.556988,
            },
            {
                lat: 60.311918,
                lng: 24.511138,
            },
            {
                lat: 60.321852,
                lng: 24.512457,
            },
            {
                lat: 60.293415,
                lng: 24.558732,
            }
        ],
        waypoints: [
            {
                latitude: 60.311918,
                longitude: 24.511138,
            },
            {
                latitude: 60.321852,
                longitude: 24.512457,
            }
        ]
    },
    {
        name: "Haukkalampi-Haltia Trail - 5 km",
        status: "Closed",
        duration: "2 hours",
        description: "Specially designed for schoolchildren ",
        coordinates: [
            {
                lat: 60.293137,
                lng: 24.558558,
            },
            {
                lat: 60.300252,
                lng: 24.567617,
            },
            {
                lat: 60.293086,
                lng: 24.558559,
            }
        ],
        waypoints: [
            {
                latitude: 60.300252,
                longitude: 24.567617
            }
        ],
        alerts: [
            "This section is closed over nursing season (March - April)"
        ]
    },
    {
        name: "Matalajarvi Trail - 5.1 km",
        status: "Open",
        duration: "2 hours 6 minutes",
        description: "Easily accessable with public transport. Bird watching opportunities.",
        coordinates: [
            {
                lat: 60.249433,
                lng: 24.706137,
            },
            {
                lat: 60.268440,
                lng: 24.667974,
            }
        ]
    },
    {
        name: "Kaarniaispolku Trail - 11.8 km",
        status: "Open",
        duration: "4 hours 20 minutes",
        description: "Can be used for cross-country skiing",
        coordinates: [
            {
                lat: 60.298740,
                lng: 24.448652,
            },
            {
                lat: 60.313926,
                lng: 24.461803,
            },
            {
                lat: 60.312009,
                lng: 24.444428,
            },
            {
                lat: 60.299431,
                lng: 24.446514,
            }
        ],
        waypoints: [
            {
                latitude: 60.313926,
                longitude: 24.461803,
            },
            {
                latitude: 60.312009,
                longitude: 24.444428,
            }
        ]
    },
];

// Counters:

// {lat: 60.303525451006834, lng: 24.550391008969527},
// {lat: 60.27581963490531, lng: 24.463689284278516},
// {lat: 60.29819039594651, lng: 24.45628974906327},
// {lat: 60.2824219963335, lng: 24.505873789599413},
// {lat: 60.326924542956334, lng: 24.495358359272675},
// {lat: 60.33073081360451, lng: 24.492838046488888},
// {lat: 60.31295694299057, lng: 24.447281862291263},
// {lat: 60.24969716104745, lng: 24.698307563459544}

module.exports = routes;
