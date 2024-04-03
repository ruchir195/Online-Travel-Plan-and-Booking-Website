const Place = require("../models/Place-model");
const PlaceDetail = require("../models/PlaceDetails-model");
const path = require('path');
const fs = require('fs');


const flightDetails = {
    "Gujarat": {
        "Ahmedabad": {
            "airport": "Sardar Vallabhbhai Patel International Airport",
            "destinations": {
                "Goa": {
                    "airport": "Goa International Airport",
                    "flights": [
                        {
                            "flight_number": "AB123",
                            "departure_time": "08:00",
                            "arrival_time": "09:30",
                            "duration": "01:30",
                            "days": ["Monday", "Wednesday", "Friday"]
                        },
                        {
                            "flight_number": "CD456",
                            "departure_time": "14:30",
                            "arrival_time": "16:00",
                            "duration": "01:30",
                            "days": ["Tuesday", "Thursday", "Saturday", "Sunday"]
                        }
                    ]
                },
                "Mumbai": {
                    "airport": "Chhatrapati Shivaji Maharaj International Airport",
                    "flights": [
                        {
                            "flight_number": "EF789",
                            "departure_time": "10:00",
                            "arrival_time": "11:30",
                            "duration": "01:30",
                            "days": ["Monday", "Wednesday", "Friday", "Sunday"]
                        },
                        {
                            "flight_number": "GH012",
                            "departure_time": "17:00",
                            "arrival_time": "18:30",
                            "duration": "01:30",
                            "days": ["Tuesday", "Thursday", "Saturday"]
                        }
                    ]
                },
                "Himachal Pradesh": {
                    "airport": "Bhuntar Airport",
                    "flights": [
                        {
                            "flight_number": "IJ345",
                            "departure_time": "09:30",
                            "arrival_time": "13:00",
                            "duration": "03:30",
                            "days": ["Monday", "Thursday", "Saturday"]
                        }
                    ]
                },
                "Rajasthan": {
                    "airport": "Jaipur International Airport",
                    "flights": [
                        {
                            "flight_number": "KL678",
                            "departure_time": "12:00",
                            "arrival_time": "14:30",
                            "duration": "02:30",
                            "days": ["Tuesday", "Friday", "Sunday"]
                        }
                    ]
                },
                "Kerala": {
                    "airport": "Cochin International Airport",
                    "flights": [
                        {
                            "flight_number": "MN901",
                            "departure_time": "13:00",
                            "arrival_time": "16:30",
                            "duration": "03:30",
                            "days": ["Wednesday", "Saturday"]
                        }
                    ]
                }
            }
        },
        "Vadodara": {
            "airport": "Vadodara Airport",
            "destinations": {
                "Goa": {
                    "airport": "Goa International Airport",
                    "flights": [
                        {
                            "flight_number": "OP234",
                            "departure_time": "09:00",
                            "arrival_time": "10:30",
                            "duration": "01:30",
                            "days": ["Monday", "Wednesday", "Friday"]
                        },
                        {
                            "flight_number": "QR567",
                            "departure_time": "15:30",
                            "arrival_time": "17:00",
                            "duration": "01:30",
                            "days": ["Tuesday", "Thursday", "Saturday", "Sunday"]
                        }
                    ]
                },
                "Mumbai": {
                    "airport": "Chhatrapati Shivaji Maharaj International Airport",
                    "flights": [
                        {
                            "flight_number": "ST890",
                            "departure_time": "11:30",
                            "arrival_time": "13:00",
                            "duration": "01:30",
                            "days": ["Monday", "Wednesday", "Friday", "Sunday"]
                        },
                        {
                            "flight_number": "UV123",
                            "departure_time": "18:00",
                            "arrival_time": "19:30",
                            "duration": "01:30",
                            "days": ["Tuesday", "Thursday", "Saturday"]
                        }
                    ]
                },
                "Himachal Pradesh": {
                    "airport": "Bhuntar Airport",
                    "flights": [
                        {
                            "flight_number": "WX456",
                            "departure_time": "10:30",
                            "arrival_time": "14:00",
                            "duration": "03:30",
                            "days": ["Monday", "Thursday", "Saturday"]
                        }
                    ]
                },
                "Rajasthan": {
                    "airport": "Jaipur International Airport",
                    "flights": [
                        {
                            "flight_number": "YZ789",
                            "departure_time": "13:00",
                            "arrival_time": "15:30",
                            "duration": "02:30",
                            "days": ["Tuesday", "Friday", "Sunday"]
                        }
                    ]
                },
                "Kerala": {
                    "airport": "Cochin International Airport",
                    "flights": [
                        {
                            "flight_number": "AB012",
                            "departure_time": "14:00",
                            "arrival_time": "17:30",
                            "duration": "03:30",
                            "days": ["Wednesday", "Saturday"]
                        }
                    ]
                }
            }
        },
        "Surat": {
            "airport": "Surat International Airport",
            "destinations": {
                "Goa": {
                    "airport": "Goa International Airport",
                    "flights": [
                        {
                            "flight_number": "CD234",
                            "departure_time": "09:30",
                            "arrival_time": "11:00",
                            "duration": "01:30",
                            "days": ["Monday", "Wednesday", "Friday"]
                        },
                        {
                            "flight_number": "EF567",
                            "departure_time": "16:00",
                            "arrival_time": "17:30",
                            "duration": "01:30",
                            "days": ["Tuesday", "Thursday", "Saturday", "Sunday"]
                        }
                    ]
                },
                "Mumbai": {
                    "airport": "Chhatrapati Shivaji Maharaj International Airport",
                    "flights": [
                        {
                            "flight_number": "GH890",
                            "departure_time": "12:00",
                            "arrival_time": "13:30",
                            "duration": "01:30",
                            "days": ["Monday", "Wednesday", "Friday", "Sunday"]
                        },
                        {
                            "flight_number": "IJ123",
                            "departure_time": "18:30",
                            "arrival_time": "20:00",
                            "duration": "01:30",
                            "days": ["Tuesday", "Thursday", "Saturday"]
                        }
                    ]
                },
                "Himachal Pradesh": {
                    "airport": "Bhuntar Airport",
                    "flights": [
                        {
                            "flight_number": "KL456",
                            "departure_time": "11:00",
                            "arrival_time": "14:30",
                            "duration": "03:30",
                            "days": ["Monday", "Thursday", "Saturday"]
                        }
                    ]
                },
                "Rajasthan": {
                    "airport": "Jaipur International Airport",
                    "flights": [
                        {
                            "flight_number": "MN789",
                            "departure_time": "13:30",
                            "arrival_time": "16:00",
                            "duration": "02:30",
                            "days": ["Tuesday", "Friday", "Sunday"]
                        }
                    ]
                },
                "Kerala": {
                    "airport": "Cochin International Airport",
                    "flights": [
                        {
                            "flight_number": "OP012",
                            "departure_time": "14:30",
                            "arrival_time": "18:00",
                            "duration": "03:30",
                            "days": ["Wednesday", "Saturday"]
                        }
                    ]
                }
            }
        },
        "Rajkot": {
            "airport": "Rajkot Airport",
            "destinations": {
                "Goa": {
                    "airport": "Goa International Airport",
                    "flights": [
                        {
                            "flight_number": "QR234",
                            "departure_time": "10:00",
                            "arrival_time": "11:30",
                            "duration": "01:30",
                            "days": ["Monday", "Wednesday", "Friday"]
                        },
                        {
                            "flight_number": "ST567",
                            "departure_time": "16:30",
                            "arrival_time": "18:00",
                            "duration": "01:30",
                            "days": ["Tuesday", "Thursday", "Saturday", "Sunday"]
                        }
                    ]
                },
                "Mumbai": {
                    "airport": "Chhatrapati Shivaji Maharaj International Airport",
                    "flights": [
                        {
                            "flight_number": "UV890",
                            "departure_time": "11:00",
                            "arrival_time": "12:30",
                            "duration": "01:30",
                            "days": ["Monday", "Wednesday", "Friday", "Sunday"]
                        },
                        {
                            "flight_number": "WX123",
                            "departure_time": "17:30",
                            "arrival_time": "19:00",
                            "duration": "01:30",
                            "days": ["Tuesday", "Thursday", "Saturday"]
                        }
                    ]
                },
                "Himachal Pradesh": {
                    "airport": "Bhuntar Airport",
                    "flights": [
                        {
                            "flight_number": "YZ456",
                            "departure_time": "10:00",
                            "arrival_time": "13:30",
                            "duration": "03:30",
                            "days": ["Monday", "Thursday", "Saturday"]
                        }
                    ]
                },
                "Rajasthan": {
                    "airport": "Jaipur International Airport",
                    "flights": [
                        {
                            "flight_number": "AB789",
                            "departure_time": "13:00",
                            "arrival_time": "15:30",
                            "duration": "02:30",
                            "days": ["Tuesday", "Friday", "Sunday"]
                        }
                    ]
                },
                "Kerala": {
                    "airport": "Cochin International Airport",
                    "flights": [
                        {
                            "flight_number": "CD012",
                            "departure_time": "15:00",
                            "arrival_time": "18:30",
                            "duration": "03:30",
                            "days": ["Wednesday", "Saturday"]
                        }
                    ]
                }
            }
        },
        "Jamnagar": {
            "airport": "Jamnagar Airport",
            "destinations": {
                "Goa": {
                    "airport": "Goa International Airport",
                    "flights": [
                        {
                            "flight_number": "EF234",
                            "departure_time": "11:00",
                            "arrival_time": "12:30",
                            "duration": "01:30",
                            "days": ["Monday", "Wednesday", "Friday"]
                        },
                        {
                            "flight_number": "GH567",
                            "departure_time": "17:30",
                            "arrival_time": "19:00",
                            "duration": "01:30",
                            "days": ["Tuesday", "Thursday", "Saturday", "Sunday"]
                        }
                    ]
                },
                "Mumbai": {
                    "airport": "Chhatrapati Shivaji Maharaj International Airport",
                    "flights": [
                        {
                            "flight_number": "IJ890",
                            "departure_time": "12:00",
                            "arrival_time": "13:30",
                            "duration": "01:30",
                            "days": ["Monday", "Wednesday", "Friday", "Sunday"]
                        },
                        {
                            "flight_number": "KL123",
                            "departure_time": "18:30",
                            "arrival_time": "20:00",
                            "duration": "01:30",
                            "days": ["Tuesday", "Thursday", "Saturday"]
                        }
                    ]
                },
                "Himachal Pradesh": {
                    "airport": "Bhuntar Airport",
                    "flights": [
                        {
                            "flight_number": "MN456",
                            "departure_time": "11:30",
                            "arrival_time": "15:00",
                            "duration": "03:30",
                            "days": ["Monday", "Thursday", "Saturday"]
                        }
                    ]
                },
                "Rajasthan": {
                    "airport": "Jaipur International Airport",
                    "flights": [
                        {
                            "flight_number": "OP789",
                            "departure_time": "13:30",
                            "arrival_time": "16:00",
                            "duration": "02:30",
                            "days": ["Tuesday", "Friday", "Sunday"]
                        }
                    ]
                },
                "Kerala": {
                    "airport": "Cochin International Airport",
                    "flights": [
                        {
                            "flight_number": "QR012",
                            "departure_time": "15:30",
                            "arrival_time": "19:00",
                            "duration": "03:30",
                            "days": ["Wednesday", "Saturday"]
                        }
                    ]
                }
            }
        }
    }
}


