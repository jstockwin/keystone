var keystone = require('../../../../index.js');
var Types = keystone.Field.Types;

var LocalFiles = new keystone.List('LocalFileMultiple', {
	autokey: {
		path: 'key',
		from: 'name',
		unique: true,
	},
	track: true,
});

LocalFiles.add({
	name: {
		type: String,
		initial: true,
		required: true,
		index: true,
	},
	fieldA: {
		type: Types.LocalFiles,
		dest: '/files/',
	},
	fieldB: {
		type: Types.LocalFiles,
		dest: '/files/',
	},
});

LocalFiles.defaultColumns = 'name, fieldA, fieldB';
LocalFiles.register();

module.exports = LocalFiles;
