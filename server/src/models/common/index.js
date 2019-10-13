import moment from 'moment-timezone';

const DEFINE = {
	dateNow: function() {
		return moment.tz(Date.now(), 'Asia/Seoul');
	},

	dateConverter: function(date) {
		return moment(date).format('YYYY-MM-DD H:mm:ss');
	}
};

export default DEFINE;
