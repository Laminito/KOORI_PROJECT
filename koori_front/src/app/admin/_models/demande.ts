import { Service } from "./service";
import { User } from "./user";

export class Demande {
  public id!:number;
  public RapportId?:number;
  public UserId?: number;
  public Service?: Service;
  public ServiceId?: number;
  public titre?: string
  public description: string=''
  public date_realisation?: string
  public statut: string = 'nouvelle'
  public DemandeUser:any
  public date_fin:any
  public moyenne:number=0
  public createdAt:string = '';
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}