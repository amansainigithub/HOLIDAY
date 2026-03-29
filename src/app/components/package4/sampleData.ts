export const SAMPLE_DATA = {
  packageTitle: "Goa Beach Holiday Package",
  startDate: "2026-04-10",
  packageImages: [
    {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      fileName: "goa-beach.jpg",
      title: "Goa Beach View",
      order: 1
    },
    {
      url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
      fileName: "resort.jpg",
      title: "Luxury Resort",
      order: 2
    }
  ],
  days: [
    {
      dayTitle: "Arrival & Leisure",
      date: "2026-04-10",
      travels: [
        {
          from: "Delhi",
          to: "Goa",
          mode: "Flight",
          time: "09:30"
        }
      ],
      hotels: [
        {
          hotelName: "Sea View Resort",
          city: "Goa",
          checkIn: "2026-04-10",
          checkOut: "2026-04-13",
          images: [
            {
              url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
              fileName: "hotel1.jpg",
              title: "Hotel Room",
              order: 1
            },
            {
              url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
              fileName: "hotel2.jpg",
              title: "Swimming Pool",
              order: 2
            }
          ]
        }
      ],
      sightseeing: [
        {
          placeName: "Baga Beach",
          description: "Relax at one of Goa's most popular beaches",
          time: "16:00",
          images: [
            {
              url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
              fileName: "baga.jpg",
              title: "Baga Beach",
              order: 1
            }
          ]
        }
      ],
      activities: [
        {
          activityName: "Water Sports",
          duration: "2 Hours",
          vendor: "Goa Adventure Club",
          images: [
            {
              url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
              fileName: "jetski.jpg",
              title: "Jet Ski",
              order: 1
            },
            {
              url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
              fileName: "parasailing.jpg",
              title: "Parasailing",
              order: 2
            }
          ]
        }
      ],
      meals: [
        {
          mealType: "Dinner",
          menu: "Goan Fish Curry, Rice, Salad",
          time: "20:00"
        }
      ]
    },
    {
      dayTitle: "Full Day Exploration",
      date: "2026-04-11",
      travels: [],
      hotels: [],
      sightseeing: [
        {
          placeName: "Fort Aguada",
          description: "Historic Portuguese fort with sea views",
          time: "11:00",
          images: [
            {
              url: "https://images.unsplash.com/photo-1590073242678-70ee3fc28c48",
              fileName: "fort.jpg",
              title: "Fort Aguada",
              order: 1
            }
          ]
        }
      ],
      activities: [
        {
          activityName: "Cruise Ride",
          duration: "1.5 Hours",
          vendor: "Mandovi Cruises",
          images: [
            {
              url: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b",
              fileName: "cruise.jpg",
              title: "Evening Cruise",
              order: 1
            }
          ]
        }
      ],
      meals: [
        {
          mealType: "Breakfast",
          menu: "Bread, Omelette, Juice",
          time: "09:00"
        },
        {
          mealType: "Lunch",
          menu: "Veg Thali",
          time: "14:00"
        }
      ]
    },
    {
      dayTitle: "Departure & Local Shopping",
      date: "2026-03-28",
      travels: [
        {
          from: "Goa",
          to: "delhi",
          mode: "Bus",
          time: "12:45"
        }
      ],
      hotels: [
        {
          hotelName: "Tripti Hotel",
          city: "Goa",
          checkIn: "2026-03-05",
          checkOut: "2026-03-19",
          images: [
            {
              url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
              fileName: "Screenshot 2026-03-28 024854.png",
              title: "Dummy Hotel Image",
              order: 1
            }
          ]
        }
      ],
      sightseeing: [
        {
          placeName: "Anjuna Flea Market",
          description: "Famous market for souvenirs, clothes, and local handicrafts",
          time: "11:05",
          images: [
            {
              url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
              fileName: "Screenshot 2026-03-28 024854.png",
              title: "Dummy Sightseeing Image",
              order: 1
            }
          ]
        }
      ],
      activities: [
        {
          activityName: "Beach Walk",
          duration: "1 Hour",
          vendor: "Self",
          images: [
            {
              url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
              fileName: "Screenshot 2026-03-28 024854.png",
              title: "Dummy Activity Image",
              order: 1
            }
          ]
        }
      ],
      meals: [
        {
          mealType: "Breakfast",
          menu: "no menu",
          time: "04:44"
        }
      ]
    }
  ],
  stayPlan: [
    { nights: "3", days: "4", city: "Goa" },
    { nights: "1", days: "3", city: "Shimla" },
    { nights: "1", days: "2", city: "Kashmir" }
  ]
};