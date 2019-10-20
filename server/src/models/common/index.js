import moment from 'moment-timezone';

const DEFINE = {
	FINISH_GB: {
		ING: '01',
		FINISH: '02',
		REVISION: '03'
	},

	finishGbConverter: function(finishGb) {
		switch (finishGb) {
			case DEFINE.FINISH_GB.ING:
				return '연재중';
			case DEFINE.FINISH_GB.FINISH:
				return '완결';
			case DEFINE.FINISH_GB.REVISION:
				return '개정';
			default:
				return finishGb;
		}
	},

	dateNow: function() {
		return moment.tz(Date.now(), 'Asia/Seoul');
	},

	dateConverter: function(date) {
		return moment(date).format('YYYY-MM-DD H:mm:ss');
	}
};

export default DEFINE;
