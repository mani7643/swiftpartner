"use client";

import { useEffect, useRef } from "react";

export default function LiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    // Prevent double loading
    if ((window as any).googleMapsInitialized) {
      initializeMap();
      return;
    }

    // Load Google Maps only once
    if (!(window as any).google?.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&loading=async&libraries=geometry`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        (window as any).googleMapsInitialized = true;
        initializeMap();
      };
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (!mapRef.current || mapInstance.current) return;

      // Small delay to make sure google.maps is fully ready
      setTimeout(() => {
        if (!(window as any).google?.maps?.Map) return;

        const map = new google.maps.Map(mapRef.current!, {
          center: { lat: 12.9716, lng: 77.5946 },
          zoom: 16,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "greedy",
          styles: [
            { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
          ],
        });

        mapInstance.current = map;

        const marker = new google.maps.Marker({
          map,
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="22" fill="#10b981" stroke="#059669" stroke-width="5"/>
                <circle cx="25" cy="25" r="12" fill="#d1fae5"/>
                <circle cx="25" cy="25" r="6" fill="#34d399"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(50, 50),
            anchor: new google.maps.Point(25, 25),
          },
        });

        // Live location tracking
        navigator.geolocation.watchPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            marker.setPosition(pos);
            map.panTo(pos);
          },
          () => {},
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
        );
      }, 300);
    }

    return () => {};
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
}