export interface ParamRouting{
  "stops": {"longitude": number,"latitude": number}[],
  "isPathRequest": boolean,
  "includeInstructions": boolean,
  "includeGeometry": boolean,
  "responseType": string
}

export interface SegmentProps {
    distance: number;
    duration: number;
    steps: {
        distance: number;
        duration: number;
        type: number;
        instruction: string;
        name: string;
        exitNumber: number | null;
        exitBearings: number[] |null;
        waypoints: number[];
      }[];
}

export interface RouteProps {
    coordinates: (number[])[];
    type: string;
}

export default interface RoutingProps {
  type: string;
  features: [
    {
      type: string;
      properties: {
        segments: SegmentProps[];
        legs: (string | number)[];
        departure: Date | null;
        arrival: Date | null;
        ascent: string | number| null;
        descent: string | number| null;
        transfers: number;
        fare: number;
        warnings: (string | number)[];
        way_points: number[];
        summary: {
          distance: number;
          duration: number;
          ascent: string | number;
          descent: string | number;
          transfers: number;
          fare: number;
        };
      };
      bbox: number[];
      includeElevation: boolean;
      geometry: {
        coordinates: (number[])[];
        type: string;
      };
      ptRequest: boolean;
    }
  ];
  bbox: number[];
}
