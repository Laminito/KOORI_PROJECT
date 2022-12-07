import { Deserialize } from "../../deserializable.model";
import { Demande } from "./demande";
import {User} from "./user";

export class Session implements Deserialize {
  id!: number;
  DemandeId!: number;
  UserId!: number;
  evaluation!: string;
  note!: number;
  date!: Date;
  Demande!: Demande;
  User!: User;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
