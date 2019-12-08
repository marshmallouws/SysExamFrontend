const URL = "https://annikaehlers.dk/ExamProject/";
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

  setAirport = (username, airport) => {
    const options = this.makeOptions("POST", false, {
      username: username,
      airport: airport
    });
    const promise = fetch(URL + "/api/user/airport", options).then(
      handleHttpErrors
    );
  };

  login = (user, pass, air) => {
    const options = this.makeOptions("POST", true, {
      username: user,
      password: pass,
      airport: air
    });
    const promise = fetch(URL + "/api/auth/login", options).then(
      handleHttpErrors
    );

    promise.then(res => this.setToken(res.token));
    return promise;
  };

  register = (user, pass, favAirport) => {
    const options = this.makeOptions("POST", true, {
      username: user,
      password: pass,
      airport: favAirport
    });

    const promise = fetch(URL + "/api/auth/createuser", options).then(
      handleHttpErrors
    );

    promise.then(res => this.setToken(res.token));
    return promise;
  };

  getEvents = () => {
    const promise = fetch(URL + "/api/series/first15").then(handleHttpErrors);
    return promise;
  };

  getSingleEvent = event => {
    const promise = fetch(URL + "/api/series/single/" + event).then(
      handleHttpErrors
    );
    return promise;
  };

  buyTickets = tickets => {
    const options = this.makeOptions("POST", false, tickets);

    const promise = fetch(URL + "/api/tickets/buy", options).then(
      handleHttpErrors
    );

    promise.then(res => this.setToken(res.token));
    return promise;
  };

  getBookmarks = username => {
    const promise = fetch(URL + "/api/series/userbookmarks/" + username).then(
      handleHttpErrors
    );
    return promise;
  };

  saveBookmark = bookmarkObj => {
    const options = this.makeOptions("POST", false, bookmarkObj);

    const promise = fetch(URL + "/api/series/bookmark", options).then(
      handleHttpErrors
    );

    promise.then(res => this.setToken(res.token));
    return promise;
  };

  getPurchases = username => {
    const promise = fetch(URL + "/api/tickets/all/" + username).then(
      handleHttpErrors
    );
    return promise;
  };

  getSinglePurchase = (username, event) => {
    const promise = fetch(URL + "/api/tickets/" + username + "/" + event).then(
      handleHttpErrors
    );
    return promise;
  };

  getFlights = (origin, destination, date) => {
    const today = new Date();
    let departDate = new Date(date);
    if (departDate < today)
      departDate = today.toLocaleDateString().replace(/\//g, "-");
    origin = origin === "" ? "CPH-sky" : origin;
    // for testing - no flights returned on most dates, so using the sample date from their documentation :
    departDate = "2019-12-24";
    //
    const promise = fetch(
      URL + `/api/flight/${departDate}/${origin}/${destination}`
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
