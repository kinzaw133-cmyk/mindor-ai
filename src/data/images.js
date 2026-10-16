// Photo sources. Hotlinked from Unsplash by default.
// To use your own pictures, put files in /public/images and change `src` to e.g. '/images/hero.jpg'.
const u = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=75`

export const IMG = {
  hero:   { src: u('photo-1522202176988-66273c2fd55f'), alt: 'Students studying together with laptops and notes' },
  group:  { src: u('photo-1523240795612-9a054b0db644'), alt: 'A group of students working through problems together' },
  notes:  { src: u('photo-1434030216411-0b793f4b4173'), alt: 'Notebook and pen on a study desk' },
  reading:{ src: u('photo-1456513080510-7bf3a84b82f8'), alt: 'A student reading in a quiet library' },
  desk:   { src: u('photo-1488190211105-8b0e65b80b4e'), alt: 'Laptop and coffee on a tidy desk' },
  write:  { src: u('photo-1513258496099-48168024aec0'), alt: 'A student writing answers during exam practice' },
  auth:   { src: u('photo-1498243691581-b145c3f54a5a'), alt: 'A student studying on a laptop with a notebook' }
}
