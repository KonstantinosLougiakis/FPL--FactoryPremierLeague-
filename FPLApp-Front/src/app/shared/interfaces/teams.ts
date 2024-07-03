export interface Team {
    id: number;
    name: string;
    year_founded: number;
    stadium: string;
    manager: string;
    city: string;
    championships: number;
    nickname: string;
    players: Player[];
}

export interface Player {
    firstname: string;
    lastname: string;
    position: string;
    pref_foot: string;
    nationality: string;
    age: number;
    id: number;
    team: string;
}