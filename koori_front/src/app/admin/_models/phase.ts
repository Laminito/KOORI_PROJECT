import {Deserialize} from "../../deserializable.model";
import { Koori } from "./koori";

export class Phase implements Deserialize{
  public id?:number;
  public KooriId?:Koori;
  public avatar?:string;
  public  titre?: string;
  public description?:string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
