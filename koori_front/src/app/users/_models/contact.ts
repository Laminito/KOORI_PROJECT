import {Deserialize} from "../../deserializable.model";

export class Contact implements Deserialize{
  
  description?: string;
  public adresse?: string;
  public email?: string;
  public telephone?: number;
  public disponibilite?: string
  public id?:number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

}

