// Corridor layout, shared by the 3D scene and the DOM controller (kept free of three.js imports).
export const W = 3; // half width of the corridor
export const H = 4.2; // height
export const START_Z = 8.5;
export const END_Z = -40;

export const DOORS = [
  { id: 'about', label: 'About me', sub: "who I am", side: -1, z: -5 },
  { id: 'projects', label: 'Projects', sub: '14 products', side: 1, z: -12 },
  { id: 'experience', label: 'Experience', sub: "where I've worked", side: -1, z: -19 },
  { id: 'skills', label: 'Skills', sub: 'my toolbox', side: 1, z: -26 },
  { id: 'contact', label: 'Contact', sub: 'say hi!', side: -1, z: -33 },
] as const;

