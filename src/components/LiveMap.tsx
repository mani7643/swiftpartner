"use client";

import { useEffect, useRef } from "react";

export default function LiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);

  useEffect(() => {
    if (mapInitialized.current) return;
    mapInitialized.current = true;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Wait a tiny bit for google.maps to be fully ready
      setTimeout(() => {
        initializeMap();
      }, 100);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google?.maps) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 12.9716, lng: 77.5946 },
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: "greedy",
        styles: [
          { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
        ],
      });

      const marker = new window.google.maps.Marker({
        map,
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22" cy="22" r="20" fill="#10b981" stroke="#059669" stroke-width="4"/>
              <circle cx="22" cy="22" r="12" fill="#d1fae5"/>
              <circle cx="22" cy="22" r="6" fill="#34d399"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(44, 44),
          anchor: new window.google.maps.Point(22, 22),
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
            map.panTo(pos);
          },
          () => console.log("Location denied"),
          { enableHighAccuracy: true }
        );
      }
    };

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
}