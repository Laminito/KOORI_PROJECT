import {Deserialize} from "../../deserializable.model";

export class Evaluation_session implements Deserialize{
  public id?: number;
  public DemandeId?:number;
  public UserId?:number;
  public evaluation?:string;
  public note?:number;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
