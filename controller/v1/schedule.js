var router = require('express').Router();
var scheduler = require('../../middleware/lib/schedule');

router.get('/calendar', scheduler.calendar);

router.route('/:id')
    .patch(scheduler.removeSchedFromCalendar)
    .put(scheduler.assignSched);

module.exports = router;