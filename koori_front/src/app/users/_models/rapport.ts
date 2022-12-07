import {Deserialize} from "../../deserializable.model";
import {Service} from "./Service";

export class Rapport implements Deserialize{
  public id!: number;
  public titre!:string;
  public moyenne!:number;
  public description!:string;
  public statut!:string;
  public file!:any;
  public ServiceId!:number;
  public isEvaluated:boolean = false;
  public Service!:Service[];
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}

