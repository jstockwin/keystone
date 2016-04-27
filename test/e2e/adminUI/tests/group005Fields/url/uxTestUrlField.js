module.exports = {
	before: function (browser) {
		browser.app = browser.page.app();
		browser.signinPage = browser.page.signin();
		browser.listPage = browser.page.list();
		browser.itemPage = browser.page.item();
		browser.initialFormPage = browser.page.initialForm();

		browser.app.navigate();
		browser.app.waitForElementVisible('@signinScreen');

		browser.signinPage.signin();
		browser.app.waitForElementVisible('@homeScreen');
	},
	after: function (browser) {
		browser.app
			.signout();
		browser
			.end();
	},
	'Name field can be created via the initial modal': function (browser) {
		browser.app
			.click('@fieldsMenu')
			.waitForElementVisible('@listScreen')
			.click('@urlsFieldsSubmenu')
			.waitForElementVisible('@listScreen');

		browser.listPage
			.click('@createFirstItemButton');

		browser.app
			.waitForElementVisible('@initialFormScreen');

		browser.initialFormPage.section.form.section.urlList.section.name
			.fillInput({value: 'Url Field Test 1'});

		browser.initialFormPage.section.form.section.urlList.section.name
			.verifyInput({value: 'Url Field Test 1'});

		browser.initialFormPage.section.form.section.urlList.section.fieldA
			.fillInput({value: 'Url Field Test Url 1'});

		browser.initialFormPage.section.form
			.click('@createButton');

		browser.app
			.waitForElementVisible('@itemScreen');

		browser.itemPage
			.expect.element('@flashMessage')
			.url.to.equal('New Url Url Field Test 1 created.');

		browser.itemPage.section.form.section.urlList.section.name
			.verifyInput({value: 'Url Field Test 1'});
	},
	'Name field can be created via the edit form': function (browser) {
		browser.itemPage.section.form.section.urlList.section.name
			.fillInput({value: 'Url Field Test 2'});

		browser.itemPage.section.form.section.urlList.section.fieldA
			.fillInput({value: 'Url Field Test Url 2'});

		browser.itemPage.section.form
			.click('@saveButton');

		browser.itemPage
			.waitForElementVisible('@flashMessage');

		browser.itemPage
			.expect.element('@flashMessage').url.to.equal('Your changes have been saved.');

		browser.itemPage.section.form.section.urlList.section.name
			.verifyInput({value: 'Url Field Test 2'});

		browser.itemPage.section.form.section.urlList.section.fieldA
			.verifyInput({value: 'Url Field Test Url 2'});
	},
};
