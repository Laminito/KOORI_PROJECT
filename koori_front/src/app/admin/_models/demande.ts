import { Service } from "./service";
import { User } from "./user";

export class Demande {
  public id?:number;
  public RapportId?:number;
  public User?: User;
  public Service?: Service;
  public ServiceId?: number;
  public titre?: string
  public description: string=''
  public date_realisation?: string
  public statut?: string
  public DemandeUser:any
  public date_fin:any
  public moyenne:number=0
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
