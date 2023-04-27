class Http {
    constructor(ctx) {
      this.queryParam = '';
      this.param = '';
      this.method = 'GET';
      this.data = {};
      this.responseType = 'json';
      this.headers = {};
      this.axios = ctx.$axios;
    }
  
    post() {
      this.method = 'POST';
      return this;
    }
  
    get() {
      this.method = 'GET';
      return this;
    }
  
    addParam(param) {
      this.param += param.reduce((acc, cur) => {
        acc += `/${cur}`;
        return acc;
      }, '');
      return this;
    }
  
    addQuery(param) {
      if (!param || Object.keys(param).length === 0) {
        return this;
      }
  
      const _param = Object.keys(param);
      const size = _param.length - 1;
      this.queryParam += this.queryParam.length === 0 ? '?' : '&';
      this.queryParam += _param.reduce((acc, cur, index) => {
        acc += `${cur}=${encodeURIComponent(param[cur])}`;
        if (size > index) {
          acc += '&';
        }
  
        return acc;
      }, '');
      return this;
    }
  
    addData(data) {
      this.data = data;
      return this;
    }
  
    setResponseType(type) {
      this.responseType = type;
      return this;
    }
  
    addHeaders(headers) {
      this.headers = headers;
      return this;
    }
  
    async send() {
      const url = `${this.param}${this.queryParam}`;
      const request = {
        method: this.method,
        url,
        responseType: this.responseType,
        headers: this.headers
      };
  
      if (this.method === 'POST') {
        request.data = this.data;
      }
  
      this.reset();
      const result = await this.axios(request);
  
      return result.data;
    }
  
    reset() {
      this.method = 'GET';
      this.data = {};
      this.param = '';
      this.queryParam = '';
      this.headers = {};
      this.responseType = 'json';
    }
  }
  
  let myHttp;
  const getHttp = ctx => {
    if (!myHttp) {
      myHttp = new Http(ctx);
    }
  
    return myHttp;
  };
  
  export default (ctx, inject) => {
    ctx.$httpBuilder = () => getHttp(ctx);
    inject('httpBuilder', () => getHttp(ctx));
  };