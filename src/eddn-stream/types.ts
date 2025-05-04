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
    AscendingNode: number,
    Atmosphere: string,
    AtmosphereType: string,
    AxialTilt: number,
    BodyID: number,
    BodyName: string,
    Composition: {
      Ice: number,
      Metal: number,
      Rock: number
    },
    DistanceFromArrivalLS: number,
    Eccentricity: number,
    Landable: boolean,
    MassEM: number,
    Materials: Material[],
    MeanAnomaly: number,
    OrbitalInclination: number,
    OrbitalPeriod: number,
    Periapsis: number,
    PlanetClass?: string,
    Radius: number,
    ReserveLevel: string,
    Rings: Ring[],
    RotationPeriod: number,
    ScanType: string,
    SemiMajorAxis: number,
    StarPos: number[],
    StarSystem: string,
    StarType?: string,
    SurfaceGravity: number,
    SurfacePressure: number,
    SurfaceTemperature: number,
    SystemAddress: number,
    TerraformState: string,
    TidalLock: boolean,
    Volcanism: string,
    WasDiscovered: boolean,
    WasMapped: boolean
}

export interface EDDNJournalScanEvent extends EDDNGenericEvent {
  message: JournalScanEventMessage
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