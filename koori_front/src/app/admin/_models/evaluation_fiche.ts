import {Deserialize} from "../../deserializable.model";
export class Evaluation_fiche implements Deserialize{
  public id?: number;
  public evaluation?:string;
  public FicheId?:number;
  public UserId?:number;
  public createdAt?:Date;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
