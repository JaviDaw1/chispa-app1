import { useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

export default function LocationAutocomplete({ value, onChange, onSelect }) {
  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCCTR7gaubOFjXqzySBZ6mdw5uKsmjKc2I", // PON AQUÍ TU API KEY
    libraries,
  });

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const location = place.geometry.location;
      onSelect({
        address: place.formatted_address,
        lat: location.lat(),
        lng: location.lng(),
      });
    }
  };

  if (!isLoaded) return <input value={value} onChange={onChange} placeholder="Cargando Google Maps..." />;

  return (
    <Autocomplete
      onLoad={ref => (autocompleteRef.current = ref)}
      onPlaceChanged={handlePlaceChanged}
    >
      <input
        value={value}
        onChange={onChange}
        placeholder="Busca tu ciudad o dirección"
        className="w-full px-3 py-2 border rounded-lg"
      />
    </Autocomplete>
  );
}