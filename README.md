# Untitled Punchy Game

## Game Definitions
Games are comprised of two types of data:
1. Component Groups
2. Component

### Component Groups
A collection of components of a given type.

**Properties**
```
name: string;
components: Array<Component|ComponentGroup>
type: Box|Cards|Dice
```

### Component
A instance of a component.

**Properties**
```
name: string;
description?: string;
quantity: number; // note: -1 represents unlimited quantity
properties: Array<Property>;
```

## UPG Tool

### build

Builds resource JSON files from CSV files. Generates a Box type component group containing a component group for each file provided.

**Usage**
`node ./upg-tool build './filename.csv' './another-file.csv'`

**Example Input CSV (characters.csv)**
```
name,description,quantity,property-attack,property-armor,property-attributes
Robot,,1,10,20,heavy|armored|solar
```
_Note 1: prefixing a header row entry with `property-` adds the values to the `properties` array for the component._
_Note 2: pipe-separating the value for a field results in an array value_

**Result (resource.json)**
```
{
  "name": "null",
  "type": "Box",
  "components": [
    {
      "name": "characters.csv",
      "type": null,
      "components": [
        {
          "name": "Robot",
          "description": null,
          "quantity": "1",
          "properties": [
            { "name": "attack", "value": "10" },
            { "name": "armor", "value": "20" },
            { "name": "attributes", "value": [ "heavy", "armored", "solar" ] }
          ]
        }
      ]
    }
  ]
}
```
