declare module '*.geojson' {
  import { FeatureCollection, Feature, Polygon } from 'geojson';
  
  interface RegionProperties {
    shapeName: string;
    shapeISO: string;
    shapeID: string;
  }
  
  export type EthiopiaRegion = Feature<Polygon, RegionProperties>;
  export type EthiopiaGeoJSON = FeatureCollection<Polygon, RegionProperties>;
  
  const content: EthiopiaGeoJSON;
  export default content;
}