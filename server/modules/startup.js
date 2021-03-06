let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => Modules.server.setupCSP();

var _generateAccounts = () => Modules.server.generateAccounts();

Modules.server.startup = startup;
