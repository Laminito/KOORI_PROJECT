import {Deserialize} from "../../deserializable.model";
export class Evaluation_ibox implements Deserialize{
  public id?: number;
  public evaluation?:string;
  public IboxId?:number;
  public UserId?:number;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
