(function (window) {
  window.envconfig = window.envconfig || {};
  // Environment variable
  // window['envconfig']['apiurl'] = '${API_URL}';
  // doing below work around for lint issue and replacing above line
  window['envconfig']['apiurl'] = `${''}\${API_URL}`;
  window['envconfig']['ssoApiUrl'] = `${''}\${SSO_API_URL}`;
  window['envconfig']['redirectApiurl'] = `${''}\${REDIRECT_API_URL}`;

})(this);
