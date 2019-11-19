const URL = "http://localhost:8080/securitystarter";
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

class ApiFacade {
  setToken = token => {
    localStorage.setItem("jwtToken", token);
  };

  getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  loggedIn = () => {
    const loggedIn = this.getToken() != null;
    return loggedIn;
  };

  logout = () => {
    localStorage.removeItem("jwtToken");
  };

  login = (user, pass) => {
    const options = this.makeOptions("POST", true, {
      username: user,
      password: pass
    });
    const promise = fetch(URL + "/api/login", options).then(handleHttpErrors);

    //promise.then(res => this.setToken(res.token));
    //return promise;
  };

  getEvents = () => {
    const token = "uNIfp_1YhqRYLQTjQmWHXfiuQxg-r01KBjo_NOtr8k4ncXJLQ6g";
    const promise = fetch(
      "https://api.pandascore.co/series?sort=-year&per_page=15&token=" + token
    ).then(handleHttpErrors);
    return promise;
  };

  makeOptions(method, addToken, body) {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (addToken && this.loggedIn()) {
      opts.headers["x-access-token"] = this.getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
}

const facade = new ApiFacade();
export default facade;