const rflightDetails = {
    "routes": [
      {
        "from": "Goa",
        "to": "Ahmedabad",
        "flights": [
          {
            "flight_name": "GoaExpress",
            "departure_time": "10:00",
            "arrival_time": "12:30",
            "duration": "02:30",
            "price": "$200",
            "airline": "Example Airlines",
            "aircraft_type": "Boeing 737",
            "seats_available": 120
          },
          {
            "flight_name": "MumbaiConnection",
            "departure_time": "14:30",
            "arrival_time": "16:30",
            "duration": "02:00",
            "price": "$180",
            "airline": "Sample Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 150
          }
        ]
      },
      {
        "from": "Mumbai",
        "to": "Ahmedabad",
        "flights": [
          {
            "flight_name": "MumbaiExpress",
            "departure_time": "08:00",
            "arrival_time": "10:00",
            "duration": "02:00",
            "price": "$220",
            "airline": "SkyHigh Airlines",
            "aircraft_type": "Boeing 737",
            "seats_available": 100
          },
          {
            "flight_name": "WesternWings",
            "departure_time": "12:00",
            "arrival_time": "14:00",
            "duration": "02:00",
            "price": "$210",
            "airline": "WingStar Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 130
          }
        ]
      },
      {
        "from": "Shimla",
        "to": "Ahmedabad",
        "flights": [
          {
            "flight_name": "ShimlaSky",
            "departure_time": "09:30",
            "arrival_time": "12:00",
            "duration": "02:30",
            "price": "$240",
            "airline": "FlyHigh Airlines",
            "aircraft_type": "Boeing 737",
            "seats_available": 90
          },
          {
            "flight_name": "SnowBird",
            "departure_time": "13:30",
            "arrival_time": "16:00",
            "duration": "02:30",
            "price": "$230",
            "airline": "Snowy Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 110
          }
        ]
      },
      {
        "from": "Kashmir",
        "to": "Ahmedabad",
        "flights": [
          {
            "flight_name": "KashmirLink",
            "departure_time": "11:00",
            "arrival_time": "14:00",
            "duration": "03:00",
            "price": "$250",
            "airline": "Mountain Air",
            "aircraft_type": "Boeing 737",
            "seats_available": 80
          },
          {
            "flight_name": "ValleyExpress",
            "departure_time": "15:30",
            "arrival_time": "18:30",
            "duration": "03:00",
            "price": "$260",
            "airline": "Valley Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 120
          }
        ]
      },
      {
        "from": "Kerala",
        "to": "Ahmedabad",
        "flights": [
          {
            "flight_name": "KeralaSky",
            "departure_time": "07:00",
            "arrival_time": "10:00",
            "duration": "03:00",
            "price": "$280",
            "airline": "Coconut Airways",
            "aircraft_type": "Boeing 737",
            "seats_available": 100
          },
          {
            "flight_name": "GreenWings",
            "departure_time": "14:00",
            "arrival_time": "17:00",
            "duration": "03:00",
            "price": "$270",
            "airline": "EcoFly Airlines",
            "aircraft_type": "Airbus A320",
            "seats_available": 130
          }
        ]
      },
      {
        "from": "Goa",
        "to": "Vadodara",
        "flights": [
          {
            "flight_name": "GoaToVadodara",
            "departure_time": "09:00",
            "arrival_time": "10:30",
            "duration": "01:30",
            "price": "$150",
            "airline": "SkyConnect",
            "aircraft_type": "Boeing 737",
            "seats_available": 120
          },
          {
            "flight_name": "GoaExpress",
            "departure_time": "12:00",
            "arrival_time": "13:30",
            "duration": "01:30",
            "price": "$160",
            "airline": "ExpressAir",
            "aircraft_type": "Airbus A320",
            "seats_available": 150
          }
        ]
      },
      {
        "from": "Mumbai",
        "to": "Vadodara",
        "flights": [
          {
            "flight_name": "MumbaiToVadodara",
            "departure_time": "08:30",
            "arrival_time": "10:00",
            "duration": "01:30",
            "price": "$170",
            "airline": "MumbaiAir",
            "aircraft_type": "Boeing 737",
            "seats_available": 100
          },
          {
            "flight_name": "WesternWings",
            "departure_time": "13:00",
            "arrival_time": "14:30",
            "duration": "01:30",
            "price": "$180",
            "airline": "WingStar Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 130
          }
        ]
      },
      {
        "from": "Shimla",
        "to": "Vadodara",
        "flights": [
          {
            "flight_name": "ShimlaToVadodara",
            "departure_time": "10:30",
            "arrival_time": "12:00",
            "duration": "01:30",
            "price": "$190",
            "airline": "ShimlaAir",
            "aircraft_type": "Boeing 737",
            "seats_available": 90
          },
          {
            "flight_name": "SnowBird",
            "departure_time": "14:30",
            "arrival_time": "16:00",
            "duration": "01:30",
            "price": "$200",
            "airline": "Snowy Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 110
          }
        ]
      },
      {
        "from": "Kashmir",
        "to": "Vadodara",
        "flights": [
          {
            "flight_name": "KashmirLink",
            "departure_time": "09:00",
            "arrival_time": "11:30",
            "duration": "02:30",
            "price": "$210",
            "airline": "Kashmir Airways",
            "aircraft_type": "Boeing 737",
            "seats_available": 80
          },
          {
            "flight_name": "ValleyExpress",
            "departure_time": "13:30",
            "arrival_time": "16:00",
            "duration": "02:30",
            "price": "$220",
            "airline": "Valley Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 120
          }
        ]
      },
      {
        "from": "Kerala",
        "to": "Vadodara",
        "flights": [
          {
            "flight_name": "KeralaSky",
            "departure_time": "07:30",
            "arrival_time": "09:30",
            "duration": "02:00",
            "price": "$230",
            "airline": "Kerala Wings",
            "aircraft_type": "Boeing 737",
            "seats_available": 100
          },
          {
            "flight_name": "GreenWings",
            "departure_time": "12:30",
            "arrival_time": "14:30",
            "duration": "02:00",
            "price": "$240",
            "airline": "EcoFly Airlines",
            "aircraft_type": "Airbus A320",
            "seats_available": 130
          }
        ]
      },
      {
        "from": "Goa",
        "to": "Surat",
        "flights": [
          {
            "flight_name": "GoaToSurat",
            "departure_time": "08:00",
            "arrival_time": "09:30",
            "duration": "01:30",
            "price": "$130",
            "airline": "SkyConnect",
            "aircraft_type": "Boeing 737",
            "seats_available": 120
          },
          {
            "flight_name": "GoaExpress",
            "departure_time": "12:00",
            "arrival_time": "13:30",
            "duration": "01:30",
            "price": "$140",
            "airline": "ExpressAir",
            "aircraft_type": "Airbus A320",
            "seats_available": 150
          }
        ]
      },
      {
        "from": "Mumbai",
        "to": "Surat",
        "flights": [
          {
            "flight_name": "MumbaiToSurat",
            "departure_time": "09:30",
            "arrival_time": "11:00",
            "duration": "01:30",
            "price": "$150",
            "airline": "MumbaiAir",
            "aircraft_type": "Boeing 737",
            "seats_available": 100
          },
          {
            "flight_name": "WesternWings",
            "departure_time": "13:30",
            "arrival_time": "15:00",
            "duration": "01:30",
            "price": "$160",
            "airline": "WingStar Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 130
          }
        ]
      },
      {
        "from": "Shimla",
        "to": "Surat",
        "flights": [
          {
            "flight_name": "ShimlaToSurat",
            "departure_time": "10:00",
            "arrival_time": "11:30",
            "duration": "01:30",
            "price": "$170",
            "airline": "ShimlaAir",
            "aircraft_type": "Boeing 737",
            "seats_available": 90
          },
          {
            "flight_name": "SnowBird",
            "departure_time": "14:00",
            "arrival_time": "15:30",
            "duration": "01:30",
            "price": "$180",
            "airline": "Snowy Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 110
          }
        ]
      },
      {
        "from": "Kashmir",
        "to": "Surat",
        "flights": [
          {
            "flight_name": "KashmirLink",
            "departure_time": "08:30",
            "arrival_time": "11:00",
            "duration": "02:30",
            "price": "$190",
            "airline": "Kashmir Airways",
            "aircraft_type": "Boeing 737",
            "seats_available": 80
          },
          {
            "flight_name": "ValleyExpress",
            "departure_time": "12:30",
            "arrival_time": "15:00",
            "duration": "02:30",
            "price": "$200",
            "airline": "Valley Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 120
          }
        ]
      },
      {
        "from": "Kerala",
        "to": "Surat",
        "flights": [
          {
            "flight_name": "KeralaSky",
            "departure_time": "09:00",
            "arrival_time": "12:00",
            "duration": "03:00",
            "price": "$210",
            "airline": "Kerala Wings",
            "aircraft_type": "Boeing 737",
            "seats_available": 100
          },
          {
            "flight_name": "GreenWings",
            "departure_time": "14:00",
            "arrival_time": "17:00",
            "duration": "03:00",
            "price": "$220",
            "airline": "EcoFly Airlines",
            "aircraft_type": "Airbus A320",
            "seats_available": 130
          }
        ]
      },
      {
        "from": "Goa",
        "to": "Rajkot",
        "flights": [
          {
            "flight_name": "GoaToRajkot",
            "departure_time": "08:30",
            "arrival_time": "11:00",
            "duration": "02:30",
            "price": "$190",
            "airline": "SkyConnect",
            "aircraft_type": "Boeing 737",
            "seats_available": 120
          },
          {
            "flight_name": "GoaExpress",
            "departure_time": "12:30",
            "arrival_time": "15:00",
            "duration": "02:30",
            "price": "$200",
            "airline": "ExpressAir",
            "aircraft_type": "Airbus A320",
            "seats_available": 150
          }
        ]
      },
      {
        "from": "Mumbai",
        "to": "Rajkot",
        "flights": [
          {
            "flight_name": "MumbaiToRajkot",
            "departure_time": "09:00",
            "arrival_time": "11:30",
            "duration": "02:30",
            "price": "$210",
            "airline": "MumbaiAir",
            "aircraft_type": "Boeing 737",
            "seats_available": 100
          },
          {
            "flight_name": "WesternWings",
            "departure_time": "13:00",
            "arrival_time": "15:30",
            "duration": "02:30",
            "price": "$220",
            "airline": "WingStar Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 130
          }
        ]
      },
      {
        "from": "Shimla",
        "to": "Rajkot",
        "flights": [
          {
            "flight_name": "ShimlaToRajkot",
            "departure_time": "10:30",
            "arrival_time": "13:00",
            "duration": "02:30",
            "price": "$230",
            "airline": "ShimlaAir",
            "aircraft_type": "Boeing 737",
            "seats_available": 90
          },
          {
            "flight_name": "SnowBird",
            "departure_time": "14:30",
            "arrival_time": "17:00",
            "duration": "02:30",
            "price": "$240",
            "airline": "Snowy Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 110
          }
        ]
      },
      {
        "from": "Kashmir",
        "to": "Rajkot",
        "flights": [
          {
            "flight_name": "KashmirLink",
            "departure_time": "09:00",
            "arrival_time": "12:00",
            "duration": "03:00",
            "price": "$250",
            "airline": "Kashmir Airways",
            "aircraft_type": "Boeing 737",
            "seats_available": 80
          },
          {
            "flight_name": "ValleyExpress",
            "departure_time": "13:30",
            "arrival_time": "16:30",
            "duration": "03:00",
            "price": "$260",
            "airline": "Valley Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 120
          }
        ]
      },
      {
        "from": "Kerala",
        "to": "Rajkot",
        "flights": [
          {
            "flight_name": "KeralaSky",
            "departure_time": "07:30",
            "arrival_time": "10:30",
            "duration": "03:00",
            "price": "$270",
            "airline": "Kerala Wings",
            "aircraft_type": "Boeing 737",
            "seats_available": 100
          },
          {
            "flight_name": "GreenWings",
            "departure_time": "12:30",
            "arrival_time": "15:30",
            "duration": "03:00",
            "price": "$280",
            "airline": "EcoFly Airlines",
            "aircraft_type": "Airbus A320",
            "seats_available": 130
          }
        ]
      },
      {
        "from": "Goa",
        "to": "Jamnagar",
        "flights": [
          {
            "flight_name": "GoaToJamnagar",
            "departure_time": "08:00",
            "arrival_time": "10:00",
            "duration": "02:00",
            "price": "$150",
            "airline": "SkyConnect",
            "aircraft_type": "Boeing 737",
            "seats_available": 120
          },
          {
            "flight_name": "GoaExpress",
            "departure_time": "12:30",
            "arrival_time": "14:30",
            "duration": "02:00",
            "price": "$160",
            "airline": "ExpressAir",
            "aircraft_type": "Airbus A320",
            "seats_available": 150
          }
        ]
      },
      {
        "from": "Mumbai",
        "to": "Jamnagar",
        "flights": [
          {
            "flight_name": "MumbaiToJamnagar",
            "departure_time": "09:00",
            "arrival_time": "11:00",
            "duration": "02:00",
            "price": "$170",
            "airline": "MumbaiAir",
            "aircraft_type": "Boeing 737",
            "seats_available": 100
          },
          {
            "flight_name": "WesternWings",
            "departure_time": "13:30",
            "arrival_time": "15:30",
            "duration": "02:00",
            "price": "$180",
            "airline": "WingStar Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 130
          }
        ]
      },
      {
        "from": "Shimla",
        "to": "Jamnagar",
        "flights": [
          {
            "flight_name": "ShimlaToJamnagar",
            "departure_time": "10:30",
            "arrival_time": "12:30",
            "duration": "02:00",
            "price": "$190",
            "airline": "ShimlaAir",
            "aircraft_type": "Boeing 737",
            "seats_available": 90
          },
          {
            "flight_name": "SnowBird",
            "departure_time": "14:00",
            "arrival_time": "16:00",
            "duration": "02:00",
            "price": "$200",
            "airline": "Snowy Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 110
          }
        ]
      },
      {
        "from": "Kashmir",
        "to": "Jamnagar",
        "flights": [
          {
            "flight_name": "KashmirLink",
            "departure_time": "09:30",
            "arrival_time": "12:30",
            "duration": "03:00",
            "price": "$210",
            "airline": "Kashmir Airways",
            "aircraft_type": "Boeing 737",
            "seats_available": 80
          },
          {
            "flight_name": "ValleyExpress",
            "departure_time": "13:00",
            "arrival_time": "16:00",
            "duration": "03:00",
            "price": "$220",
            "airline": "Valley Airways",
            "aircraft_type": "Airbus A320",
            "seats_available": 120
          }
        ]
      },
      {
        "from": "Kerala",
        "to": "Jamnagar",
        "flights": [
          {
            "flight_name": "KeralaSky",
            "departure_time": "08:00",
            "arrival_time": "11:00",
            "duration": "03:00",
            "price": "$230",
            "airline": "Kerala Wings",
            "aircraft_type": "Boeing 737",
            "seats_available": 100
          },
          {
            "flight_name": "GreenWings",
            "departure_time": "12:30",
            "arrival_time": "15:30",
            "duration": "03:00",
            "price": "$240",
            "airline": "EcoFly Airlines",
            "aircraft_type": "Airbus A320",
            "seats_available": 130
          }
        ]
      }
    ]
  }
  



