import { Player, Team } from "./teams";

export interface Person {
    // username: string;
    givenName: string;
    surName: string;
    age: number;
    email: string;
    // password: string;
}

export interface UserPerson {
    username: string;
    givenName: string;
    surName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserProfile {
    id: number;
    favorite_team: Team;
    my_team_players: Player[];
}