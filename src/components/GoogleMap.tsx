
import { useEffect, useRef, useState } from "react";

interface GoogleMapProps {
  initialLat: number;
  initialLng: number;
  onLocationChange?: (lat: number, lng: number) => void;
}

export const GoogleMap = ({ initialLat, initialLng, onLocationChange }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Load Google Maps script
  useEffect(() => {
    // Check if the API script is already loaded
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }
    
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA-mOB5XKBjZHo8XU4VcX6sPOGgG-woPdQ&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    
    googleMapsScript.addEventListener('load', () => {
      setMapLoaded(true);
    });
    
    document.head.appendChild(googleMapsScript);
    
    return () => {
      document.head.removeChild(googleMapsScript);
    };
  }, []);
  
  // Initialize map once script is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: initialLat, lng: initialLng },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
    });
    
    const markerInstance = new window.google.maps.Marker({
      position: { lat: initialLat, lng: initialLng },
      map: mapInstance,
      draggable: true,
      title: "Localização da Barbearia",
    });
    
    // Add marker drag event listener
    markerInstance.addListener('dragend', () => {
      const position = markerInstance.getPosition();
      if (position && onLocationChange) {
        onLocationChange(position.lat(), position.lng());
      }
    });
    
    setMap(mapInstance);
    setMarker(markerInstance);
    
    return () => {
      // Clean up
      if (markerInstance) {
        markerInstance.setMap(null);
      }
    };
  }, [mapLoaded, initialLat, initialLng, onLocationChange]);
  
  return (
    <div ref={mapRef} className="w-full h-full">
      {!mapLoaded && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p>Carregando mapa...</p>
        </div>
      )}
    </div>
  );
};
