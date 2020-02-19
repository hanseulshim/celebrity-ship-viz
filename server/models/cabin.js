import { Model } from 'objection'

export class Cabin extends Model {
  static get tableName() {
    return 'cabin'
  }

  static get relationMappings() {
    return {
      snapshot: {
        relation: Model.HasManyRelation,
        modelClass: Snapshot,
        join: {
          from: 'cabin.id',
          to: 'snapshot.cabinId'
        }
      }
    }
  }
}

export class Snapshot extends Model {
  static get tableName() {
    return 'snapshot'
  }
}
