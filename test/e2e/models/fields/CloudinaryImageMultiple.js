var keystone = require('../../../../index.js');
var Types = keystone.Field.Types;

var CloudinaryImages = new keystone.List('CloudinaryImageMultiple', {
	autokey: {
		path: 'key',
		from: 'name',
		unique: true,
	},
	track: true,
});

CloudinaryImages.add({
	name: {
		type: String,
		initial: true,
		required: true,
		index: true,
	},
	fieldA: {
		type: Types.CloudinaryImages,
	},
	fieldB: {
		type: Types.CloudinaryImages,
	},
});

CloudinaryImages.defaultColumns = 'name, fieldA, fieldB';
CloudinaryImages.register();

module.exports = CloudinaryImages;
