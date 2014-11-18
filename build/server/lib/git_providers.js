// Generated by CoffeeScript 1.8.0
var CozyGitlabProvider, GitProvider, GithubProvider, request,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

request = require('request-json');

GitProvider = (function() {
  function GitProvider(repoDescriptor) {
    this.repoUrl = repoDescriptor.git;
    this.repoBranch = repoDescriptor.branch;
  }

  return GitProvider;

})();

module.exports.GithubProvider = GithubProvider = (function(_super) {
  __extends(GithubProvider, _super);

  function GithubProvider(repoDescriptor) {
    GithubProvider.__super__.constructor.call(this, repoDescriptor);
    this.basePath = this.repoUrl.substring(19, this.repoUrl.length - 4);
  }

  GithubProvider.prototype.getManifest = function(callback) {
    var client, path;
    client = request.newClient("https://raw.github.com/");
    if (this.repoBranch != null) {
      path = this.basePath + '/' + this.repoBranch;
    } else {
      path = this.basePath + '/master';
    }
    return client.get(path + '/package.json', (function(_this) {
      return function(err, res, body) {
        return callback(err, body);
      };
    })(this));
  };

  GithubProvider.prototype.getStars = function(callback) {
    var client, path;
    client = request.newClient("https://api.github.com/");
    path = "repos/" + this.basePath + "/stargazers";
    return client.get(path, (function(_this) {
      return function(err, res, body) {
        return callback(err, body.length);
      };
    })(this));
  };

  return GithubProvider;

})(GitProvider);

module.exports.CozyGitlabProvider = CozyGitlabProvider = (function(_super) {
  __extends(CozyGitlabProvider, _super);

  function CozyGitlabProvider() {
    return CozyGitlabProvider.__super__.constructor.apply(this, arguments);
  }

  CozyGitlabProvider.prototype.getManifest = function(callback) {
    var client, domain, part, path, prefixLength, repoSplit, _i, _len;
    repoSplit = this.repoUrl.split('/');
    for (_i = 0, _len = repoSplit.length; _i < _len; _i++) {
      part = repoSplit[_i];
      if (part.indexOf('gitlab') !== -1) {
        domain = "" + repoSplit[0] + "//" + part + "/";
      }
    }
    prefixLength = domain.length;
    client = request.newClient(domain);
    this.basePath = this.repoUrl.substring(prefixLength, this.repoUrl.length - 4);
    path = "" + this.basePath + "/raw/master/package.json";
    return client.get(path, function(err, res, body) {
      if (body.error != null) {
        err = body.error;
      }
      return callback(err, body);
    });
  };

  CozyGitlabProvider.prototype.getStars = function(callback) {
    var stars;
    stars = Math.floor(Math.random() * 30 + 5);
    return callback(null, stars);
  };

  return CozyGitlabProvider;

})(GitProvider);
