// extending SimpleSchema for usage with maWizard
SimpleSchema.extendOptions({
	maDependencies: Match.Optional(Array),
	maAllowedValues: Match.Optional(Function)
});

maSimpleSchema = function(schemaObj) {
	var simpleSchema;

	var customValidationFunction = function() {
		var self = this;
		var getKeyValue = function(field) {
			return self.field(field).value;
		};

		var allowedValues = this.definition.maAllowedValues(getKeyValue);
		var currentValues;

		// if the value is not set we assume it is valid;
		// in case it's required, it will be invalidated already
		// (because of the `optional` field missing or set to false)
		if(!this.value) return true;

		if(Array.isArray(this.value))
			currentValues = this.value;
		else
			currentValues = [this.value];

		// specifing an empty array, every value should be considered acceptable
		if(allowedValues.length === 0) return true;

		var contained = _.every(currentValues, function(elem) {
			var values = _.map(allowedValues, function(elem) {
				return elem.value.toString();
			});

			return values.indexOf(elem) > -1;
		});
		
		if(contained) return true;
		else return "notAllowed";
	};

	var maAllowedValuesField;
	for(var field in schemaObj) {
		maAllowedValuesField = schemaObj[field].maAllowedValues;
		if(maAllowedValuesField) {
			schemaObj[field].custom = customValidationFunction;
		}
	}

	simpleSchema = new SimpleSchema(schemaObj);

	return simpleSchema;
};