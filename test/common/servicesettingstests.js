// 
// Copyright (c) Microsoft and contributors.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// 
// See the License for the specific language governing permissions and
// limitations under the License.
// 

var should = require('should');
var assert = require('assert');

var testutil = require('../framework/util');
var ServiceSettings = testutil.libRequire('common/services/servicesettings');

describe('ServiceSettingsTests', function () {
  
  it('parseAndValidateKeysInvalid', function (done) {
    var connectionString = 'FakeKey=FakeValue';
    var validKeys = [ 'ValidKey1', 'ValidKey2' ];

    assert.throws(
      function() {
        ServiceSettings.parseAndValidateKeys(connectionString, validKeys);
      },
      function(err) {
        if ((err instanceof SyntaxError) && err.message === 'Connection string contains unrecognized key: "FakeKey"') {
          return true;
        }
      },
      "unexpected error"
    );

    done();
  });


  it('parseAndValidateKeysValid', function (done) {
    var connectionString = 'ValidKey1=FakeValue';
    var validKeys = [ 'ValidKey1', 'ValidKey2' ];

    ServiceSettings.parseAndValidateKeys(connectionString, validKeys);
    done();
  });

  it('Setting', function (done) {
    var settingWithFunc = ServiceSettings.setting('mysettingname', true, false);
    settingWithFunc['SettingName'].should.not.be.null;
    settingWithFunc['SettingConstraint'].should.not.be.null;

    done();
  });
});