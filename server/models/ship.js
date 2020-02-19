import { Model } from 'objection'

export class Class extends Model {
  static get tableName() {
    return 'class'
  }
}

export class Ship extends Model {
  static get tableName() {
    return 'ship'
  }

  static get relationMappings() {
    return {
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: 'ship.id',
          through: {
            from: 'shipProduct.shipId',
            to: 'shipProduct.productId'
          },
          to: 'product.id'
        }
      },
      class: {
        relation: Model.BelongsToOneRelation,
        modelClass: Class,
        join: {
          from: 'ship.classId',
          to: 'class.id'
        }
      }
    }
  }
}

export class Product extends Model {
  static get tableName() {
    return 'product'
  }

  static get relationMappings() {
    return {
      ships: {
        relation: Model.ManyToManyRelation,
        modelClass: Ship,
        join: {
          from: 'product.id',
          through: {
            from: 'shipProduct.productId',
            to: 'shipProduct.shipId'
          },
          to: 'ship.id'
        }
      }
    }
  }
}

export class Itinerary extends Model {
  static get tableName() {
    return 'itinerary'
  }

  static get relationMappings() {
    return {
      ships: {
        relation: Model.ManyToManyRelation,
        modelClass: Ship,
        join: {
          from: 'itinerary.id',
          through: {
            from: 'shipItinerary.itineraryId',
            to: 'shipItinerary.shipId'
          },
          to: 'ship.id'
        }
      },
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: 'itinerary.id',
          through: {
            from: 'productItinerary.itineraryId',
            to: 'productItinerary.productId'
          },
          to: 'product.id'
        }
      }
    }
  }
}

export class SailingDate extends Model {
  static get tableName() {
    return 'sailingDate'
  }

  static get relationMappings() {
    return {
      ships: {
        relation: Model.ManyToManyRelation,
        modelClass: Ship,
        join: {
          from: 'sailingDate.id',
          through: {
            from: 'shipSailingDate.sailingDateId',
            to: 'shipSailingDate.shipId'
          },
          to: 'ship.id'
        }
      },
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join: {
          from: 'sailingDate.id',
          through: {
            from: 'productSailingDate.sailingDateId',
            to: 'productSailingDate.productId'
          },
          to: 'product.id'
        }
      },
      itineraries: {
        relation: Model.ManyToManyRelation,
        modelClass: Itinerary,
        join: {
          from: 'sailingDate.id',
          through: {
            from: 'itinerarySailingDate.sailingDateId',
            to: 'itinerarySailingDate.itineraryId'
          },
          to: 'itinerary.id'
        }
      }
    }
  }
}

export class Filter extends Model {
  static get tableName() {
    return 'filter'
  }
}

export class StageImport extends Model {
  static get tableName() {
    return 'stageImport'
  }
}

export class SnapshotInterval extends Model {
  static get tableName() {
    return 'snapshotInterval'
  }
}
