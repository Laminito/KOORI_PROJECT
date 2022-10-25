import {Deserialize} from "../../deserializable.model";
import { Fiche } from "./fiche";

export class Etape implements Deserialize{
  public id?: number;
  public titre?: string;
  public description?: string;
  public FicheId?: Fiche;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
