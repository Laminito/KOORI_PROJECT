import {KeycloakService} from "keycloak-angular";

export function initializer (keycloak: KeycloakService) :()=> Promise<boolean>{
  return ()=> keycloak.init({
    config:{
      url: 'http://localhost:8089/auth',
      realm: 'angular-web',
      clientId: 'koori-front-client'
    },
    initOptions:{
      checkLoginIframe:true,
      checkLoginIframeInterval: 25
    },
    loadUserProfileAtStartUp:true,
  });
}