const flight_details = async (req, res) => {
    const { placeName, departureCity } = req.body;

    console.log(placeName);
    console.log(departureCity);

    if (!placeName || !departureCity) {
        return res.status(400).json({ message: 'Place name and departure city are required.' });
    }


    if (!flightDetails['Gujarat'][departureCity]) {
        return res.status(404).json({ message: 'Place not found.' });
    }

    if (!flightDetails['Gujarat'][departureCity]['destinations'][placeName]) {
        return res.status(404).json({ message: 'Destination not found.' });
    }


    const flights = flightDetails['Gujarat'][departureCity]['destinations'][placeName]['flights'];
    // console.log(flights);
    res.json({ flights });
}





const rflight_details = async (req, res) => {
  const { placeName, departureCity } = req.body;

  console.log("rfla", placeName);
  console.log("depcity", departureCity);

  console.log("Ruchir");

  if (!placeName || !departureCity) {
      return res.status(400).json({ message: 'Place name and departure city are required.' });
  }

  if (!rflightDetails.routes.some(route => route.from === placeName && route.to === departureCity)) {
      return res.status(404).json({ message: 'No flights found for the requested route.' });
  }

  const rflightsFiltered = rflightDetails.routes.filter(route => route.from === placeName && route.to === departureCity);

  if (rflightsFiltered.length > 0) {
      const rflights = rflightsFiltered[0].flights;
      console.log("rFlight : ", rflights);
      res.json({ rflights });
  } else {
      res.status(404).json({ message: 'No flights found for the requested route.' });
  }
}




