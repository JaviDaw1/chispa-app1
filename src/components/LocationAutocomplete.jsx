import { useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

export default function LocationAutocomplete({ value, onChange, onSelect, inputClassName = '' }) {
  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCCTR7gaubOFjXqzySBZ6mdw5uKsmjKc2I",
    libraries: ["places"],
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

  if (!isLoaded) {
    return (
      <input
        value={value}
        onChange={onChange}
        placeholder="Cargando Google Maps..."
        className={inputClassName}
      />
    );
  }

  return (
    <Autocomplete
      onLoad={(ref) => (autocompleteRef.current = ref)}
      onPlaceChanged={handlePlaceChanged}
    >
      <input
        value={value}
        onChange={onChange}
        placeholder="Busca tu ciudad o dirección"
        className={inputClassName}
      />
    </Autocomplete>
  );
}
