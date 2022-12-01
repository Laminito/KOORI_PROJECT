import {Deserialize} from "../../deserializable.model";
export class Evaluation_koori implements Deserialize{
  public id?: number;
  public evaluation:string = 'no comment';
  public note?:number;
  public KooriId?:number;
  public UserId?:number;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
