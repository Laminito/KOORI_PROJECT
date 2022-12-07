import {Deserialize} from "../../deserializable.model";

export class Profil implements Deserialize{
  public id?: number;
  public libelle?: string;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
