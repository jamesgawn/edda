interface EDDNGenericMessage {
  event: string,
  horizons: boolean,
  odyssey: boolean,
  timestamp: string
}

export interface EDDNGenericEvent { 
  '$schemaRef': string,
  header: {
    gamebuild: string,
    gameversion: string,
    gatewayTimestamp: string,
    softwareName: string,
    softwareVersion: string,
    uploaderId: string,
  }
  message: EDDNGenericMessage
}

// Completed full system scan
export interface EDDNFSSAllBodiesFoundEvent extends EDDNGenericEvent {
  message: {
    Count: number,
    StarPos: number[],
    SystemAddress: number,
    SystemName: string,
  } & EDDNGenericMessage
}

interface BodySignals {
  Type: string,
  Count: number
}

export interface EDDNFSSBodySignalsEvent extends EDDNGenericEvent {
  message: {
    BodyID: number
    BodyName: string,
    StarPos: number[],
    StarSystem: string,
    SystemAddress: number,
    Signals: BodySignals[]
  } & EDDNGenericMessage
}

// Completed system boop
export interface EDDNFSSDiscoveryScanEvent extends EDDNGenericEvent {
  message: {
    BodyCount: number,
    NonBodyCount: number
    StarPos: number[],
    SystemAddress: number,
    SystemName: string,
  } & EDDNGenericMessage
}

interface JournalScanEventMessage extends EDDNGenericMessage {
  AxialTilt: number,
  BodyID: number,
  BodyName: string,
  PlanetClass?: string,
  RotationPeriod: number,
  ScanType: string,
  StarPos: number[],
  StarSystem: string,
  StarType?: string,
  SurfaceTemperature: number,
  SystemAddress: number,
  WasDiscovered: boolean,
  WasMapped: boolean
}

interface JournalScanStarEventMessage extends JournalScanEventMessage {
  AbsoluteMagnitude: number,
  Age_MY: number,
  Luminosity: string,
  StarType: string,
  StellarMass: number,
  Subclass: number,
}

interface JournalScanPlanetEventMessage extends JournalScanEventMessage {
    AscendingNode: number,
    Atmosphere: string,
    AtmosphereType: string,
    DistanceFromArrivalLS: number,
    Radius: number,
    Composition: {
      Ice: number,
      Metal: number,
      Rock: number
    },
    Eccentricity: number,
    Landable: boolean,
    MassEM: number,
    Materials: Material[],
    MeanAnomaly: number,
    OrbitalInclination: number,
    OrbitalPeriod: number,
    Periapsis: number,
    PlanetClass: string,
    ReserveLevel: string,
    Rings: Ring[],
    ScanType: string,
    SemiMajorAxis: number,
    SurfaceGravity: number,
    SurfacePressure: number,
    TerraformState: string,
    TidalLock: boolean,
    Volcanism: string,
}

export interface EDDNJournalScanEvent extends EDDNGenericEvent {
  message: JournalScanEventMessage
}

export interface EDDNJournalScanPlanetEvent extends EDDNGenericEvent {
  message: JournalScanPlanetEventMessage
}

interface Material {
  Name: string,
  Percent: number
}

interface Ring {
  InnerRad: number,
  MassMT: number,
  Name: string,
  OuterRad: number,
  RingClass: string
}

export interface EDDNJournalDetailedScanEvent extends EDDNJournalScanEvent {
  message: {
    AtmosphereComposition: Material[],
  } & JournalScanEventMessage
}

export interface EDDNJournalAutoScanEvent extends EDDNJournalScanEvent {
  message: {
  } & JournalScanEventMessage
}

export interface EDDNJournalSSAScanCompleteEvent extends EDDNGenericEvent  {
  
}

export interface EDDNJournalSAASignalsFoundEvent extends EDDNGenericEvent {
  message: {
    BodyID: number
    BodyName: string,
    StarPos: number[],
    StarSystem: string,
    SystemAddress: number,
    Signals: BodySignals[]
  } & EDDNGenericMessage
}