import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, {
  LatLng,
  Marker,
  MarkerDragStartEndEvent,
  Polyline,
  Region,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { RootState, useAppSelector, useAppDispatch } from "@store/store";
import Colors from "@constants/colors";
import RoutingProps from "../types/RoutingProps";
import {
  makeRouting,
  reverseGeocode,
  setCurrLocation,
} from "@services/useLocalization";
import { showError } from "@functions/helperFunctions";
import { setDeparture, setDestination } from "@services/useSearchPlace";

interface PoiProps {
  title: string;
  location: { latitude: number; longitude: number };
  description: string;
}

interface MapProps {
  routing: RoutingProps | null;
  setRouting: Function;
}

export interface MapMethods {
  goToCurrentPosition: () => void
}

const Map = React.forwardRef<MapMethods, MapProps>(({ routing, setRouting }: MapProps, ref) => {
  const localisationState = useAppSelector(
    (state: RootState) => state.localization
  );
  const dispatch = useAppDispatch();
  const mapViewRef = useRef<MapView>(null);
  const [loading, setLoading] = React.useState(false);
  const [mapRegion, setMapRegion] = React.useState<Region | undefined>();
  const [departureCoord, setDepartureCoord] = React.useState<
    LatLng | undefined
  >();
  const [destinationCoord, setDestinationCoord] = React.useState<
    LatLng | undefined
  >();
  const [pois, setPois] = React.useState<PoiProps[]>([]);
  const [polylineCoords, setPolylineCoords] = React.useState<LatLng[]>([]);

  const onRegionChange = (region: Region) => {
    //console.log(region);
  };

  const onRegionChangeComplete = (region: Region) => {
    // console.log(region);
  };

  const showPois = () => {
    return pois.map((poi) => {
      return (
        <Marker
          key={poi.title}
          title={poi.title}
          description={poi.description}
          coordinate={poi.location}
        />
      );
    });
  };

  const onDragEndDeparture = async (coord: LatLng) => {
    await reverseGeocode(coord)
      .then(async (data) => {
        await dispatch(
          setDeparture({
            type: "DepartureLocation",
            properties: {
              name: data[0] ? data[0].name! : "Point de départ",
              country: data[0] && data[0].country!,
              postcode: data[0] && data[0].postalCode!,
              street: data[0] && data[0].street!,
              housenumber: data[0] && data[0].streetNumber!,
              state: data[0] && data[0].city!,
              countrycode: data[0] && data[0].isoCountryCode!,
            },
            geometry: {
              coordinates: [coord.longitude, coord.latitude],
              type: "Point",
            },
          })
        )
          .unwrap()
          .then(async (data) => {});
      })
      .catch((error) => {
        showError(`${error}`);
      });
  };

  const onDragEndDestination = async (coord: LatLng) => {
    await reverseGeocode(coord)
      .then(async (data) => {
        await dispatch(
          setDestination({
            type: "DestinationLocation",
            properties: {
              name: data[0] ? data[0].name! : "Point d'arrivée",
              country: data[0] && data[0].country!,
              postcode: data[0] && data[0].postalCode!,
              street: data[0] && data[0].street!,
              housenumber: data[0] && data[0].streetNumber!,
              state: data[0] && data[0].city!,
              countrycode: data[0] && data[0].isoCountryCode!,
            },
            geometry: {
              coordinates: [coord.longitude, coord.latitude],
              type: "Point",
            },
          })
        )
          .unwrap()
          .then(async (data) => {});
      })
      .catch((error) => {
        showError(`${error}`);
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    makeRoute();
  }, [routing]);

  const makeRoute = async () => {
    let polyline: LatLng[] = [];
    if (routing) {
      routing.features[0].geometry.coordinates.map((coord) => {
        polyline.push({
          latitude: coord[1],
          longitude: coord[0],
        });
      });
      setPolylineCoords(polyline);
      setMapRegion({
        latitude: localisationState.departure?.geometry.coordinates[1]!,
        longitude: localisationState.departure?.geometry.coordinates[0]!,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setDepartureCoord({
        latitude: localisationState.departure?.geometry.coordinates[1]!,
        longitude: localisationState.departure?.geometry.coordinates[0]!,
      });
      setDestinationCoord({
        latitude: localisationState.destination?.geometry.coordinates[1]!,
        longitude: localisationState.destination?.geometry.coordinates[0]!,
      });
    }
  };

  const getLocation = async () => {
    setLoading(true);
    await dispatch(setCurrLocation())
      .unwrap()
      .then(async (data) => {
        await dispatch(setDeparture(data))
        .unwrap()
        .then((loc) => {
          setMapRegion({
            longitude: loc?.geometry.coordinates[0]!,
            latitude: loc?.geometry.coordinates[1]!,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setDepartureCoord({
            longitude: loc?.geometry.coordinates[0]!,
            latitude: loc?.geometry.coordinates[1]!,
          });
          setPois([]);
          setLoading(false);
        });
      }).catch((error) => {
          console.log(error)
          setLoading(false);
          showError('Une erreur est survenue lors du chargement de la carte')
      });
  };

  React.useImperativeHandle(ref, () => ({
    goToCurrentPosition: goToCurrentPosition
  }));

  const goToCurrentPosition =async () =>  {
    await dispatch(setCurrLocation())
      .unwrap()
      .then(async (data) => {
        await dispatch(setDeparture(data))
        .unwrap()
        .then((loc) => {
          setMapRegion({
            longitude: loc?.geometry.coordinates[0]!,
            latitude: loc?.geometry.coordinates[1]!,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          setDepartureCoord({
            longitude: loc?.geometry.coordinates[0]!,
            latitude: loc?.geometry.coordinates[1]!,
          });
        });
      });
  }

  return (
    <>
    {loading ?
    <View style={styles.container}>
      <Text style={[styles.loadText]}>Chargement de la carte...</Text>
    </View>
    :
      <View style={styles.container}>
      {mapRegion && (
        <MapView
          onRegionChange={onRegionChange}
          region={mapRegion}
          onRegionChangeComplete={onRegionChangeComplete}
          style={styles.map}
          ref={mapViewRef}
          provider={PROVIDER_GOOGLE}
        >
          {departureCoord && (
            <Marker
              pinColor={Colors.secondaryColor}
              draggable={true}
              title={localisationState.departure?.properties.name}
              description={localisationState.departure?.properties.country}
              coordinate={departureCoord}
              onDragEnd={(e) => onDragEndDeparture(e.nativeEvent.coordinate)}
            />
          )}
          {showPois()}
          {polylineCoords.length > 0 && (
            <Polyline
              coordinates={polylineCoords}
              strokeColor={Colors.accentOrange}
              strokeWidth={6}
            />
          )}
          {destinationCoord && (
            <Marker
              pinColor={Colors.primaryColor}
              draggable={true}
              title={localisationState.destination?.properties.name}
              description={localisationState.destination?.properties.country}
              coordinate={destinationCoord}
              onDragEnd={(e) => onDragEndDestination(e.nativeEvent.coordinate)}
            />
          )}
        </MapView>
      )}
    </View>}
    </>
  );
});

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadText: {
    fontFamily: 'Poppins_400Regular',
    fontStyle: 'italic'
  }
});
