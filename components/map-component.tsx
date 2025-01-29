import type React from "react"
import { useCallback, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import L from "leaflet"
import { useLanguage } from "@/components/language-provider"

// Define custom icon for markers
const customIcon = new L.Icon({
    iconUrl: "/images/marker-icon-red.png",
    iconRetinaUrl: "/images/marker-icon-red.png",
    iconSize: [35, 35],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

interface Site {
  id: number
  name: string
  coordinates: [number, number]
  description: string
  period: number
  category: string
}

interface MapComponentProps {
  sites: Site[]
  onSiteSelect: (site: Site) => void
  selectedPeriod: number
  selectedCategory: string
}

const MapComponent: React.FC<MapComponentProps> = ({ sites, onSiteSelect, selectedPeriod, selectedCategory }) => {
  const { t } = useLanguage()

  // Center of Tunisia
  const center: [number, number] = [34.0, 9.0]

  const findNearestSite = useCallback(
    (clickedLat: number, clickedLng: number) => {
      return sites.reduce(
        (nearest, site) => {
          const [siteLat, siteLng] = site.coordinates
          const distance = Math.sqrt(Math.pow(clickedLat - siteLat, 2) + Math.pow(clickedLng - siteLng, 2))
          return distance < nearest.distance ? { site, distance } : nearest
        },
        { site: sites[0], distance: Number.POSITIVE_INFINITY },
      ).site
    },
    [sites],
  )

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const nearestSite = findNearestSite(e.latlng.lat, e.latlng.lng)
        onSiteSelect(nearestSite)
      },
    })
    return null
  }

  const UpdateMapView = () => {
    const map = useMap()
    useEffect(() => {
      if (sites.length > 0) {
        const bounds = L.latLngBounds(sites.map((site) => site.coordinates))
        map.fitBounds(bounds, { padding: [50, 50] })
      }
    }, [map, sites])
    return null
  }

  return (
    <MapContainer center={center} zoom={7} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      />
      <MapEvents />
      <UpdateMapView />
      {sites.map((site) => (
        <Marker
          key={site.id}
          position={site.coordinates}
          icon={customIcon}
          eventHandlers={{
            click: () => onSiteSelect(site),
          }}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-lg">{t(`explorer.siteName.${site.id}`)}</h3>
              <p className="text-sm">{t(`explorer.siteDescription.${site.id}`)}</p>
              <button
                className="mt-2 bg-primary text-white px-3 py-1 rounded-full text-xs"
                onClick={() => onSiteSelect(site)}
              >
                {t("explorer.selectSite")}
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapComponent

