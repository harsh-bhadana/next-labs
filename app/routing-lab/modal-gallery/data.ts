export type Photo = {
  id: string;
  title: string;
  description: string;
  url: string;
  accentColor: string;
};

export const photos: Photo[] = [
  {
    id: "1",
    title: "Mountain Solitude",
    description: "A serene peak captured during the golden hour in the Swiss Alps.",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    accentColor: "indigo"
  },
  {
    id: "2",
    title: "Urban Echoes",
    description: "Mist settling between skyscrapers in downtown Tokyo.",
    url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800",
    accentColor: "blue"
  },
  {
    id: "3",
    title: "Desert Whisper",
    description: "Endless dunes reflecting the soft pink of a Sahara sunset.",
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800",
    accentColor: "amber"
  },
  {
    id: "4",
    title: "Forest Canopy",
    description: "Light filtering through ancient redwoods in the Pacific Northwest.",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800",
    accentColor: "emerald"
  },
  {
    id: "5",
    title: "Ocean Rhythm",
    description: "Aggressive waves crashing against the rugged cliffs of Iceland.",
    url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=800",
    accentColor: "cyan"
  },
  {
    id: "6",
    title: "Neon Nights",
    description: "Cyberpunk vibes in the rain-slicked streets of Seoul.",
    url: "https://images.unsplash.com/photo-1534239143101-1b1c627395c5?auto=format&fit=crop&q=80&w=800",
    accentColor: "rose"
  }
];

export function getPhotoById(id: string) {
  return photos.find((p) => p.id === id);
}
