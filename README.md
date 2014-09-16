ma:simple-schema
================

aldeed:simple-schema extended

## Installation
Clone the repository in a local directory
````bash
$ cd ~/my_repos/
$ git clone https://github.com/doubleslashG/ma-simple-schema.git
````

Copy the directory in the `packages` folder of your Meteor project or make a symlink (better alternative to simplify the update procedure)
````bash
$ ln -s ~/my_repos/ma:simple-schema /my_project_path/packages/ma:simple-schema
````

Finally run
````bash
$ meteor add ma:simple-schema
````

Enjoy! :)

## Overview
This package extends SimpleSchema functionalities by making additional rules available in the schema definition. You can use it exactly as you would use SimpleSchema, just substituting `SimpleSchema` with `maSimpleSchema`.
For example, to instantiate a schema:
````javascript
BookSchema = new maSimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 200
	},
	author: {
		type: String,
		label: "Author"
	}
});
````
Refer to [simple-schema](https://github.com/aldeed/meteor-simple-schema) documentation for an in-depth overview of the various functionalities.

## Additional rules
Here are the additional rules you can specify when using `maSimpleSchema`. Such rules are ignored by standard SimpleSchema objects (as long as this package is installed, otherwise an error is thrown).

### maDependencies
With this rule you can specify an array of keys whose value depends on the value of the current key. For example, given a 'country' schema:
````javascript
CountrySchema = new maSimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 200
	},
	majorAirports: {
		type: [String],
		label: "Major airports"
	}
});
````
It is clear that if the country name is 'Italy' then in the major airports array we will find Turin (TRN), Rome (FCO), Milan, Florence, Venice etc. while for 'Germany' we would find Berlin (SXF), Frankfurt (FRA), Munich etc.
In this sense, the `majorAirports` key is a dependency of `name`, so we can correct the schema definition:
````javascript
CountrySchema = new maSimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 200,
		maDependencies: ["majorAirports"]
	},
	majorAirports: {
		type: [String],
		label: "Major airports"
	}
});
````
When working with the schema key, you can then get its dependencies easily:
````javascript
mySchemaInstance.schema(keyName).maDependencies
````

### maAllowedValues
This rule lets you specify a function which should return an array of objects defined as follows:
````javascript
{
	label: "value label",
	value: "value to store"
}
````
If the value of the key being validated is not equal to one of the 'value' fields specified in the array, such field is invalidated.
From inside the `maAllowedValues` function, you can access the values of the keys that are being validated calling `getKeyValue(keyName)`. This lets you return just the right set of allowed values.
For example, considering the 'country' schema, you can check the 'name' value and return an array of allowed values accordingly:
````javascript
CountrySchema = new maSimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 200,
		maDependencies: ["majorAirports"]
	},
	majorAirports: {
		type: [String],
		label: "Major airports",
		maAllowedValues: function(getKeyValue) {
			var name = getKeyValue("name");

			if(name === "Italy")
				return [
					{ label: "Turin", value: "TRN"},
					{ label: "Rome Fiumicino", value: "FCO"},
					...
				];
			else if(name === "Germany")
				return [
					{ label: "Berlin Schoenfeld", value: "SXF"},
					{ label: "Frankfurt", value: "FRA"},
					...
				];
		}
	}
});
````
You can also access the `maAllowedValues` function from your code, passing as parameter the `getKeyValue` function if needed:
````javascript
// assuming myDataSource is the object to save to database
var myGetKeyValue = function(keyName) {
	return myDataSource[keyName]	
};

mySchemaInstance.schema(keyName).maAllowedValues(myGetKeyValue);
````

## Package update
When a new version is released, just pull the changes to the local repository. If you symlinked the repository to the packages directory of your project, this is enough. Otherwise, you have to manually copy the updated files in the `packages/ma:simple-schema` directory of your project.

## Compatibility with SimpleSchema
`ma:simple-schema` is 100% compatible with `aldeed:simple-schema` and extends it. This means you can use both packages together or you can just use `maSimpleSchema` for all your schemas (even if you are not using the extended functionalities in all the schemas definitions).
