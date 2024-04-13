function b64_to_utf8(str:string) {
  return decodeURIComponent(escape(window.atob(str)));
}

export const jwtUtil = class jwtUtil {
  private readonly _jwtToken: string;

  constructor(jwtToken: string) {
    this._jwtToken = jwtToken;
  }

  getAlgo() {
    if (this._jwtToken === null || this._jwtToken === undefined) {
      new Error('undefined value');
    }
    let header = this._jwtToken.split('.')[0]
    return JSON.parse(b64_to_utf8(header))['alg']
  }
  getPayload(){
    let var1 = this._jwtToken.split('.')[1]
    return JSON.parse(decodeURIComponent(escape(window.atob(var1.replace(/-/g, "+").replace(/_/g, "/")))));
  }
};



