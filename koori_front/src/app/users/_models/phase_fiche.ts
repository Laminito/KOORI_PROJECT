import {Deserialize} from "../../deserializable.model";
import {Fiche} from "./fiche";

export class Phase_fiche implements Deserialize{
  public id_phase?:number;
  public id_fiche?:number;
  public Fiche?: Fiche;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
