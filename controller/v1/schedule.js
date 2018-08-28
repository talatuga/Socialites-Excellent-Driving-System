var router = require('express').Router();
var scheduler = require('../../middleware/lib/schedule');
var auth = require('../../middleware/authentication');

router.get('/calendar', auth.auth, scheduler.calendar);

router.get('/inst', auth.auth, scheduler.getFreeInst);

router.get('/hours/:id', auth.studentAuth, scheduler.getStudHour);

router.route('/preference')
    .get(auth.studentAuth, scheduler.getPreference)
    .put(auth.studentAuth, scheduler.changePref);

router.route('/check')
    .get(auth.auth, scheduler.schedAvailability);

//router.get('/testAutoSched', scheduler.testAutoSched);

router.route('/')
    .get(scheduler.getSched)
    .put(auth.auth, scheduler.updateSchedule);

router.post('/suspend', auth.auth, scheduler.suspend);

router.put('/:id/done', auth.auth, scheduler.done);
router.put('/:id/cancel', auth.auth, scheduler.cancel);

router.route('/:id')
    .patch(auth.auth,scheduler.removeSchedFromCalendar)
    .put(auth.auth, scheduler.assignSched);

module.exports = router;