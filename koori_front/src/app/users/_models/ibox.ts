import {Deserialize} from "../../deserializable.model";
import { Fiche } from "./fiche";

export class Ibox implements Deserialize{
    public id?:number;
    public description?:string;
    public Fiches?: Fiche[];

    deserialize(input: any): this {
      return Object.assign(this, input);
    }
}
