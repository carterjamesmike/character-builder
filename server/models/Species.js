const { Schema, model } = require("mongoose");

const speciesSchema = new Schema({
  name: { type: String, required: true },
  skinColorOptions: String,
  hairColorOptions: String,
  eyeColorOptions: String,
  distinctions: String,
  heightAverage: String,
  heightRollMod: String,
  weightAverage: String,
  weightRollMod: String,
  homeworld: String,
  flavorText: String,
  colorScheme: Schema.Types.Mixed,
  manufacturer: Schema.Types.Mixed,
  language: String,
  traits: [
    {
      name: String,
      description: String,
    },
  ],
  traitJson: String,
  abilitiesIncreased: [
    [
      {
        abilities: [String],
        abilitiesJson: String,
        amount: Number,
      },
    ],
  ],
  abilitiesIncreasedJson: String,
  imageUrls: [String],
  imageUrlsJson: String,
  size: String,
  halfHumanTableEntries: Schema.Types.Mixed,
  halfHumanTableEntriesJson: String,
  features: [Schema.Types.Mixed],
  contentTypeEnum: Number,
  contentType: String,
  contentSourceEnum: Number,
  contentSource: String,
  partitionKey: String,
  rowKey: String,
  timestamp: Date,
  eTag: String,
});

const Species = model("Species", speciesSchema);

module.exports = Species;

