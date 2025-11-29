"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function LiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null); // ← Add this line

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      // Create map
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 12.9716, lng: 77.5946 },
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      // Save map instance
      mapInstance.current = map;

      // Create marker
      const marker = new google.maps.Marker({
        map,
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#10b981" stroke="#059669" stroke-width="4"/>
              <circle cx="20" cy="20" r="10" fill="#d1fae5"/>
            </svg>
          `),
        },
      });

      // Live location tracking
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            marker.setPosition(pos);
            if (mapInstance.current) {
              mapInstance.current.panTo(pos); // ← Now 100% safe
            }
          },
          (error) => console.error("Location error:", error),
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          }
        );
      } else {
        alert("Geolocation not supported");
      }
    });
  }, []);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}