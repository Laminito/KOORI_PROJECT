import {Deserialize} from "../../deserializable.model";
import { Evaluation_note } from "./evaluation_note";

export class Rapport implements Deserialize{
  public id?: number;
  public titre?:string;
  public moyenne?:number;
  public description?:string;
  public statut?:string;
  public file?:any;
  public Evaluation_note?:any;
  public ServiceId?:number;
  public isEvaluated?:boolean = false;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
