export interface Composition {
    id: number;
    title: string;
    number: number;
    composers: string[];
    opus: string;
    legacy_composition_identifier: string;
    uuid: string;
    publications: string[];
}

export interface EventItem {
    id: number
    category: string
    title: string
    description: string
    location: string
    date: string
    time: string
    organizer: string
}

export enum MusicalDivisionType {
    Movement = 'Movement',
    Act = 'Act',
    Scene = 'Scene',
    Intro = 'Intro',
}

export interface MusicalDivision {
    id: number
    name: string
    divType: MusicalDivisionType
    nested: MusicalDivision[]
}