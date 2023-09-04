export interface PlaceProps {
  type: string;
  geometry: {
    coordinates: number[];
    type: string;
  };
  properties: {
    country?: string;
    name: string;
    postcode?: string;
    street?: string;
    housenumber?: string;
    state?: string;
    countrycode?: string;
    osm_key?: string;
    osm_value?: string;
    osm_type?: string;
    osm_id?: number;
    extent?: number[];
  };
}
