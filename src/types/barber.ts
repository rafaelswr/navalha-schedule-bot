
export interface Barber {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  photoUrl: string;
  status: "active" | "inactive";
}

export interface BarberFormData {
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  photo?: File | null;
  photoUrl?: string;
  status: "active" | "inactive";
  password?: string;
}

export interface UseBarberOptions {
  barberId?: string;
}
