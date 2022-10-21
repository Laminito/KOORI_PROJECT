import {Deserialize} from "../../deserializable.model";
import { Phase } from "./phase";

export class Koori implements Deserialize{
  public id?:number;
  public description?:string;
  public quoi?:string;
  public quand?:string;
  public comment?:string;
  public version?:number;
  public Phases?: Phase[];
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
