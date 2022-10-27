import {Deserialize} from "../../deserializable.model";
export class Evaluation_note implements Deserialize{
  public id?: number;
  public note?:number;
  public evaluation?:string;
  public statut?:string;
  public RapportId?:number;
  public UserId?:number;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
