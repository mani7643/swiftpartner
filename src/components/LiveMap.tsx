"use client";

import { useEffect, useRef } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

export default function LiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: google.maps.Map;

    const loadMap = async () => {
      try {
        // Set options (replaces old Loader)
        setOptions({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
          version: "weekly",
          libraries: ["marker"],  // Add marker library if needed
        });

        // Import the maps library
        const { Map } = await importLibrary("maps") as any;

        if (!mapRef.current) return;

        // Initialize map
        map = new Map(mapRef.current, {
          center: { lat: 12.9716, lng: 77.5946 },  // Bangalore
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: true,
        });

        // Green rider marker
        const { AdvancedMarkerElement } = await importLibrary("marker") as any;
        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: 12.9716, lng: 77.5946 },
          title: "You are here",
          gmpClickable: false,
          content: createMarkerIcon(),  // Custom green dot
        });

        // Live location tracking (phone GPS)
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              marker.position = pos;
              map.setCenter(pos);
            },
            (error) => console.error("Location error:", error),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
          );
        }
      } catch (error) {
        console.error("Map load error:", error);
      }
    };

    // Custom green marker icon
    function createMarkerIcon() {
      const svg = document.createElement("div");
      svg.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="#10b981" stroke="#059669" stroke-width="3"/>
          <circle cx="20" cy="20" r="10" fill="#d1fae5"/>
        </svg>
      `;
      return svg;
    }

    loadMap();

    // Cleanup
    return () => {
      if (map) {
        map = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: "400px" }} />;
}