const event = async (req, res) => {
    try {
        const { placeName, departureCity, placesName, duration } = req.body;

        // Check if req.file exists and is an image file
        if (!req.file || !req.file.filename) {
            return res.status(400).send({ msg: "No image file provided" });
        }

        const imageName = req.file.filename;

        console.log(req.file.filename);
        const imageData = {
            data: fs.readFileSync(path.join(__dirname, '../../frontend/src/ImagesUpload/', req.file.filename)),
            contentType: req.file.mimetype // Use the mimetype provided by multer
        };

        const eventData = await Place.create({

            placeName,
            departureCity,
            placesName,
            duration,
            image: imageData,
            imageName
        });

        // console.log(eventData);
        res.status(200).send({ msg: "Form successfully submitted", eventData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};



const eventPage = async (req, res) => {
    try {
        const eventData = await Place.find({});
        // console.log(eventData);
        res.status(200).send({ msg: "Form successfully submitted", eventData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};


const place = async (req, res) => {
    try {
        const { placeName, placeContent, duration, adultCost, childCost, flight, rflight, hotelName, area, placesName, dayDetails, placesDetails, placeID } = req.body;

        // console.log(placesDetails)
        // // Day details validation (remove empty day objects)
        // //      const filteredDayDetails = dayDetails?.filter((dayField) => dayField.details.trim());
        // // if (!filteredDayDetails || !filteredDayDetails.length) {
        // //     return res.status(400).send({ msg: 'Please provide day details!' });
        // // }

        // Validate day details
        if (!Array.isArray(dayDetails) || dayDetails.length === 0) {
            return res.status(400).json({ msg: 'Please provide valid day details!' });
        }

        if (!Array.isArray(placesDetails) || placesDetails.length === 0) {
            return res.status(400).json({ msg: 'Please provide valid places details!' });
        }







        if (!req.files || !req.files.img2 || !req.files.img3 || !req.files.img4 || !req.files.img5) {
            return res.status(400).send({ msg: "No image file provided" });
        }

        const img2Name = req.files.img2[0].filename;
        const img3Name = req.files.img3[0].filename;
        const img4Name = req.files.img4[0].filename;
        const img5Name = req.files.img5[0].filename;

        const img2Data = {
            data: fs.readFileSync(path.join(__dirname, '../../frontend/src/ImagesUpload/', req.files.img2[0].filename)),
            contentType: req.files.img2[0].mimetype // Use the mimetype provided by multer       
        };

        const img3Data = {
            data: fs.readFileSync(path.join(__dirname, '../../frontend/src/ImagesUpload/', req.files.img3[0].filename)),
            contentType: req.files.img3[0].mimetype // Use the mimetype provided by multer       
        };

        const img4Data = {
            data: fs.readFileSync(path.join(__dirname, '../../frontend/src/ImagesUpload/', req.files.img4[0].filename)),
            contentType: req.files.img4[0].mimetype // Use the mimetype provided by multer       
        };

        const img5Data = {
            data: fs.readFileSync(path.join(__dirname, '../../frontend/src/ImagesUpload/', req.files.img5[0].filename)),
            contentType: req.files.img5[0].mimetype // Use the mimetype provided by multer       
        };



        const placeData = await PlaceDetail.create({
            placeName,
            placesName,
            duration,
            placeContent,
            adultCost,
            childCost,
            flight,
            rflight,
            hotelName,
            area,
            img2: img2Data,
            img3: img3Data,
            img4: img4Data,
            img5: img5Data,
            img2Name,
            img3Name,
            img4Name,
            img5Name,
            dayDetails,
            placesDetails,
            placeID
        });

        // console.log(eventData);
        res.status(200).send({ msg: "Form successfully submitted", placeData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ error: "Internal server error" });
    }
}


const placePage = async (req, res) => {
    try {

        // const placeName = req.params.placeName;
        const placeID = req.params.id;
        console.log("placeid: ", placeID);
        // console.log(req.params.id);

        // console.log("placeName : ", req.params.placeName);
        const placeData = await PlaceDetail.findOne({ placeID });
        // console.log(placeData);
        res.status(200).send({ msg: "Form successfully submitted", placeData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};

const packages = async (req, res) => {
    try {
        const { startingCity, destination } = req.body;

        // Query the Place collection for the startingCity and destination
        const startingCityPlace = await Place.find({ departureCity: startingCity });
        const destinationPlace = await Place.find({ placeName: destination });
        // Check if both places are found
        if (!startingCityPlace || !destinationPlace) {
            const notFound = {};
            if (!startingCityPlace) {
                notFound.startingCity = startingCity;
            }
            if (!destinationPlace) {
                notFound.destination = destination;
            }
            return res.status(404).json({ error: 'Starting city or destination not found', notFound });
        }

        // If both places are found, you can proceed with further logic
        // For example, you can now use startingCityPlace and destinationPlace in your logic
        if (startingCityPlace && destinationPlace) {
            res.status(200).json({ startingCityPlace })
        }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { event, eventPage, place, placePage, flight_details, rflight_details, packages };
