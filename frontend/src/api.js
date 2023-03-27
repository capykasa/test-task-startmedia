const Method = {
  GET: 'GET'
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  get racers() {
    return this._load({ url: 'racers' })
      .then(Api.parseResponse);
  }

  get races() {
    return this._load({ url: 'races' })
      .then(Api.parseResponse);
  }

  _load = async ({
    url,
    method = 'GET',
    body = null
  }) => {

    const response = await fetch(
      `${this._endPoint}/${url}`,
      { method, body },
    );

    try {
      Api.checkStatus(response);
      return response;
    } catch (err) {
      Api.catchError(err);
    }
  };

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  static parseResponse = (response) => response.json();

  static catchError(err) {
    throw err;
  }
}
