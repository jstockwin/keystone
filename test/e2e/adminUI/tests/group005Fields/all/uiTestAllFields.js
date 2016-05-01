

module.exports = {
	before: function (browser) {
		browser
		browser.app = browser.page.app();
		browser.signinPage = browser.page.signin();
		browser.listPage = browser.page.list();
		browser.initialFormPage = browser.page.initialForm();

		browser.app.navigate();
		browser.app.waitForElementVisible('@signinScreen');

		browser.signinPage.signin();
		browser.app.waitForElementVisible('@homeScreen');
		browser.app.click('@fieldListsMenu')
	},
	after: function (browser) {
		browser.app.signout();
		browser.end();
	}};
	var fields = ['code','color','date','datetime','html','name','select','text','textarea','url'];

	for (var i =0; i < fields.length; i++) {
	module.exports[fields[i] + ' field should show correctly in the initial modal'] = getFun(fields[i]);
	}

function getFun(name) {
	return function (browser) {
				browser.app
					.waitForElementVisible('@listScreen')
					.click('@' + name + 'ListSubmenu')
					.waitForElementVisible('@listScreen');

				browser.listPage
					.click('@createFirstItemButton');

				browser.app
					.waitForElementVisible('@initialFormScreen');

				browser.initialFormPage.section.form.section[name+'List'].section.name
					.verifyUI();

				browser.initialFormPage.section.form.section[name+'List'].section.fieldA
					.verifyUI();

				browser.initialFormPage.section.form
					.click('@cancelButton');

				browser.app
					.waitForElementVisible('@listScreen');
			};
}
