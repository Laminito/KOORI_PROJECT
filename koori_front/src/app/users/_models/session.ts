import { Deserialize } from "../../deserializable.model";
import { Demande } from "./demande";
import { User } from "./user";

export class Session implements Deserialize {
  id?: number;
  DemandeId?: Demande[];
  UserId?: number;
  evaluation?: string;
  note?: number;
  Demande?: Demande;
  User?: User;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
