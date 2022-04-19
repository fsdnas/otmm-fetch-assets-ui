import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  public username = 'nayeem';
  public password = 'TrainingE11';

  public OTDS_URL = `http://training-otmm.acheron-tech.com:8080/otdsws/rest/authentication/credentials`;
  public RETRIEVE_SESSION_URL = `http://training-otmm.acheron-tech.com:11090/otmmapi/v6/sessions`;
  public RESOURCE_URL = `http://training-otmm.acheron-tech.com:8080/otdsws/rest/authentication/resource/ticketforresource`;

  public KEYWORD_SEARCH =
      'http://training-otmm.acheron-tech.com:11090/otmmapi/v6/search/text?keyword_query='
}
