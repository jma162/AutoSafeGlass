'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Partner {
  name: string;
  type: string;
  address: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface MapComponentProps {
  partners: Partner[];
}

const MapComponent = ({ partners }: MapComponentProps) => {
  const center = { lat: 39.9343, lng: -75.0393 };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={11}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem", zIndex: 20 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {partners.map((partner, index) => (
        <Marker
          key={index}
          position={[partner.location.lat, partner.location.lng]}
          icon={icon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{partner.name}</h3>
              <p className="text-sm text-emerald-600">{partner.type}</p>
              <div>
                <p className="text-sm">{partner.address}</p>
                <p className="text-sm">{partner.city}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapComponent