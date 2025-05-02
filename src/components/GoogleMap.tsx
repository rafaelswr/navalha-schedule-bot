
import { useEffect, useRef, useState } from "react";

interface GoogleMapProps {
  initialLat: number;
  initialLng: number;
  onLocationChange?: (lat: number, lng: number) => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export const GoogleMap = ({ initialLat, initialLng, onLocationChange }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
    // Function to initialize the map
    window.initMap = () => {
      if (!mapRef.current) return;

      const mapOptions = {
        center: { lat: initialLat, lng: initialLng },
        zoom: 15,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      };

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      const newMarker = new window.google.maps.Marker({
        position: { lat: initialLat, lng: initialLng },
        map: newMap,
        draggable: !!onLocationChange,
        animation: window.google.maps.Animation.DROP
      });
      setMarker(newMarker);

      // If onLocationChange is provided, add drag end listener
      if (onLocationChange) {
        newMarker.addListener("dragend", () => {
          const position = newMarker.getPosition();
          onLocationChange(position.lat(), position.lng());
        });
      }
    };

    // Load Google Maps API if it's not already loaded
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBiXDlZo-FKXJCn6Clo8bo22i2yzvs8Gw0&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    } else {
      window.initMap();
    }
  }, [initialLat, initialLng, onLocationChange]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};
